import { ICommand } from '@/logic/commanding';

export const StartGameCommandName: Symbol = Symbol.for("StartGameCommand");

export class StartGameCommand implements ICommand {
    readonly CommandName: Symbol = StartGameCommandName;

    public GameId: string = "";

    validate(): boolean {
        if (this.GameId == "") {
            return false;
        }
        return true;
    }
}