import { ICommand } from '@/logic/commanding';

export const StartTutorialCommand_Name: Symbol = Symbol.for("StartTutorialCommand");

export class StartTutorialCommand implements ICommand {
    readonly CommandName: Symbol = StartTutorialCommand_Name;    

    validate(): boolean {
        return true;
    }
}