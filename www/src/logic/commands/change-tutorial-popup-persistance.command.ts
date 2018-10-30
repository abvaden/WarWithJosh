import { ICommand } from '@/logic/commanding';

export const ChangeTutorialPopupPersistanceCommand_Name: Symbol = Symbol.for("ChangeTutorialPopupPersistanceCommand");

export class ChangeTutorialPopupPersistanceCommand implements ICommand {
    readonly CommandName: Symbol = ChangeTutorialPopupPersistanceCommand_Name;    
    

    public value: boolean = false;

    validate(): boolean {
        return true;
    }
}