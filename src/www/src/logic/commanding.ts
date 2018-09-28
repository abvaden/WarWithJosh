import { injectable, inject, ContainerModule } from 'inversify';

export interface ICommandPublisher {
    start(): Promise<void>;
    publish(command: ICommand): Promise<void>;
}

export interface ICommand {
    readonly CommandName: Symbol;

    validate(): boolean;
}

export interface ICommandHandler {
    readonly For: Array<Symbol>;

    handle(command: ICommand): void;
}

export const ICommandHandler_IOC_Key = Symbol.for("ICommandHandler");
export const ICommandPublisher_IOC_Key = Symbol.for("ICommandPublisher");

const ICommandHandlerProvider_IOC_Key = Symbol.for("ICommandHandlerProvider");

@injectable()
export class CommandPublisher implements ICommandPublisher {
    private readonly _handlerProvider: () => Promise<Array<ICommandHandler>>;
    private readonly _handlerMap: Map<Symbol, ICommandHandler[]> = new Map<Symbol, Array<ICommandHandler>>();

    constructor(@inject(ICommandHandlerProvider_IOC_Key)handlerProvider: () => Promise<Array<ICommandHandler>> ) {
        this._handlerProvider = handlerProvider;
    }

    public async start(): Promise<void> {
        const handlers = await this._handlerProvider();

        handlers.forEach(handler => {
            handler.For.forEach(commandName => {
                const handlers = this._handlerMap.get(commandName);
                if (handlers === undefined) {
                    this._handlerMap.set(commandName, [handler]);
                } else {
                    handlers.push(handler);
                }
            });
        });
    }

    async publish(command: ICommand): Promise<void> {
        const handlers = this._handlerMap.get(command.CommandName);
        if (handlers === undefined) {
            return;
        }

        handlers.forEach(handler => {
            handler.handle(command);
        });
    }
}

export const CommandingContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<ICommandPublisher>(ICommandPublisher_IOC_Key)
        .to(CommandPublisher)
        .inSingletonScope();
    bind(ICommandHandlerProvider_IOC_Key)
        .toProvider<ICommandHandler[]>((context) => {
            return () => {
                const handlers = context.container.getAll<ICommandHandler>(ICommandHandler_IOC_Key);
                return Promise.resolve(handlers);
            };
        });
});