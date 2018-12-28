// package: web
// file: WarWithJoshAPIMessages.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";

export class MoveMessage extends jspb.Message {
  getAiscore(): number;
  setAiscore(value: number): void;

  getAibid(): number;
  setAibid(value: number): void;

  getPlayerscore(): number;
  setPlayerscore(value: number): void;

  getPlayerbid(): number;
  setPlayerbid(value: number): void;

  getHandvalue(): number;
  setHandvalue(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MoveMessage.AsObject;
  static toObject(includeInstance: boolean, msg: MoveMessage): MoveMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MoveMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MoveMessage;
  static deserializeBinaryFromReader(message: MoveMessage, reader: jspb.BinaryReader): MoveMessage;
}

export namespace MoveMessage {
  export type AsObject = {
    aiscore: number,
    aibid: number,
    playerscore: number,
    playerbid: number,
    handvalue: number,
  }
}

export class TrickCompletedMessage extends jspb.Message {
  hasMove(): boolean;
  clearMove(): void;
  getMove(): MoveMessage | undefined;
  setMove(value?: MoveMessage): void;

  getTricksremaining(): number;
  setTricksremaining(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TrickCompletedMessage.AsObject;
  static toObject(includeInstance: boolean, msg: TrickCompletedMessage): TrickCompletedMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TrickCompletedMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TrickCompletedMessage;
  static deserializeBinaryFromReader(message: TrickCompletedMessage, reader: jspb.BinaryReader): TrickCompletedMessage;
}

export namespace TrickCompletedMessage {
  export type AsObject = {
    move?: MoveMessage.AsObject,
    tricksremaining: number,
  }
}

export class AiDecidedMessage extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AiDecidedMessage.AsObject;
  static toObject(includeInstance: boolean, msg: AiDecidedMessage): AiDecidedMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AiDecidedMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AiDecidedMessage;
  static deserializeBinaryFromReader(message: AiDecidedMessage, reader: jspb.BinaryReader): AiDecidedMessage;
}

export namespace AiDecidedMessage {
  export type AsObject = {
  }
}

export class TrickDecidedMessage extends jspb.Message {
  getTrickpoints(): number;
  setTrickpoints(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TrickDecidedMessage.AsObject;
  static toObject(includeInstance: boolean, msg: TrickDecidedMessage): TrickDecidedMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TrickDecidedMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TrickDecidedMessage;
  static deserializeBinaryFromReader(message: TrickDecidedMessage, reader: jspb.BinaryReader): TrickDecidedMessage;
}

export namespace TrickDecidedMessage {
  export type AsObject = {
    trickpoints: number,
  }
}

export class PlayerDecidedMessage extends jspb.Message {
  getValue(): number;
  setValue(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PlayerDecidedMessage.AsObject;
  static toObject(includeInstance: boolean, msg: PlayerDecidedMessage): PlayerDecidedMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PlayerDecidedMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PlayerDecidedMessage;
  static deserializeBinaryFromReader(message: PlayerDecidedMessage, reader: jspb.BinaryReader): PlayerDecidedMessage;
}

export namespace PlayerDecidedMessage {
  export type AsObject = {
    value: number,
  }
}

export class ResultsMessage extends jspb.Message {
  getAiscore(): number;
  setAiscore(value: number): void;

  getPlayerscore(): number;
  setPlayerscore(value: number): void;

  getAitotalgames(): number;
  setAitotalgames(value: number): void;

  getPlayertotalgames(): number;
  setPlayertotalgames(value: number): void;

  getAiwinpercentage(): number;
  setAiwinpercentage(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResultsMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ResultsMessage): ResultsMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResultsMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResultsMessage;
  static deserializeBinaryFromReader(message: ResultsMessage, reader: jspb.BinaryReader): ResultsMessage;
}

export namespace ResultsMessage {
  export type AsObject = {
    aiscore: number,
    playerscore: number,
    aitotalgames: number,
    playertotalgames: number,
    aiwinpercentage: number,
  }
}

export class StartGameMessage extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartGameMessage.AsObject;
  static toObject(includeInstance: boolean, msg: StartGameMessage): StartGameMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartGameMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartGameMessage;
  static deserializeBinaryFromReader(message: StartGameMessage, reader: jspb.BinaryReader): StartGameMessage;
}

export namespace StartGameMessage {
  export type AsObject = {
  }
}

export class EndSessionMessage extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EndSessionMessage.AsObject;
  static toObject(includeInstance: boolean, msg: EndSessionMessage): EndSessionMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EndSessionMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EndSessionMessage;
  static deserializeBinaryFromReader(message: EndSessionMessage, reader: jspb.BinaryReader): EndSessionMessage;
}

export namespace EndSessionMessage {
  export type AsObject = {
  }
}

export class SetAiMessage extends jspb.Message {
  getAiname(): string;
  setAiname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetAiMessage.AsObject;
  static toObject(includeInstance: boolean, msg: SetAiMessage): SetAiMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetAiMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetAiMessage;
  static deserializeBinaryFromReader(message: SetAiMessage, reader: jspb.BinaryReader): SetAiMessage;
}

export namespace SetAiMessage {
  export type AsObject = {
    ainame: string,
  }
}

export class ErrorMessage extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorMessage): ErrorMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorMessage;
  static deserializeBinaryFromReader(message: ErrorMessage, reader: jspb.BinaryReader): ErrorMessage;
}

export namespace ErrorMessage {
  export type AsObject = {
    message: string,
  }
}

export class Wrapper extends jspb.Message {
  hasPayload(): boolean;
  clearPayload(): void;
  getPayload(): google_protobuf_any_pb.Any | undefined;
  setPayload(value?: google_protobuf_any_pb.Any): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Wrapper.AsObject;
  static toObject(includeInstance: boolean, msg: Wrapper): Wrapper.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Wrapper, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Wrapper;
  static deserializeBinaryFromReader(message: Wrapper, reader: jspb.BinaryReader): Wrapper;
}

export namespace Wrapper {
  export type AsObject = {
    payload?: google_protobuf_any_pb.Any.AsObject,
  }
}

