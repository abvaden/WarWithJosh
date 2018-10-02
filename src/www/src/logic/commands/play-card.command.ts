import { ICommand } from '@/logic/commanding';

export const PlayCardCommandName: Symbol = Symbol.for("PlayCardCommand");

export class PlayCardCommand implements ICommand {
    readonly CommandName: Symbol = PlayCardCommandName;

    validate(): boolean {
        throw new Error("Not implemented");
    }
}