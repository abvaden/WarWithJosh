import { ICommand } from '@/logic/commanding';

export const OpenDialogCommand_Name: Symbol = Symbol.for("OpenDialogCommand");

export class OpenDialogCommand implements ICommand {
    readonly CommandName: Symbol = OpenDialogCommand_Name;    
    
    validate(): boolean {
        return true;
    }
}