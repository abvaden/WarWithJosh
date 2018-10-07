import { ICommand } from '@/logic/commanding';

export const ResetGameCommandName: Symbol = Symbol.for("ResetGameCommand");

export class ResetGameCommand implements ICommand {
    readonly CommandName: Symbol = ResetGameCommandName;

    public player1: boolean = false;
    public number: number = 0;

    validate(): boolean {
        if ((this.number < 1) || (this.number > 13)){
            return false;
        }

        return true;
    }
}