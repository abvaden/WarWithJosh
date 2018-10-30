import { ICommand } from '@/logic/commanding';

export const GlobalErrorCommandName: Symbol = Symbol.for("GlobalErrorCommand");

export class GlobalErrorCommand implements ICommand {
    readonly CommandName: Symbol = GlobalErrorCommandName;

    public ErrorMessage: string = "";
    public ErrorDetails: string = "";

    validate(): boolean {
        if (this.ErrorMessage == "") {
            return false;
        }
        return true;
    }
}