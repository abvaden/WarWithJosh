// package: web
// file: WarWithJoshAPIMessages.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";

export class Move extends jspb.Message {
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
  toObject(includeInstance?: boolean): Move.AsObject;
  static toObject(includeInstance: boolean, msg: Move): Move.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Move, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Move;
  static deserializeBinaryFromReader(message: Move, reader: jspb.BinaryReader): Move;
}

export namespace Move {
  export type AsObject = {
    aiscore: number,
    aibid: number,
    playerscore: number,
    playerbid: number,
    handvalue: number,
  }
}

export class TrickCompleted extends jspb.Message {
  hasMove(): boolean;
  clearMove(): void;
  getMove(): Move | undefined;
  setMove(value?: Move): void;

  getTricksremaining(): number;
  setTricksremaining(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TrickCompleted.AsObject;
  static toObject(includeInstance: boolean, msg: TrickCompleted): TrickCompleted.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TrickCompleted, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TrickCompleted;
  static deserializeBinaryFromReader(message: TrickCompleted, reader: jspb.BinaryReader): TrickCompleted;
}

export namespace TrickCompleted {
  export type AsObject = {
    move?: Move.AsObject,
    tricksremaining: number,
  }
}

export class AiDecided extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AiDecided.AsObject;
  static toObject(includeInstance: boolean, msg: AiDecided): AiDecided.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AiDecided, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AiDecided;
  static deserializeBinaryFromReader(message: AiDecided, reader: jspb.BinaryReader): AiDecided;
}

export namespace AiDecided {
  export type AsObject = {
  }
}

export class TrickDecided extends jspb.Message {
  getTrickpoints(): number;
  setTrickpoints(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TrickDecided.AsObject;
  static toObject(includeInstance: boolean, msg: TrickDecided): TrickDecided.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TrickDecided, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TrickDecided;
  static deserializeBinaryFromReader(message: TrickDecided, reader: jspb.BinaryReader): TrickDecided;
}

export namespace TrickDecided {
  export type AsObject = {
    trickpoints: number,
  }
}

export class PlayerDecided extends jspb.Message {
  getValue(): number;
  setValue(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PlayerDecided.AsObject;
  static toObject(includeInstance: boolean, msg: PlayerDecided): PlayerDecided.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PlayerDecided, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PlayerDecided;
  static deserializeBinaryFromReader(message: PlayerDecided, reader: jspb.BinaryReader): PlayerDecided;
}

export namespace PlayerDecided {
  export type AsObject = {
    value: number,
  }
}

export class Results extends jspb.Message {
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
  toObject(includeInstance?: boolean): Results.AsObject;
  static toObject(includeInstance: boolean, msg: Results): Results.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Results, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Results;
  static deserializeBinaryFromReader(message: Results, reader: jspb.BinaryReader): Results;
}

export namespace Results {
  export type AsObject = {
    aiscore: number,
    playerscore: number,
    aitotalgames: number,
    playertotalgames: number,
    aiwinpercentage: number,
  }
}

export class Error extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Error.AsObject;
  static toObject(includeInstance: boolean, msg: Error): Error.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Error, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Error;
  static deserializeBinaryFromReader(message: Error, reader: jspb.BinaryReader): Error;
}

export namespace Error {
  export type AsObject = {
    message: string,
  }
}

export class Wrapper extends jspb.Message {
  getType(): string;
  setType(value: string): void;

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
    type: string,
    payload?: google_protobuf_any_pb.Any.AsObject,
  }
}

