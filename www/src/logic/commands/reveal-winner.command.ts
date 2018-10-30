import { ICommand } from '@/logic/commanding';

export const RevealWinnerCommandName: Symbol = Symbol.for("RevealWinnerCommand");

export class RevealWinnerCommand implements ICommand {
    readonly CommandName: Symbol = RevealWinnerCommandName;
    public Player1_Score: number = -1;
    public Player2_Score: number = -1;
    public Player1_Name: string = "";
    public Player2_Name: string = "";
    validate(): boolean {
        if ((this.Player1_Score < 0) ||
            (this.Player1_Score > 91)) {
            return false;
        }
        if ((this.Player2_Score < 0) ||
            (this.Player2_Score > 91)) {
            return false;
        }
        if (this.Player1_Name === "") {
            return false;
        }
        if (this.Player2_Name === "") {
            return false;
        }
        return true;
    }
}