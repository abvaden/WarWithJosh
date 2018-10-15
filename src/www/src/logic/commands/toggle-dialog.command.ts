import { ICommand } from '@/logic/commanding';

export const ToggleDialogCommand_Name: Symbol = Symbol.for("ToggleDialogCommand");

export class ToggleDialogCommand implements ICommand {
    readonly CommandName: Symbol = ToggleDialogCommand_Name;

    public open: boolean = false;

    public setupDialog: boolean = false;
    public winnerDialog: boolean = false;
    
    validate(): boolean {
        if (this.open) {
            if (!this.setupDialog && !this.winnerDialog) {
                return false;
            }
            if (this.setupDialog && this.winnerDialog) {
                return false;
            }
        }

        return true;
    }
}