import * as Constants from "./constants"
import { injectable } from 'inversify';

export const IAPIClient_IOC_KEY = Symbol.for("APIClient")
export interface IAPIClient {
    StartNewSession(): Promise<string>
    AddSessionMove(sessionId: string, move: Move): Promise<void>
    EndSession(sessionId: string): Promise<void>
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
        this._apiBasePath = (basePath === undefined) ? "http://localhost:3000" : basePath
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
