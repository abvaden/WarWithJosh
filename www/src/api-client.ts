import * as Constants from "./constants"
import { injectable } from 'inversify';

export const IAPIClient_IOC_KEY = Symbol.for("APIClient")
export interface IAPIClient {
    StartNewSession(): Promise<string>
    AddSessionMove(sessionId: string, move: Move): Promise<void>
    EndSession(sessionId: string): Promise<void>
    ValidPlayerTypes(): Promise<string[]>
    Ping(timeOut: number): Promise<{success: boolean, errorMessage?: string}>
}


export interface Move {
    "ai-score": number | undefined
    "ai-bid": number
    "player-score": number | undefined
    "player-bid": number
    "hand-value": number
}

interface AddMoveRequest {
    "session-id": string
    "move": Move
}

interface NewSessionResponse {
    "session-id": string
}

interface EndSessionRequest {
    "session-id": string
}

@injectable()
export class NetworkAPIClient implements IAPIClient {
    
    private readonly _apiBasePath: string;
    constructor() {
        const basePath = Constants.APIBasePath;
        this._apiBasePath = (basePath === undefined) ? window.location.href : basePath
    }

    async StartNewSession(): Promise<string> {
        const newSessionUrl = this._apiBasePath + "/api/v1/session/new";
        const r = await fetch(newSessionUrl, {
            mode: "cors"
        });
        if (r.status !== 200) {
            throw Error(this.generateError(r));
        }

        const response = <NewSessionResponse>(await r.json());
        return response["session-id"];
    }    
    
    async AddSessionMove(sessionId: string, move: Move): Promise<void> {
        const addMoveUrl = this._apiBasePath + "/api/v1/session/add-move";
        const request: AddMoveRequest = {
            "session-id": sessionId,
            "move": move
        };
        const r = await fetch(addMoveUrl, {
            body: JSON.stringify(request),
            method: "POST"
        });

        if (r.status != 200) {
            throw new Error(this.generateError(r));
        }
        return;
    }
    
    async EndSession(sessionId: string): Promise<void> {
        const endSessionUrl = this._apiBasePath + "/api/v1/session/end";
        const request: EndSessionRequest = {
            "session-id": sessionId,
        };
        const r = await fetch(endSessionUrl, {
            body: JSON.stringify(request),
            method: "POST"
        });

        if (r.status != 200) {
            throw new Error(this.generateError(r));
        }
        return;
    }

    async ValidPlayerTypes(): Promise<string[]> {
        const playerTypesUrl = this._apiBasePath + "/api/player-types";
        const r = await fetch(playerTypesUrl, {
            method: "GET"
        });

        if (r.status != 200) {
            throw new Error(this.generateError(r));
        }

        return r.json();
    }

    async Ping(timeOutMs: number): Promise<{success: boolean, errorMessage?: string}> {
        const p =  new Promise<boolean>(async (resolve, reject) => {
            try {
                let hasTimedOut = false;
                const timer = setTimeout(() => {
                    hasTimedOut = true;
                    reject("Timeout");
                }, timeOutMs);
                const sendTime = new Date();
                const pingUrl = this._apiBasePath + "/api/ping";
                const r = await fetch(pingUrl, {
                    method: "GET"
                });

                if (r.status != 200) {
                    if (hasTimedOut) {
                        return;
                    }
                    reject("Invalid response");
                    throw new Error(this.generateError(r));
                }
                const timeString = await r.text();
                const receiveTime = new Date(timeString);

                const deltaMs = receiveTime.valueOf() - sendTime.valueOf();
                clearTimeout(timer);
                if (hasTimedOut) {
                    return;
                }
                return resolve(true);
            } catch (err) {
                return reject("Connection error");
            }
        });
        
        try {
            const result = await p;
            if (result) {
                return { success: true};
            } else {
                return { success: false, errorMessage: "Could not reach server"};
            }
        } catch (e) {
            return { success: false, errorMessage: e};
        }
    }

    private generateError(response: Response): string {
        if (response.status === 500) {
            return "Server error";
        } else if (response.status === 400) {
            return "Bad request"
        } else {
            return "Unknown error while calling server"
        }
    }
}
