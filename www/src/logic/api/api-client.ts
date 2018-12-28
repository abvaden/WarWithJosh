import * as Constants from "../../constants"
import { injectable } from 'inversify';
import { Message, } from "google-protobuf";
import { Wrapper, ErrorMessage, EndSessionMessage, PlayerDecidedMessage, SetAiMessage, StartGameMessage } from './WarWithJoshAPIMessages_pb';
import { Any } from 'google-protobuf/google/protobuf/any_pb';
import { EventEmitter } from 'events';

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

export interface ISessionMessagePump {
    nextMessage(): Promise<Wrapper>;
    send(message: Message, messageType: string): void;
    on(event: "close", callback: () => void): void;
    close(): void;
}

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
                const errorMessage = new ErrorMessage();
                errorMessage.setMessage("Connection to server lost");
                const any = new Any();
                any.pack(errorMessage.serializeBinary(), "web.ErrorMessage", "proto")
                const wrapper = new Wrapper();
                wrapper.setPayload(any);
                messagePump.enqueueNextMessage(wrapper.serializeBinary());
            });
            ws.addEventListener("error", (e) => {
                const wrapperMessage = new Wrapper();
                const errorMessage = new ErrorMessage();
                errorMessage.setMessage("Underlying connection to server closed");
                var value = new Any();
                value.setTypeUrl("web.ErrorMessage");
                value.setValue(errorMessage.serializeBinary());

                wrapperMessage.setPayload(value);
                messagePump.enqueueNextMessage(value.serializeBinary());
            });
            ws.addEventListener("message", (e) => {
                messagePump.enqueueNextMessage(e.data);
            });
        });
    }    
    
    SetPlayerDecided(value: number, session: ISessionMessagePump): void {
        const playerDecidedMessage = new PlayerDecidedMessage();
        playerDecidedMessage.setValue(value);
        session.send(playerDecidedMessage, "web.PlayerDecidedMessage");
    }

    SetAiType(aiType: string, session: ISessionMessagePump): void {
        const setAiMessage = new SetAiMessage();
        setAiMessage.setAiname(aiType)
        session.send(setAiMessage, "web.SetAiMessage");
    }

    StartGame(session: ISessionMessagePump): void {
        const startGameMessage = new StartGameMessage();
        session.send(startGameMessage, "web.StartGameMessage");
    }
    
    EndSession(session: ISessionMessagePump): void {
        const endMessage = new EndSessionMessage();
        session.send(endMessage, "web.EndSessionMessage");
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
    private _nextMessageResolve: undefined | ((message: Wrapper) => void);
    private readonly _emitter: EventEmitter = new EventEmitter();
    private readonly _close: () => void;
    private readonly _messages: Wrapper[] = [];
    private readonly _forward: (message: Uint8Array) => void;

    constructor(forward: (message: Uint8Array) => void, close: () => void) {
        this._forward = forward;
        this._close = close;
    }

    nextMessage(): Promise<Wrapper> {
        const firstMessage = this._messages.shift();
        if (firstMessage !== undefined) {
            return Promise.resolve<Wrapper>(firstMessage);
        }
        
        const promise = new Promise<Wrapper>((resolve) => {
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
    
    enqueueNextMessage(data: Uint8Array): void {
        const wrapper = Wrapper.deserializeBinary(data);
        if (this._nextMessageResolve) {
            const resolve = this._nextMessageResolve;
            this._nextMessageResolve = undefined;
            resolve(wrapper);
        } else {
            this._messages.push(wrapper);
        }
    }

    send(message: Message, type: string): void {
        const any = new Any();
        any.pack(message.serializeBinary(), type, "proto")
        const wrapper = new Wrapper();
        wrapper.setPayload(any);
        this._forward(wrapper.serializeBinary());
    }

    on(event: "close", callback: () => void) {
        this._emitter.on(event, callback);
    }

    close(): void {
        this._close();
        this._emitter.emit("close");
    }
}