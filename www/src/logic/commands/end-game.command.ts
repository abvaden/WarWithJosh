import { ICommand } from '@/logic/commanding';

export const EndGameCommandName: Symbol = Symbol.for("EndGameCommand");

export class EndGameCommand implements ICommand {
    readonly CommandName: Symbol = EndGameCommandName;    
    
    validate(): boolean {
        return true;
    }
}