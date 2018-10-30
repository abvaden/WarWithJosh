import { ICommand } from '@/logic/commanding';

export const PlayCardCommandName: Symbol = Symbol.for("PlayCardCommand");

export class PlayCardCommand implements ICommand {
    readonly CommandName: Symbol = PlayCardCommandName;

    public player1: boolean = false;
    public number: number = 0;

    validate(): boolean {
        if ((this.number < 1) || (this.number > 13)){
            return false;
        }

        return true;
    }
}