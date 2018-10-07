import { ICommand } from '@/logic/commanding';

export const PlayerDecidedCommand_Name: Symbol = Symbol.for("PlayerDecidedCommand");

export class PlayerDecidedCommand implements ICommand {
    readonly CommandName: Symbol = PlayerDecidedCommand_Name;    
    
    public Player1: boolean = false;

    validate(): boolean {
        return true;
    }
}