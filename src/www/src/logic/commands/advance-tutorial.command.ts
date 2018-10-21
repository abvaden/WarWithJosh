import { ICommand } from '@/logic/commanding';

export const AdvanceTutorialCommand_Name: Symbol = Symbol.for("AdvanceTutorialCommand");

export class AdvanceTutorialCommand implements ICommand {
    readonly CommandName: Symbol = AdvanceTutorialCommand_Name;    

    validate(): boolean {
        return true;
    }
}