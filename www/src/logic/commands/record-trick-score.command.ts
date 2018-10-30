import { ICommand } from '@/logic/commanding';

export const RecordTrickScoreCommandName: Symbol = Symbol.for("RecordTrickScoreCommand");

export class RecordTrickScoreCommand implements ICommand {
    readonly CommandName: Symbol = RecordTrickScoreCommandName;

    public trickNumber: number = -1;
    public trickPoints: number = -1;
    public player1_value: number = -1;
    public player2_value: number = -1;
    public player1_score: number | undefined;
    public player2_score: number | undefined;

    validate(): boolean {
        if ((this.trickNumber < 1) || (this.trickNumber > 13)){
            return false;
        }

        if ((this.trickPoints < 1) || (this.trickPoints > 13)){
            return false;
        }

        if ((this.player1_value < 1) || (this.player1_value > 13)){
            return false;
        }

        if ((this.player2_value < 1) || (this.player2_value > 13)){
            return false;
        }

        return true;
    }
}