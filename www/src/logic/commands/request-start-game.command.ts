import { ICommand } from '@/logic/commanding';

export const RequestStartGameCommandName: Symbol = Symbol.for("RequestStartGameCommand");

export class RequestStartGameCommand implements ICommand {
    readonly CommandName: Symbol = RequestStartGameCommandName;

    validate(): boolean {
        return true;
    }
}