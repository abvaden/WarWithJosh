import { ICommand } from '@/logic/commanding';

export const ToggleDialogCommand_Name: Symbol = Symbol.for("ToggleDialogCommand");

export class ToggleDialogCommand implements ICommand {
    readonly CommandName: Symbol = ToggleDialogCommand_Name;

    public open: boolean = false;

    public tutorialDialog: boolean = false;
    public winnerDialog: boolean = false;
    
    validate(): boolean {
        if (this.open) {
            if (!this.tutorialDialog && !this.winnerDialog) {
                return false;
            }
            if (this.tutorialDialog && this.winnerDialog) {
                return false;
            }
        }

        return true;
    }
}