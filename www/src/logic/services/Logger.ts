import { injectable } from 'inversify';
import { ILogger } from './Interfaces';

@injectable()
export class Logger implements ILogger {
    constructor() {
        
    }

    Log(level: "Error" | "Info", site: string, message: string): void {
        if (level === "Error") {
            console.error(`{0} : {1}`, site, message);
        } else {
            console.log(`{0} : {1}`, site, message);
        }
    }
}