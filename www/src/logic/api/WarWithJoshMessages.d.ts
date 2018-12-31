import * as $protobuf from "protobufjs";
/** Namespace web. */
export namespace web {

    /** Properties of a MoveMessage. */
    interface IMoveMessage {

        /** MoveMessage AiScore */
        AiScore?: (number|null);

        /** MoveMessage AiBid */
        AiBid?: (number|null);

        /** MoveMessage PlayerScore */
        PlayerScore?: (number|null);

        /** MoveMessage PlayerBid */
        PlayerBid?: (number|null);

        /** MoveMessage HandValue */
        HandValue?: (number|null);
    }

    /** Represents a MoveMessage. */
    class MoveMessage implements IMoveMessage {

        /**
         * Constructs a new MoveMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: web.IMoveMessage);

        /** MoveMessage AiScore. */
        public AiScore: number;

        /** MoveMessage AiBid. */
        public AiBid: number;

        /** MoveMessage PlayerScore. */
        public PlayerScore: number;

        /** MoveMessage PlayerBid. */
        public PlayerBid: number;

        /** MoveMessage HandValue. */
        public HandValue: number;

        /**
         * Creates a new MoveMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MoveMessage instance
         */
        public static create(properties?: web.IMoveMessage): web.MoveMessage;

        /**
         * Encodes the specified MoveMessage message. Does not implicitly {@link web.MoveMessage.verify|verify} messages.
         * @param message MoveMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: web.IMoveMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MoveMessage message, length delimited. Does not implicitly {@link web.MoveMessage.verify|verify} messages.
         * @param message MoveMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: web.IMoveMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MoveMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MoveMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): web.MoveMessage;

        /**
         * Decodes a MoveMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MoveMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): web.MoveMessage;

        /**
         * Verifies a MoveMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MoveMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MoveMessage
         */
        public static fromObject(object: { [k: string]: any }): web.MoveMessage;

        /**
         * Creates a plain object from a MoveMessage message. Also converts values to other types if specified.
         * @param message MoveMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: web.MoveMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MoveMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TrickCompletedMessage. */
    interface ITrickCompletedMessage {

        /** TrickCompletedMessage Move */
        Move?: (web.IMoveMessage|null);

        /** TrickCompletedMessage TricksRemaining */
        TricksRemaining?: (number|null);
    }

    /** Represents a TrickCompletedMessage. */
    class TrickCompletedMessage implements ITrickCompletedMessage {

        /**
         * Constructs a new TrickCompletedMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: web.ITrickCompletedMessage);

        /** TrickCompletedMessage Move. */
        public Move?: (web.IMoveMessage|null);

        /** TrickCompletedMessage TricksRemaining. */
        public TricksRemaining: number;

        /**
         * Creates a new TrickCompletedMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TrickCompletedMessage instance
         */
        public static create(properties?: web.ITrickCompletedMessage): web.TrickCompletedMessage;

        /**
         * Encodes the specified TrickCompletedMessage message. Does not implicitly {@link web.TrickCompletedMessage.verify|verify} messages.
         * @param message TrickCompletedMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: web.ITrickCompletedMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TrickCompletedMessage message, length delimited. Does not implicitly {@link web.TrickCompletedMessage.verify|verify} messages.
         * @param message TrickCompletedMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: web.ITrickCompletedMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TrickCompletedMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TrickCompletedMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): web.TrickCompletedMessage;

        /**
         * Decodes a TrickCompletedMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TrickCompletedMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): web.TrickCompletedMessage;

        /**
         * Verifies a TrickCompletedMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TrickCompletedMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TrickCompletedMessage
         */
        public static fromObject(object: { [k: string]: any }): web.TrickCompletedMessage;

        /**
         * Creates a plain object from a TrickCompletedMessage message. Also converts values to other types if specified.
         * @param message TrickCompletedMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: web.TrickCompletedMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TrickCompletedMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AiDecidedMessage. */
    interface IAiDecidedMessage {
    }

    /** Represents an AiDecidedMessage. */
    class AiDecidedMessage implements IAiDecidedMessage {

        /**
         * Constructs a new AiDecidedMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: web.IAiDecidedMessage);

        /**
         * Creates a new AiDecidedMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AiDecidedMessage instance
         */
        public static create(properties?: web.IAiDecidedMessage): web.AiDecidedMessage;

        /**
         * Encodes the specified AiDecidedMessage message. Does not implicitly {@link web.AiDecidedMessage.verify|verify} messages.
         * @param message AiDecidedMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: web.IAiDecidedMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AiDecidedMessage message, length delimited. Does not implicitly {@link web.AiDecidedMessage.verify|verify} messages.
         * @param message AiDecidedMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: web.IAiDecidedMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AiDecidedMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AiDecidedMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): web.AiDecidedMessage;

        /**
         * Decodes an AiDecidedMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AiDecidedMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): web.AiDecidedMessage;

        /**
         * Verifies an AiDecidedMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AiDecidedMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AiDecidedMessage
         */
        public static fromObject(object: { [k: string]: any }): web.AiDecidedMessage;

        /**
         * Creates a plain object from an AiDecidedMessage message. Also converts values to other types if specified.
         * @param message AiDecidedMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: web.AiDecidedMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AiDecidedMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TrickDecidedMessage. */
    interface ITrickDecidedMessage {

        /** TrickDecidedMessage TrickPoints */
        TrickPoints?: (number|null);
    }

    /** Represents a TrickDecidedMessage. */
    class TrickDecidedMessage implements ITrickDecidedMessage {

        /**
         * Constructs a new TrickDecidedMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: web.ITrickDecidedMessage);

        /** TrickDecidedMessage TrickPoints. */
        public TrickPoints: number;

        /**
         * Creates a new TrickDecidedMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TrickDecidedMessage instance
         */
        public static create(properties?: web.ITrickDecidedMessage): web.TrickDecidedMessage;

        /**
         * Encodes the specified TrickDecidedMessage message. Does not implicitly {@link web.TrickDecidedMessage.verify|verify} messages.
         * @param message TrickDecidedMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: web.ITrickDecidedMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TrickDecidedMessage message, length delimited. Does not implicitly {@link web.TrickDecidedMessage.verify|verify} messages.
         * @param message TrickDecidedMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: web.ITrickDecidedMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TrickDecidedMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TrickDecidedMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): web.TrickDecidedMessage;

        /**
         * Decodes a TrickDecidedMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TrickDecidedMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): web.TrickDecidedMessage;

        /**
         * Verifies a TrickDecidedMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TrickDecidedMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TrickDecidedMessage
         */
        public static fromObject(object: { [k: string]: any }): web.TrickDecidedMessage;

        /**
         * Creates a plain object from a TrickDecidedMessage message. Also converts values to other types if specified.
         * @param message TrickDecidedMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: web.TrickDecidedMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TrickDecidedMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerDecidedMessage. */
    interface IPlayerDecidedMessage {

        /** PlayerDecidedMessage Value */
        Value?: (number|null);
    }

    /** Represents a PlayerDecidedMessage. */
    class PlayerDecidedMessage implements IPlayerDecidedMessage {

        /**
         * Constructs a new PlayerDecidedMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: web.IPlayerDecidedMessage);

        /** PlayerDecidedMessage Value. */
        public Value: number;

        /**
         * Creates a new PlayerDecidedMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerDecidedMessage instance
         */
        public static create(properties?: web.IPlayerDecidedMessage): web.PlayerDecidedMessage;

        /**
         * Encodes the specified PlayerDecidedMessage message. Does not implicitly {@link web.PlayerDecidedMessage.verify|verify} messages.
         * @param message PlayerDecidedMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: web.IPlayerDecidedMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerDecidedMessage message, length delimited. Does not implicitly {@link web.PlayerDecidedMessage.verify|verify} messages.
         * @param message PlayerDecidedMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: web.IPlayerDecidedMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerDecidedMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerDecidedMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): web.PlayerDecidedMessage;

        /**
         * Decodes a PlayerDecidedMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerDecidedMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): web.PlayerDecidedMessage;

        /**
         * Verifies a PlayerDecidedMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerDecidedMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerDecidedMessage
         */
        public static fromObject(object: { [k: string]: any }): web.PlayerDecidedMessage;

        /**
         * Creates a plain object from a PlayerDecidedMessage message. Also converts values to other types if specified.
         * @param message PlayerDecidedMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: web.PlayerDecidedMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerDecidedMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResultsMessage. */
    interface IResultsMessage {

        /** ResultsMessage AiScore */
        AiScore?: (number|null);

        /** ResultsMessage PlayerScore */
        PlayerScore?: (number|null);

        /** ResultsMessage AiTotalGames */
        AiTotalGames?: (number|null);

        /** ResultsMessage PlayerTotalGames */
        PlayerTotalGames?: (number|null);

        /** ResultsMessage AiWinPercentage */
        AiWinPercentage?: (number|null);
    }

    /** Represents a ResultsMessage. */
    class ResultsMessage implements IResultsMessage {

        /**
         * Constructs a new ResultsMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: web.IResultsMessage);

        /** ResultsMessage AiScore. */
        public AiScore: number;

        /** ResultsMessage PlayerScore. */
        public PlayerScore: number;

        /** ResultsMessage AiTotalGames. */
        public AiTotalGames: number;

        /** ResultsMessage PlayerTotalGames. */
        public PlayerTotalGames: number;

        /** ResultsMessage AiWinPercentage. */
        public AiWinPercentage: number;

        /**
         * Creates a new ResultsMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResultsMessage instance
         */
        public static create(properties?: web.IResultsMessage): web.ResultsMessage;

        /**
         * Encodes the specified ResultsMessage message. Does not implicitly {@link web.ResultsMessage.verify|verify} messages.
         * @param message ResultsMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: web.IResultsMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResultsMessage message, length delimited. Does not implicitly {@link web.ResultsMessage.verify|verify} messages.
         * @param message ResultsMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: web.IResultsMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResultsMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResultsMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): web.ResultsMessage;

        /**
         * Decodes a ResultsMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResultsMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): web.ResultsMessage;

        /**
         * Verifies a ResultsMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResultsMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResultsMessage
         */
        public static fromObject(object: { [k: string]: any }): web.ResultsMessage;

        /**
         * Creates a plain object from a ResultsMessage message. Also converts values to other types if specified.
         * @param message ResultsMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: web.ResultsMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResultsMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StartGameMessage. */
    interface IStartGameMessage {
    }

    /** Represents a StartGameMessage. */
    class StartGameMessage implements IStartGameMessage {

        /**
         * Constructs a new StartGameMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: web.IStartGameMessage);

        /**
         * Creates a new StartGameMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StartGameMessage instance
         */
        public static create(properties?: web.IStartGameMessage): web.StartGameMessage;

        /**
         * Encodes the specified StartGameMessage message. Does not implicitly {@link web.StartGameMessage.verify|verify} messages.
         * @param message StartGameMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: web.IStartGameMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StartGameMessage message, length delimited. Does not implicitly {@link web.StartGameMessage.verify|verify} messages.
         * @param message StartGameMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: web.IStartGameMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StartGameMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StartGameMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): web.StartGameMessage;

        /**
         * Decodes a StartGameMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StartGameMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): web.StartGameMessage;

        /**
         * Verifies a StartGameMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StartGameMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StartGameMessage
         */
        public static fromObject(object: { [k: string]: any }): web.StartGameMessage;

        /**
         * Creates a plain object from a StartGameMessage message. Also converts values to other types if specified.
         * @param message StartGameMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: web.StartGameMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StartGameMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EndSessionMessage. */
    interface IEndSessionMessage {
    }

    /** Represents an EndSessionMessage. */
    class EndSessionMessage implements IEndSessionMessage {

        /**
         * Constructs a new EndSessionMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: web.IEndSessionMessage);

        /**
         * Creates a new EndSessionMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EndSessionMessage instance
         */
        public static create(properties?: web.IEndSessionMessage): web.EndSessionMessage;

        /**
         * Encodes the specified EndSessionMessage message. Does not implicitly {@link web.EndSessionMessage.verify|verify} messages.
         * @param message EndSessionMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: web.IEndSessionMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EndSessionMessage message, length delimited. Does not implicitly {@link web.EndSessionMessage.verify|verify} messages.
         * @param message EndSessionMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: web.IEndSessionMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EndSessionMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EndSessionMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): web.EndSessionMessage;

        /**
         * Decodes an EndSessionMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EndSessionMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): web.EndSessionMessage;

        /**
         * Verifies an EndSessionMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EndSessionMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EndSessionMessage
         */
        public static fromObject(object: { [k: string]: any }): web.EndSessionMessage;

        /**
         * Creates a plain object from an EndSessionMessage message. Also converts values to other types if specified.
         * @param message EndSessionMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: web.EndSessionMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EndSessionMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SetAiMessage. */
    interface ISetAiMessage {

        /** SetAiMessage AiName */
        AiName?: (string|null);
    }

    /** Represents a SetAiMessage. */
    class SetAiMessage implements ISetAiMessage {

        /**
         * Constructs a new SetAiMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: web.ISetAiMessage);

        /** SetAiMessage AiName. */
        public AiName: string;

        /**
         * Creates a new SetAiMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SetAiMessage instance
         */
        public static create(properties?: web.ISetAiMessage): web.SetAiMessage;

        /**
         * Encodes the specified SetAiMessage message. Does not implicitly {@link web.SetAiMessage.verify|verify} messages.
         * @param message SetAiMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: web.ISetAiMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SetAiMessage message, length delimited. Does not implicitly {@link web.SetAiMessage.verify|verify} messages.
         * @param message SetAiMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: web.ISetAiMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SetAiMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SetAiMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): web.SetAiMessage;

        /**
         * Decodes a SetAiMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SetAiMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): web.SetAiMessage;

        /**
         * Verifies a SetAiMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SetAiMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SetAiMessage
         */
        public static fromObject(object: { [k: string]: any }): web.SetAiMessage;

        /**
         * Creates a plain object from a SetAiMessage message. Also converts values to other types if specified.
         * @param message SetAiMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: web.SetAiMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SetAiMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ErrorMessage. */
    interface IErrorMessage {

        /** ErrorMessage Message */
        Message?: (string|null);
    }

    /** Represents an ErrorMessage. */
    class ErrorMessage implements IErrorMessage {

        /**
         * Constructs a new ErrorMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: web.IErrorMessage);

        /** ErrorMessage Message. */
        public Message: string;

        /**
         * Creates a new ErrorMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ErrorMessage instance
         */
        public static create(properties?: web.IErrorMessage): web.ErrorMessage;

        /**
         * Encodes the specified ErrorMessage message. Does not implicitly {@link web.ErrorMessage.verify|verify} messages.
         * @param message ErrorMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: web.IErrorMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ErrorMessage message, length delimited. Does not implicitly {@link web.ErrorMessage.verify|verify} messages.
         * @param message ErrorMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: web.IErrorMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ErrorMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ErrorMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): web.ErrorMessage;

        /**
         * Decodes an ErrorMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ErrorMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): web.ErrorMessage;

        /**
         * Verifies an ErrorMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ErrorMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ErrorMessage
         */
        public static fromObject(object: { [k: string]: any }): web.ErrorMessage;

        /**
         * Creates a plain object from an ErrorMessage message. Also converts values to other types if specified.
         * @param message ErrorMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: web.ErrorMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ErrorMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Wrapper. */
    interface IWrapper {

        /** Wrapper payload */
        payload?: (google.protobuf.IAny|null);
    }

    /** Represents a Wrapper. */
    class Wrapper implements IWrapper {

        /**
         * Constructs a new Wrapper.
         * @param [properties] Properties to set
         */
        constructor(properties?: web.IWrapper);

        /** Wrapper payload. */
        public payload?: (google.protobuf.IAny|null);

        /**
         * Creates a new Wrapper instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Wrapper instance
         */
        public static create(properties?: web.IWrapper): web.Wrapper;

        /**
         * Encodes the specified Wrapper message. Does not implicitly {@link web.Wrapper.verify|verify} messages.
         * @param message Wrapper message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: web.IWrapper, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Wrapper message, length delimited. Does not implicitly {@link web.Wrapper.verify|verify} messages.
         * @param message Wrapper message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: web.IWrapper, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Wrapper message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Wrapper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): web.Wrapper;

        /**
         * Decodes a Wrapper message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Wrapper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): web.Wrapper;

        /**
         * Verifies a Wrapper message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Wrapper message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Wrapper
         */
        public static fromObject(object: { [k: string]: any }): web.Wrapper;

        /**
         * Creates a plain object from a Wrapper message. Also converts values to other types if specified.
         * @param message Wrapper
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: web.Wrapper, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Wrapper to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of an Any. */
        interface IAny {

            /** Any type_url */
            type_url?: (string|null);

            /** Any value */
            value?: (Uint8Array|null);
        }

        /** Represents an Any. */
        class Any implements IAny {

            /**
             * Constructs a new Any.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IAny);

            /** Any type_url. */
            public type_url: string;

            /** Any value. */
            public value: Uint8Array;

            /**
             * Creates a new Any instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Any instance
             */
            public static create(properties?: google.protobuf.IAny): google.protobuf.Any;

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Any;

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Any;

            /**
             * Verifies an Any message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Any
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Any;

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @param message Any
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Any, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Any to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
