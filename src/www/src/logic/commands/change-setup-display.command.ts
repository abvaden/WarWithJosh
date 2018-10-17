import { ICommand } from '@/logic/commanding';

export const ChangeSetupDisplayCommand_Name: Symbol = Symbol.for("ChangeSetupDisplayCommand");

export class ChangeSetupDisplayCommand implements ICommand {
    readonly CommandName: Symbol = ChangeSetupDisplayCommand_Name;    
    

    public option: "Play" | "Rules" | "Info" = "Play";

    validate(): boolean {
        return true;
    }
}