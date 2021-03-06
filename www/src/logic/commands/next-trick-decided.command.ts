import { ICommand } from '@/logic/commanding';

export const NextTrickCommand_Name: Symbol = Symbol.for("NextTrickDecidedCommand");

export class NextTrickCommandDecided implements ICommand {
    readonly CommandName: Symbol = NextTrickCommand_Name;    
    
    public TrickPoints: number = -1;

    validate(): boolean {
        if ((this.TrickPoints < 1) || (this.TrickPoints > 13)) {
            return false;
        }
        return true;
    }
}