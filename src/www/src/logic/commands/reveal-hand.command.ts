import { ICommand } from '@/logic/commanding';

export const RevealHandCommandName: Symbol = Symbol.for("RevealHandCommand");

export class RevealHandCommand implements ICommand {
    readonly CommandName: Symbol = RevealHandCommandName;
    public Player1_Value: number = -1;
    public Player2_Value: number = -1;
    validate(): boolean {
        if ((this.Player1_Value < 1) ||
            (this.Player1_Value > 13)) {
            return false;
        }
        if ((this.Player2_Value < 1) ||
            (this.Player2_Value > 13)) {
            return false;
        }
        return true;
    }
}