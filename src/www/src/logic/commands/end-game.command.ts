import { ICommand } from '@/logic/commanding';

export const EndGameCommand_Name: Symbol = Symbol.for("EndGameCommand");

export class EndGameCommand implements ICommand {
    readonly CommandName: Symbol = EndGameCommand_Name;    
    
    validate(): boolean {
        return true;
    }
}