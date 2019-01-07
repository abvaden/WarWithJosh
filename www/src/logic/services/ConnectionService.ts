import { injectable, inject } from "inversify";
import { IConnectionService, ConnectionChangeEvent, ILogger_IOC_Key, ILogger } from "./Interfaces";
import { IAPIClient_IOC_KEY, IAPIClient } from '@/logic/api/api-client';

const onlinePoleTime = 15000;
const offlinePoleTime = 5000;

@injectable()
export class ConnectionService implements IConnectionService {
    public IsRunning: boolean = false;

    private _lastOnline: boolean = false;

    private _interval: NodeJS.Timer | undefined;
    private readonly _handlers: Array<(event: ConnectionChangeEvent) => void> = [];

    private readonly _logger: ILogger;
    private readonly _apiClient: IAPIClient;

    constructor(@inject(ILogger_IOC_Key)logger: ILogger,
                @inject(IAPIClient_IOC_KEY) apiClient: IAPIClient) {
        this._logger = logger;
        this._apiClient = apiClient;
    }

    Start(): void {
        this.IsRunning = true;
        this._interval = setInterval(() => {
            this.testOnline();
        }, 15000);
        this.testOnline();
    }

    Stop(): void {
        if (this._interval) {
            clearInterval(this._interval);
        }
    }

    Online(): boolean {
        if (!this.IsRunning) {
            throw new Error("Must first be started");
        }

        return this._lastOnline;
    }

    Attach(handler: (event: ConnectionChangeEvent) => void): void {
        this._handlers.push(handler);
    }

    Detach(handler: (event: ConnectionChangeEvent) => void): void {
        const index = this._handlers.findIndex((x) => x === handler);
        if (index !== -1) {
            this._handlers.splice(index, 1);
        }
    }

    private async testOnline(): Promise<boolean> {
        const pingResponse = await this._apiClient.Ping(5000);
        const isOnline = pingResponse.success;
        
        if (isOnline !== this._lastOnline) {
            this.callHandlers(isOnline);

            this._lastOnline = isOnline;

            if (!isOnline) {
                this._logger.Log("Info", "ConnectionService", `Offline for reason ${pingResponse.errorMessage}`);
            }
        }

        return isOnline;
    }

    private callHandlers(isOnline: boolean): void {
        const event: ConnectionChangeEvent = {
            Online: isOnline
        };
        this._handlers.forEach (x => {
            x(event);
        });
    }
}