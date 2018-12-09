import { injectable } from 'inversify';
import { ILogger } from './Interfaces';

@injectable()
export class Logger implements ILogger {
    constructor() {
        
    }

    Log(level: "Error" | "Info", site: string, message: string): void {
        throw new Error("Method not implemented.");
    }
}