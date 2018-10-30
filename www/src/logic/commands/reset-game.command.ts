import { ICommand } from '@/logic/commanding';

export const ResetGameCommandName: Symbol = Symbol.for("ResetGameCommand");

export class ResetGameCommand implements ICommand {
    readonly CommandName: Symbol = ResetGameCommandName;

    validate(): boolean {
        return true;
    }
}