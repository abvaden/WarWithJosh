import { ICommand } from '@/logic/commanding';

export const ToggleDialogCommand_Name: Symbol = Symbol.for("ToggleDialogCommand");

export class ToggleDialogCommand implements ICommand {
    readonly CommandName: Symbol = ToggleDialogCommand_Name;

    public open: boolean = false;

    public tutorialDialog: boolean = false;
    public winnerDialog: boolean = false;
    public errorDialog: boolean = false;
    
    validate(): boolean {
        if (this.open) {
            let count = 0; 
            if (this.tutorialDialog) {
                count++;
            }
            if (this.winnerDialog) {
                count++;
            }
            if (this.errorDialog) {
                count++;
            }
            if (count !== 1) {
                return false;
            }
        }

        return true;
    }
}