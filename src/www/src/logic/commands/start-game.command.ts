import { ICommand } from '@/logic/commanding';

export const StartGameCommandName: Symbol = Symbol.for("StartGameCommand");

export class StartGameCommand implements ICommand {
    readonly CommandName: Symbol = StartGameCommandName;

    validate(): boolean {
        return true;
    }
}