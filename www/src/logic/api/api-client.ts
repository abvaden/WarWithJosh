import * as Constants from "../../constants"
import { injectable } from 'inversify';
import { EventEmitter } from 'events';
import { web, google } from "./WarWithJoshMessages";

export const IAPIClient_IOC_KEY = Symbol.for("APIClient")
export interface IAPIClient {
    StartNewSession(): Promise<ISessionMessagePump>;
    SetPlayerDecided(value: number, session: ISessionMessagePump): void;
    SetAiType(aiType: string, session: ISessionMessagePump): void
    StartGame(session: ISessionMessagePump): void
    EndSession(session: ISessionMessagePump): void;
    ValidPlayerTypes(): Promise<string[]>;
    Ping(timeOut: number): Promise<{success: boolean, errorMessage?: string}>;
}

export interface ISessionMessagePump{
    nextMessage(): Promise<web.Wrapper>;
    send(message: Uint8Array, messageType: string): void;
    on(event: "close", callback: () => void): void;
    close(): void;
}

export type WarWithJoshMessage = 
    web.AiDecidedMessage | 
    web.EndSessionMessage | 
    web.ErrorMessage | 
    web.MoveMessage | 
    web.PlayerDecidedMessage | 
    web.ResultsMessage |
    web.SetAiMessage |
    web.StartGameMessage |
    web.TrickCompletedMessage |
    web.TrickDecidedMessage;

@injectable()
export class NetworkAPIClient implements IAPIClient {
    
    private readonly _apiBasePath: string;
    constructor() {
        const basePath = Constants.APIBasePath;
        this._apiBasePath = (basePath === undefined) ? window.location.href : basePath
    }

    StartNewSession(): Promise<ISessionMessagePump> {
        return new Promise((resolve, reject) => {
            const ws = new WebSocket(this._apiBasePath.replace("http", "ws") + "/api/v1/session/new");
            ws.binaryType = "arraybuffer";
            const initialConnectMessages: Uint8Array[] = [];
            const messagePump = new MessagePump((data) => {
                if (!ws.OPEN) {
                    initialConnectMessages.push(data);
                    return;
                }

                ws.send(data);
            }, () => {
                ws.close();
            });
            ws.addEventListener("open", (e) => {
                if (initialConnectMessages.length > 0) {
                    var message: Uint8Array | undefined;
                    while (initialConnectMessages.length > 0) {
                        message = initialConnectMessages.shift();
                        if (message) {
                            ws.send(message);
                        }
                    }
                }
                resolve(messagePump);
            });
            ws.addEventListener("close", (e) => {
                const errorMessage = web.ErrorMessage.create({
                    Message: "Connection to server lost"
                });
                const any = google.protobuf.Any.create(
                    {
                        type_url: "proto/web.ErrorMessage",
                        value: web.ErrorMessage.encode(errorMessage).finish()
                    }
                );
                const wrapper = web.Wrapper.create()
                wrapper.payload = any;
                messagePump.enqueueNextMessage(web.Wrapper.encode(wrapper).finish().buffer as ArrayBuffer);
            });
            ws.addEventListener("error", (e) => {
                var value = google.protobuf.Any.create(
                    {
                        type_url: "proto/web.ErrorMessage",
                        value: web.ErrorMessage.encode({Message: "Underlying connection to server closed"}).finish()
                    }
                );
                messagePump.enqueueNextMessage(web.Wrapper.encode({ payload: value}).finish().buffer as ArrayBuffer);
            });
            ws.addEventListener("message", (e) => {
                messagePump.enqueueNextMessage(e.data);
            });
        });
    }    
    
    SetPlayerDecided(value: number, session: ISessionMessagePump): void {
        const message = web.PlayerDecidedMessage.create({Value: value});
        session.send(web.PlayerDecidedMessage.encode(message).finish(), "web.PlayerDecidedMessage");
    }

    SetAiType(aiType: string, session: ISessionMessagePump): void {
        const message = web.SetAiMessage.create({AiName: aiType});
        session.send(web.SetAiMessage.encode(message).finish(), "web.SetAiMessage");
    }

    StartGame(session: ISessionMessagePump): void {
        const startGameMessage = new web.StartGameMessage();
        session.send(web.StartGameMessage.encode(startGameMessage).finish(), "web.StartGameMessage");
    }
    
    EndSession(session: ISessionMessagePump): void {
        const endMessage = new web.EndSessionMessage();
        session.send(web.EndSessionMessage.encode(endMessage).finish(), "web.EndSessionMessage");
        session.close();
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
                const pingUrl = this._apiBasePath + "/api/v1/ping";
                const r = await fetch(pingUrl, {
                    method: "GET",
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

export class MessagePump implements ISessionMessagePump {
    private _nextMessageResolve: undefined | ((message: web.Wrapper) => void);
    private readonly _emitter: EventEmitter = new EventEmitter();
    private readonly _close: () => void;
    private readonly _messages: web.Wrapper[] = [];
    private readonly _forward: (message: Uint8Array) => void;

    constructor(forward: (message: Uint8Array) => void, close: () => void) {
        this._forward = forward;
        this._close = close;
    }

    nextMessage(): Promise<web.Wrapper> {
        const firstMessage = this._messages.shift();
        if (firstMessage !== undefined) {
            return Promise.resolve<web.Wrapper>(firstMessage);
        }
        
        const promise = new Promise<web.Wrapper>((resolve) => {
            // When entering the promise we need to first check that there is no pending resolve.
            // Since this will happen after the current event loop is cleared, it is a message could
            // have been enqueued while the previous stack was completing.
            const firstMessage = this._messages.shift();
            if (firstMessage !== undefined) {
                resolve(firstMessage);
            }
            this._nextMessageResolve = resolve;
        });

        return promise;
    }    
    
    enqueueNextMessage(data: ArrayBuffer): void {
        try {
            const dataFrame = new Uint8Array(data);
            const wrapper = web.Wrapper.decode(dataFrame);
            if (this._nextMessageResolve) {
                const resolve = this._nextMessageResolve;
                this._nextMessageResolve = undefined;
                resolve(wrapper);
            } else {
                this._messages.push(wrapper);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    send(message: Uint8Array, type: string): void {
        const any = google.protobuf.Any.create({
            type_url: "proto/"+type,
            value: message
        });
        const wrapper = web.Wrapper.create({payload: any});
        this._forward(web.Wrapper.encode(wrapper).finish());
    }

    on(event: "close", callback: () => void) {
        this._emitter.on(event, callback);
    }

    close(): void {
        this._close();
        this._emitter.emit("close");
    }
}