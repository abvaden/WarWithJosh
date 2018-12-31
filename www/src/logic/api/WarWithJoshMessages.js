/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const web = $root.web = (() => {

    /**
     * Namespace web.
     * @exports web
     * @namespace
     */
    const web = {};

    web.MoveMessage = (function() {

        /**
         * Properties of a MoveMessage.
         * @memberof web
         * @interface IMoveMessage
         * @property {number|null} [AiScore] MoveMessage AiScore
         * @property {number|null} [AiBid] MoveMessage AiBid
         * @property {number|null} [PlayerScore] MoveMessage PlayerScore
         * @property {number|null} [PlayerBid] MoveMessage PlayerBid
         * @property {number|null} [HandValue] MoveMessage HandValue
         */

        /**
         * Constructs a new MoveMessage.
         * @memberof web
         * @classdesc Represents a MoveMessage.
         * @implements IMoveMessage
         * @constructor
         * @param {web.IMoveMessage=} [properties] Properties to set
         */
        function MoveMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MoveMessage AiScore.
         * @member {number} AiScore
         * @memberof web.MoveMessage
         * @instance
         */
        MoveMessage.prototype.AiScore = 0;

        /**
         * MoveMessage AiBid.
         * @member {number} AiBid
         * @memberof web.MoveMessage
         * @instance
         */
        MoveMessage.prototype.AiBid = 0;

        /**
         * MoveMessage PlayerScore.
         * @member {number} PlayerScore
         * @memberof web.MoveMessage
         * @instance
         */
        MoveMessage.prototype.PlayerScore = 0;

        /**
         * MoveMessage PlayerBid.
         * @member {number} PlayerBid
         * @memberof web.MoveMessage
         * @instance
         */
        MoveMessage.prototype.PlayerBid = 0;

        /**
         * MoveMessage HandValue.
         * @member {number} HandValue
         * @memberof web.MoveMessage
         * @instance
         */
        MoveMessage.prototype.HandValue = 0;

        /**
         * Creates a new MoveMessage instance using the specified properties.
         * @function create
         * @memberof web.MoveMessage
         * @static
         * @param {web.IMoveMessage=} [properties] Properties to set
         * @returns {web.MoveMessage} MoveMessage instance
         */
        MoveMessage.create = function create(properties) {
            return new MoveMessage(properties);
        };

        /**
         * Encodes the specified MoveMessage message. Does not implicitly {@link web.MoveMessage.verify|verify} messages.
         * @function encode
         * @memberof web.MoveMessage
         * @static
         * @param {web.IMoveMessage} message MoveMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MoveMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.AiScore != null && message.hasOwnProperty("AiScore"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.AiScore);
            if (message.AiBid != null && message.hasOwnProperty("AiBid"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.AiBid);
            if (message.PlayerScore != null && message.hasOwnProperty("PlayerScore"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.PlayerScore);
            if (message.PlayerBid != null && message.hasOwnProperty("PlayerBid"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.PlayerBid);
            if (message.HandValue != null && message.hasOwnProperty("HandValue"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.HandValue);
            return writer;
        };

        /**
         * Encodes the specified MoveMessage message, length delimited. Does not implicitly {@link web.MoveMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof web.MoveMessage
         * @static
         * @param {web.IMoveMessage} message MoveMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MoveMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MoveMessage message from the specified reader or buffer.
         * @function decode
         * @memberof web.MoveMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {web.MoveMessage} MoveMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MoveMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.web.MoveMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.AiScore = reader.float();
                    break;
                case 2:
                    message.AiBid = reader.uint32();
                    break;
                case 3:
                    message.PlayerScore = reader.float();
                    break;
                case 4:
                    message.PlayerBid = reader.uint32();
                    break;
                case 5:
                    message.HandValue = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MoveMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof web.MoveMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {web.MoveMessage} MoveMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MoveMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MoveMessage message.
         * @function verify
         * @memberof web.MoveMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MoveMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.AiScore != null && message.hasOwnProperty("AiScore"))
                if (typeof message.AiScore !== "number")
                    return "AiScore: number expected";
            if (message.AiBid != null && message.hasOwnProperty("AiBid"))
                if (!$util.isInteger(message.AiBid))
                    return "AiBid: integer expected";
            if (message.PlayerScore != null && message.hasOwnProperty("PlayerScore"))
                if (typeof message.PlayerScore !== "number")
                    return "PlayerScore: number expected";
            if (message.PlayerBid != null && message.hasOwnProperty("PlayerBid"))
                if (!$util.isInteger(message.PlayerBid))
                    return "PlayerBid: integer expected";
            if (message.HandValue != null && message.hasOwnProperty("HandValue"))
                if (!$util.isInteger(message.HandValue))
                    return "HandValue: integer expected";
            return null;
        };

        /**
         * Creates a MoveMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof web.MoveMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {web.MoveMessage} MoveMessage
         */
        MoveMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.web.MoveMessage)
                return object;
            let message = new $root.web.MoveMessage();
            if (object.AiScore != null)
                message.AiScore = Number(object.AiScore);
            if (object.AiBid != null)
                message.AiBid = object.AiBid >>> 0;
            if (object.PlayerScore != null)
                message.PlayerScore = Number(object.PlayerScore);
            if (object.PlayerBid != null)
                message.PlayerBid = object.PlayerBid >>> 0;
            if (object.HandValue != null)
                message.HandValue = object.HandValue >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a MoveMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof web.MoveMessage
         * @static
         * @param {web.MoveMessage} message MoveMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MoveMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.AiScore = 0;
                object.AiBid = 0;
                object.PlayerScore = 0;
                object.PlayerBid = 0;
                object.HandValue = 0;
            }
            if (message.AiScore != null && message.hasOwnProperty("AiScore"))
                object.AiScore = options.json && !isFinite(message.AiScore) ? String(message.AiScore) : message.AiScore;
            if (message.AiBid != null && message.hasOwnProperty("AiBid"))
                object.AiBid = message.AiBid;
            if (message.PlayerScore != null && message.hasOwnProperty("PlayerScore"))
                object.PlayerScore = options.json && !isFinite(message.PlayerScore) ? String(message.PlayerScore) : message.PlayerScore;
            if (message.PlayerBid != null && message.hasOwnProperty("PlayerBid"))
                object.PlayerBid = message.PlayerBid;
            if (message.HandValue != null && message.hasOwnProperty("HandValue"))
                object.HandValue = message.HandValue;
            return object;
        };

        /**
         * Converts this MoveMessage to JSON.
         * @function toJSON
         * @memberof web.MoveMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MoveMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MoveMessage;
    })();

    web.TrickCompletedMessage = (function() {

        /**
         * Properties of a TrickCompletedMessage.
         * @memberof web
         * @interface ITrickCompletedMessage
         * @property {web.IMoveMessage|null} [Move] TrickCompletedMessage Move
         * @property {number|null} [TricksRemaining] TrickCompletedMessage TricksRemaining
         */

        /**
         * Constructs a new TrickCompletedMessage.
         * @memberof web
         * @classdesc Represents a TrickCompletedMessage.
         * @implements ITrickCompletedMessage
         * @constructor
         * @param {web.ITrickCompletedMessage=} [properties] Properties to set
         */
        function TrickCompletedMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TrickCompletedMessage Move.
         * @member {web.IMoveMessage|null|undefined} Move
         * @memberof web.TrickCompletedMessage
         * @instance
         */
        TrickCompletedMessage.prototype.Move = null;

        /**
         * TrickCompletedMessage TricksRemaining.
         * @member {number} TricksRemaining
         * @memberof web.TrickCompletedMessage
         * @instance
         */
        TrickCompletedMessage.prototype.TricksRemaining = 0;

        /**
         * Creates a new TrickCompletedMessage instance using the specified properties.
         * @function create
         * @memberof web.TrickCompletedMessage
         * @static
         * @param {web.ITrickCompletedMessage=} [properties] Properties to set
         * @returns {web.TrickCompletedMessage} TrickCompletedMessage instance
         */
        TrickCompletedMessage.create = function create(properties) {
            return new TrickCompletedMessage(properties);
        };

        /**
         * Encodes the specified TrickCompletedMessage message. Does not implicitly {@link web.TrickCompletedMessage.verify|verify} messages.
         * @function encode
         * @memberof web.TrickCompletedMessage
         * @static
         * @param {web.ITrickCompletedMessage} message TrickCompletedMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TrickCompletedMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Move != null && message.hasOwnProperty("Move"))
                $root.web.MoveMessage.encode(message.Move, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.TricksRemaining != null && message.hasOwnProperty("TricksRemaining"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.TricksRemaining);
            return writer;
        };

        /**
         * Encodes the specified TrickCompletedMessage message, length delimited. Does not implicitly {@link web.TrickCompletedMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof web.TrickCompletedMessage
         * @static
         * @param {web.ITrickCompletedMessage} message TrickCompletedMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TrickCompletedMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TrickCompletedMessage message from the specified reader or buffer.
         * @function decode
         * @memberof web.TrickCompletedMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {web.TrickCompletedMessage} TrickCompletedMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TrickCompletedMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.web.TrickCompletedMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Move = $root.web.MoveMessage.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.TricksRemaining = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TrickCompletedMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof web.TrickCompletedMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {web.TrickCompletedMessage} TrickCompletedMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TrickCompletedMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TrickCompletedMessage message.
         * @function verify
         * @memberof web.TrickCompletedMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TrickCompletedMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Move != null && message.hasOwnProperty("Move")) {
                let error = $root.web.MoveMessage.verify(message.Move);
                if (error)
                    return "Move." + error;
            }
            if (message.TricksRemaining != null && message.hasOwnProperty("TricksRemaining"))
                if (!$util.isInteger(message.TricksRemaining))
                    return "TricksRemaining: integer expected";
            return null;
        };

        /**
         * Creates a TrickCompletedMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof web.TrickCompletedMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {web.TrickCompletedMessage} TrickCompletedMessage
         */
        TrickCompletedMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.web.TrickCompletedMessage)
                return object;
            let message = new $root.web.TrickCompletedMessage();
            if (object.Move != null) {
                if (typeof object.Move !== "object")
                    throw TypeError(".web.TrickCompletedMessage.Move: object expected");
                message.Move = $root.web.MoveMessage.fromObject(object.Move);
            }
            if (object.TricksRemaining != null)
                message.TricksRemaining = object.TricksRemaining >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a TrickCompletedMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof web.TrickCompletedMessage
         * @static
         * @param {web.TrickCompletedMessage} message TrickCompletedMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TrickCompletedMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.Move = null;
                object.TricksRemaining = 0;
            }
            if (message.Move != null && message.hasOwnProperty("Move"))
                object.Move = $root.web.MoveMessage.toObject(message.Move, options);
            if (message.TricksRemaining != null && message.hasOwnProperty("TricksRemaining"))
                object.TricksRemaining = message.TricksRemaining;
            return object;
        };

        /**
         * Converts this TrickCompletedMessage to JSON.
         * @function toJSON
         * @memberof web.TrickCompletedMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TrickCompletedMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TrickCompletedMessage;
    })();

    web.AiDecidedMessage = (function() {

        /**
         * Properties of an AiDecidedMessage.
         * @memberof web
         * @interface IAiDecidedMessage
         */

        /**
         * Constructs a new AiDecidedMessage.
         * @memberof web
         * @classdesc Represents an AiDecidedMessage.
         * @implements IAiDecidedMessage
         * @constructor
         * @param {web.IAiDecidedMessage=} [properties] Properties to set
         */
        function AiDecidedMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new AiDecidedMessage instance using the specified properties.
         * @function create
         * @memberof web.AiDecidedMessage
         * @static
         * @param {web.IAiDecidedMessage=} [properties] Properties to set
         * @returns {web.AiDecidedMessage} AiDecidedMessage instance
         */
        AiDecidedMessage.create = function create(properties) {
            return new AiDecidedMessage(properties);
        };

        /**
         * Encodes the specified AiDecidedMessage message. Does not implicitly {@link web.AiDecidedMessage.verify|verify} messages.
         * @function encode
         * @memberof web.AiDecidedMessage
         * @static
         * @param {web.IAiDecidedMessage} message AiDecidedMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AiDecidedMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified AiDecidedMessage message, length delimited. Does not implicitly {@link web.AiDecidedMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof web.AiDecidedMessage
         * @static
         * @param {web.IAiDecidedMessage} message AiDecidedMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AiDecidedMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AiDecidedMessage message from the specified reader or buffer.
         * @function decode
         * @memberof web.AiDecidedMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {web.AiDecidedMessage} AiDecidedMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AiDecidedMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.web.AiDecidedMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AiDecidedMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof web.AiDecidedMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {web.AiDecidedMessage} AiDecidedMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AiDecidedMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AiDecidedMessage message.
         * @function verify
         * @memberof web.AiDecidedMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AiDecidedMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates an AiDecidedMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof web.AiDecidedMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {web.AiDecidedMessage} AiDecidedMessage
         */
        AiDecidedMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.web.AiDecidedMessage)
                return object;
            return new $root.web.AiDecidedMessage();
        };

        /**
         * Creates a plain object from an AiDecidedMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof web.AiDecidedMessage
         * @static
         * @param {web.AiDecidedMessage} message AiDecidedMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AiDecidedMessage.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this AiDecidedMessage to JSON.
         * @function toJSON
         * @memberof web.AiDecidedMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AiDecidedMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AiDecidedMessage;
    })();

    web.TrickDecidedMessage = (function() {

        /**
         * Properties of a TrickDecidedMessage.
         * @memberof web
         * @interface ITrickDecidedMessage
         * @property {number|null} [TrickPoints] TrickDecidedMessage TrickPoints
         */

        /**
         * Constructs a new TrickDecidedMessage.
         * @memberof web
         * @classdesc Represents a TrickDecidedMessage.
         * @implements ITrickDecidedMessage
         * @constructor
         * @param {web.ITrickDecidedMessage=} [properties] Properties to set
         */
        function TrickDecidedMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TrickDecidedMessage TrickPoints.
         * @member {number} TrickPoints
         * @memberof web.TrickDecidedMessage
         * @instance
         */
        TrickDecidedMessage.prototype.TrickPoints = 0;

        /**
         * Creates a new TrickDecidedMessage instance using the specified properties.
         * @function create
         * @memberof web.TrickDecidedMessage
         * @static
         * @param {web.ITrickDecidedMessage=} [properties] Properties to set
         * @returns {web.TrickDecidedMessage} TrickDecidedMessage instance
         */
        TrickDecidedMessage.create = function create(properties) {
            return new TrickDecidedMessage(properties);
        };

        /**
         * Encodes the specified TrickDecidedMessage message. Does not implicitly {@link web.TrickDecidedMessage.verify|verify} messages.
         * @function encode
         * @memberof web.TrickDecidedMessage
         * @static
         * @param {web.ITrickDecidedMessage} message TrickDecidedMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TrickDecidedMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.TrickPoints != null && message.hasOwnProperty("TrickPoints"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.TrickPoints);
            return writer;
        };

        /**
         * Encodes the specified TrickDecidedMessage message, length delimited. Does not implicitly {@link web.TrickDecidedMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof web.TrickDecidedMessage
         * @static
         * @param {web.ITrickDecidedMessage} message TrickDecidedMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TrickDecidedMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TrickDecidedMessage message from the specified reader or buffer.
         * @function decode
         * @memberof web.TrickDecidedMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {web.TrickDecidedMessage} TrickDecidedMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TrickDecidedMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.web.TrickDecidedMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.TrickPoints = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TrickDecidedMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof web.TrickDecidedMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {web.TrickDecidedMessage} TrickDecidedMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TrickDecidedMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TrickDecidedMessage message.
         * @function verify
         * @memberof web.TrickDecidedMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TrickDecidedMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.TrickPoints != null && message.hasOwnProperty("TrickPoints"))
                if (!$util.isInteger(message.TrickPoints))
                    return "TrickPoints: integer expected";
            return null;
        };

        /**
         * Creates a TrickDecidedMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof web.TrickDecidedMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {web.TrickDecidedMessage} TrickDecidedMessage
         */
        TrickDecidedMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.web.TrickDecidedMessage)
                return object;
            let message = new $root.web.TrickDecidedMessage();
            if (object.TrickPoints != null)
                message.TrickPoints = object.TrickPoints >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a TrickDecidedMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof web.TrickDecidedMessage
         * @static
         * @param {web.TrickDecidedMessage} message TrickDecidedMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TrickDecidedMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.TrickPoints = 0;
            if (message.TrickPoints != null && message.hasOwnProperty("TrickPoints"))
                object.TrickPoints = message.TrickPoints;
            return object;
        };

        /**
         * Converts this TrickDecidedMessage to JSON.
         * @function toJSON
         * @memberof web.TrickDecidedMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TrickDecidedMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TrickDecidedMessage;
    })();

    web.PlayerDecidedMessage = (function() {

        /**
         * Properties of a PlayerDecidedMessage.
         * @memberof web
         * @interface IPlayerDecidedMessage
         * @property {number|null} [Value] PlayerDecidedMessage Value
         */

        /**
         * Constructs a new PlayerDecidedMessage.
         * @memberof web
         * @classdesc Represents a PlayerDecidedMessage.
         * @implements IPlayerDecidedMessage
         * @constructor
         * @param {web.IPlayerDecidedMessage=} [properties] Properties to set
         */
        function PlayerDecidedMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerDecidedMessage Value.
         * @member {number} Value
         * @memberof web.PlayerDecidedMessage
         * @instance
         */
        PlayerDecidedMessage.prototype.Value = 0;

        /**
         * Creates a new PlayerDecidedMessage instance using the specified properties.
         * @function create
         * @memberof web.PlayerDecidedMessage
         * @static
         * @param {web.IPlayerDecidedMessage=} [properties] Properties to set
         * @returns {web.PlayerDecidedMessage} PlayerDecidedMessage instance
         */
        PlayerDecidedMessage.create = function create(properties) {
            return new PlayerDecidedMessage(properties);
        };

        /**
         * Encodes the specified PlayerDecidedMessage message. Does not implicitly {@link web.PlayerDecidedMessage.verify|verify} messages.
         * @function encode
         * @memberof web.PlayerDecidedMessage
         * @static
         * @param {web.IPlayerDecidedMessage} message PlayerDecidedMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerDecidedMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Value != null && message.hasOwnProperty("Value"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.Value);
            return writer;
        };

        /**
         * Encodes the specified PlayerDecidedMessage message, length delimited. Does not implicitly {@link web.PlayerDecidedMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof web.PlayerDecidedMessage
         * @static
         * @param {web.IPlayerDecidedMessage} message PlayerDecidedMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerDecidedMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerDecidedMessage message from the specified reader or buffer.
         * @function decode
         * @memberof web.PlayerDecidedMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {web.PlayerDecidedMessage} PlayerDecidedMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerDecidedMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.web.PlayerDecidedMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Value = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerDecidedMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof web.PlayerDecidedMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {web.PlayerDecidedMessage} PlayerDecidedMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerDecidedMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerDecidedMessage message.
         * @function verify
         * @memberof web.PlayerDecidedMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerDecidedMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Value != null && message.hasOwnProperty("Value"))
                if (!$util.isInteger(message.Value))
                    return "Value: integer expected";
            return null;
        };

        /**
         * Creates a PlayerDecidedMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof web.PlayerDecidedMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {web.PlayerDecidedMessage} PlayerDecidedMessage
         */
        PlayerDecidedMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.web.PlayerDecidedMessage)
                return object;
            let message = new $root.web.PlayerDecidedMessage();
            if (object.Value != null)
                message.Value = object.Value >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerDecidedMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof web.PlayerDecidedMessage
         * @static
         * @param {web.PlayerDecidedMessage} message PlayerDecidedMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerDecidedMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.Value = 0;
            if (message.Value != null && message.hasOwnProperty("Value"))
                object.Value = message.Value;
            return object;
        };

        /**
         * Converts this PlayerDecidedMessage to JSON.
         * @function toJSON
         * @memberof web.PlayerDecidedMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerDecidedMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerDecidedMessage;
    })();

    web.ResultsMessage = (function() {

        /**
         * Properties of a ResultsMessage.
         * @memberof web
         * @interface IResultsMessage
         * @property {number|null} [AiScore] ResultsMessage AiScore
         * @property {number|null} [PlayerScore] ResultsMessage PlayerScore
         * @property {number|null} [AiTotalGames] ResultsMessage AiTotalGames
         * @property {number|null} [PlayerTotalGames] ResultsMessage PlayerTotalGames
         * @property {number|null} [AiWinPercentage] ResultsMessage AiWinPercentage
         */

        /**
         * Constructs a new ResultsMessage.
         * @memberof web
         * @classdesc Represents a ResultsMessage.
         * @implements IResultsMessage
         * @constructor
         * @param {web.IResultsMessage=} [properties] Properties to set
         */
        function ResultsMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ResultsMessage AiScore.
         * @member {number} AiScore
         * @memberof web.ResultsMessage
         * @instance
         */
        ResultsMessage.prototype.AiScore = 0;

        /**
         * ResultsMessage PlayerScore.
         * @member {number} PlayerScore
         * @memberof web.ResultsMessage
         * @instance
         */
        ResultsMessage.prototype.PlayerScore = 0;

        /**
         * ResultsMessage AiTotalGames.
         * @member {number} AiTotalGames
         * @memberof web.ResultsMessage
         * @instance
         */
        ResultsMessage.prototype.AiTotalGames = 0;

        /**
         * ResultsMessage PlayerTotalGames.
         * @member {number} PlayerTotalGames
         * @memberof web.ResultsMessage
         * @instance
         */
        ResultsMessage.prototype.PlayerTotalGames = 0;

        /**
         * ResultsMessage AiWinPercentage.
         * @member {number} AiWinPercentage
         * @memberof web.ResultsMessage
         * @instance
         */
        ResultsMessage.prototype.AiWinPercentage = 0;

        /**
         * Creates a new ResultsMessage instance using the specified properties.
         * @function create
         * @memberof web.ResultsMessage
         * @static
         * @param {web.IResultsMessage=} [properties] Properties to set
         * @returns {web.ResultsMessage} ResultsMessage instance
         */
        ResultsMessage.create = function create(properties) {
            return new ResultsMessage(properties);
        };

        /**
         * Encodes the specified ResultsMessage message. Does not implicitly {@link web.ResultsMessage.verify|verify} messages.
         * @function encode
         * @memberof web.ResultsMessage
         * @static
         * @param {web.IResultsMessage} message ResultsMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResultsMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.AiScore != null && message.hasOwnProperty("AiScore"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.AiScore);
            if (message.PlayerScore != null && message.hasOwnProperty("PlayerScore"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.PlayerScore);
            if (message.AiTotalGames != null && message.hasOwnProperty("AiTotalGames"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.AiTotalGames);
            if (message.PlayerTotalGames != null && message.hasOwnProperty("PlayerTotalGames"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.PlayerTotalGames);
            if (message.AiWinPercentage != null && message.hasOwnProperty("AiWinPercentage"))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.AiWinPercentage);
            return writer;
        };

        /**
         * Encodes the specified ResultsMessage message, length delimited. Does not implicitly {@link web.ResultsMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof web.ResultsMessage
         * @static
         * @param {web.IResultsMessage} message ResultsMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResultsMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ResultsMessage message from the specified reader or buffer.
         * @function decode
         * @memberof web.ResultsMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {web.ResultsMessage} ResultsMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResultsMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.web.ResultsMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.AiScore = reader.float();
                    break;
                case 2:
                    message.PlayerScore = reader.float();
                    break;
                case 3:
                    message.AiTotalGames = reader.uint32();
                    break;
                case 4:
                    message.PlayerTotalGames = reader.uint32();
                    break;
                case 5:
                    message.AiWinPercentage = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ResultsMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof web.ResultsMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {web.ResultsMessage} ResultsMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResultsMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ResultsMessage message.
         * @function verify
         * @memberof web.ResultsMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ResultsMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.AiScore != null && message.hasOwnProperty("AiScore"))
                if (typeof message.AiScore !== "number")
                    return "AiScore: number expected";
            if (message.PlayerScore != null && message.hasOwnProperty("PlayerScore"))
                if (typeof message.PlayerScore !== "number")
                    return "PlayerScore: number expected";
            if (message.AiTotalGames != null && message.hasOwnProperty("AiTotalGames"))
                if (!$util.isInteger(message.AiTotalGames))
                    return "AiTotalGames: integer expected";
            if (message.PlayerTotalGames != null && message.hasOwnProperty("PlayerTotalGames"))
                if (!$util.isInteger(message.PlayerTotalGames))
                    return "PlayerTotalGames: integer expected";
            if (message.AiWinPercentage != null && message.hasOwnProperty("AiWinPercentage"))
                if (typeof message.AiWinPercentage !== "number")
                    return "AiWinPercentage: number expected";
            return null;
        };

        /**
         * Creates a ResultsMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof web.ResultsMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {web.ResultsMessage} ResultsMessage
         */
        ResultsMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.web.ResultsMessage)
                return object;
            let message = new $root.web.ResultsMessage();
            if (object.AiScore != null)
                message.AiScore = Number(object.AiScore);
            if (object.PlayerScore != null)
                message.PlayerScore = Number(object.PlayerScore);
            if (object.AiTotalGames != null)
                message.AiTotalGames = object.AiTotalGames >>> 0;
            if (object.PlayerTotalGames != null)
                message.PlayerTotalGames = object.PlayerTotalGames >>> 0;
            if (object.AiWinPercentage != null)
                message.AiWinPercentage = Number(object.AiWinPercentage);
            return message;
        };

        /**
         * Creates a plain object from a ResultsMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof web.ResultsMessage
         * @static
         * @param {web.ResultsMessage} message ResultsMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ResultsMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.AiScore = 0;
                object.PlayerScore = 0;
                object.AiTotalGames = 0;
                object.PlayerTotalGames = 0;
                object.AiWinPercentage = 0;
            }
            if (message.AiScore != null && message.hasOwnProperty("AiScore"))
                object.AiScore = options.json && !isFinite(message.AiScore) ? String(message.AiScore) : message.AiScore;
            if (message.PlayerScore != null && message.hasOwnProperty("PlayerScore"))
                object.PlayerScore = options.json && !isFinite(message.PlayerScore) ? String(message.PlayerScore) : message.PlayerScore;
            if (message.AiTotalGames != null && message.hasOwnProperty("AiTotalGames"))
                object.AiTotalGames = message.AiTotalGames;
            if (message.PlayerTotalGames != null && message.hasOwnProperty("PlayerTotalGames"))
                object.PlayerTotalGames = message.PlayerTotalGames;
            if (message.AiWinPercentage != null && message.hasOwnProperty("AiWinPercentage"))
                object.AiWinPercentage = options.json && !isFinite(message.AiWinPercentage) ? String(message.AiWinPercentage) : message.AiWinPercentage;
            return object;
        };

        /**
         * Converts this ResultsMessage to JSON.
         * @function toJSON
         * @memberof web.ResultsMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ResultsMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ResultsMessage;
    })();

    web.StartGameMessage = (function() {

        /**
         * Properties of a StartGameMessage.
         * @memberof web
         * @interface IStartGameMessage
         */

        /**
         * Constructs a new StartGameMessage.
         * @memberof web
         * @classdesc Represents a StartGameMessage.
         * @implements IStartGameMessage
         * @constructor
         * @param {web.IStartGameMessage=} [properties] Properties to set
         */
        function StartGameMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new StartGameMessage instance using the specified properties.
         * @function create
         * @memberof web.StartGameMessage
         * @static
         * @param {web.IStartGameMessage=} [properties] Properties to set
         * @returns {web.StartGameMessage} StartGameMessage instance
         */
        StartGameMessage.create = function create(properties) {
            return new StartGameMessage(properties);
        };

        /**
         * Encodes the specified StartGameMessage message. Does not implicitly {@link web.StartGameMessage.verify|verify} messages.
         * @function encode
         * @memberof web.StartGameMessage
         * @static
         * @param {web.IStartGameMessage} message StartGameMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartGameMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified StartGameMessage message, length delimited. Does not implicitly {@link web.StartGameMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof web.StartGameMessage
         * @static
         * @param {web.IStartGameMessage} message StartGameMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartGameMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StartGameMessage message from the specified reader or buffer.
         * @function decode
         * @memberof web.StartGameMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {web.StartGameMessage} StartGameMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartGameMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.web.StartGameMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StartGameMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof web.StartGameMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {web.StartGameMessage} StartGameMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartGameMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StartGameMessage message.
         * @function verify
         * @memberof web.StartGameMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StartGameMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a StartGameMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof web.StartGameMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {web.StartGameMessage} StartGameMessage
         */
        StartGameMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.web.StartGameMessage)
                return object;
            return new $root.web.StartGameMessage();
        };

        /**
         * Creates a plain object from a StartGameMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof web.StartGameMessage
         * @static
         * @param {web.StartGameMessage} message StartGameMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StartGameMessage.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this StartGameMessage to JSON.
         * @function toJSON
         * @memberof web.StartGameMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StartGameMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StartGameMessage;
    })();

    web.EndSessionMessage = (function() {

        /**
         * Properties of an EndSessionMessage.
         * @memberof web
         * @interface IEndSessionMessage
         */

        /**
         * Constructs a new EndSessionMessage.
         * @memberof web
         * @classdesc Represents an EndSessionMessage.
         * @implements IEndSessionMessage
         * @constructor
         * @param {web.IEndSessionMessage=} [properties] Properties to set
         */
        function EndSessionMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new EndSessionMessage instance using the specified properties.
         * @function create
         * @memberof web.EndSessionMessage
         * @static
         * @param {web.IEndSessionMessage=} [properties] Properties to set
         * @returns {web.EndSessionMessage} EndSessionMessage instance
         */
        EndSessionMessage.create = function create(properties) {
            return new EndSessionMessage(properties);
        };

        /**
         * Encodes the specified EndSessionMessage message. Does not implicitly {@link web.EndSessionMessage.verify|verify} messages.
         * @function encode
         * @memberof web.EndSessionMessage
         * @static
         * @param {web.IEndSessionMessage} message EndSessionMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EndSessionMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified EndSessionMessage message, length delimited. Does not implicitly {@link web.EndSessionMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof web.EndSessionMessage
         * @static
         * @param {web.IEndSessionMessage} message EndSessionMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EndSessionMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EndSessionMessage message from the specified reader or buffer.
         * @function decode
         * @memberof web.EndSessionMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {web.EndSessionMessage} EndSessionMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EndSessionMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.web.EndSessionMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EndSessionMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof web.EndSessionMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {web.EndSessionMessage} EndSessionMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EndSessionMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EndSessionMessage message.
         * @function verify
         * @memberof web.EndSessionMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EndSessionMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates an EndSessionMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof web.EndSessionMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {web.EndSessionMessage} EndSessionMessage
         */
        EndSessionMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.web.EndSessionMessage)
                return object;
            return new $root.web.EndSessionMessage();
        };

        /**
         * Creates a plain object from an EndSessionMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof web.EndSessionMessage
         * @static
         * @param {web.EndSessionMessage} message EndSessionMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EndSessionMessage.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this EndSessionMessage to JSON.
         * @function toJSON
         * @memberof web.EndSessionMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EndSessionMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EndSessionMessage;
    })();

    web.SetAiMessage = (function() {

        /**
         * Properties of a SetAiMessage.
         * @memberof web
         * @interface ISetAiMessage
         * @property {string|null} [AiName] SetAiMessage AiName
         */

        /**
         * Constructs a new SetAiMessage.
         * @memberof web
         * @classdesc Represents a SetAiMessage.
         * @implements ISetAiMessage
         * @constructor
         * @param {web.ISetAiMessage=} [properties] Properties to set
         */
        function SetAiMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SetAiMessage AiName.
         * @member {string} AiName
         * @memberof web.SetAiMessage
         * @instance
         */
        SetAiMessage.prototype.AiName = "";

        /**
         * Creates a new SetAiMessage instance using the specified properties.
         * @function create
         * @memberof web.SetAiMessage
         * @static
         * @param {web.ISetAiMessage=} [properties] Properties to set
         * @returns {web.SetAiMessage} SetAiMessage instance
         */
        SetAiMessage.create = function create(properties) {
            return new SetAiMessage(properties);
        };

        /**
         * Encodes the specified SetAiMessage message. Does not implicitly {@link web.SetAiMessage.verify|verify} messages.
         * @function encode
         * @memberof web.SetAiMessage
         * @static
         * @param {web.ISetAiMessage} message SetAiMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SetAiMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.AiName != null && message.hasOwnProperty("AiName"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.AiName);
            return writer;
        };

        /**
         * Encodes the specified SetAiMessage message, length delimited. Does not implicitly {@link web.SetAiMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof web.SetAiMessage
         * @static
         * @param {web.ISetAiMessage} message SetAiMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SetAiMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SetAiMessage message from the specified reader or buffer.
         * @function decode
         * @memberof web.SetAiMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {web.SetAiMessage} SetAiMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SetAiMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.web.SetAiMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.AiName = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SetAiMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof web.SetAiMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {web.SetAiMessage} SetAiMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SetAiMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SetAiMessage message.
         * @function verify
         * @memberof web.SetAiMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SetAiMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.AiName != null && message.hasOwnProperty("AiName"))
                if (!$util.isString(message.AiName))
                    return "AiName: string expected";
            return null;
        };

        /**
         * Creates a SetAiMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof web.SetAiMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {web.SetAiMessage} SetAiMessage
         */
        SetAiMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.web.SetAiMessage)
                return object;
            let message = new $root.web.SetAiMessage();
            if (object.AiName != null)
                message.AiName = String(object.AiName);
            return message;
        };

        /**
         * Creates a plain object from a SetAiMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof web.SetAiMessage
         * @static
         * @param {web.SetAiMessage} message SetAiMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SetAiMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.AiName = "";
            if (message.AiName != null && message.hasOwnProperty("AiName"))
                object.AiName = message.AiName;
            return object;
        };

        /**
         * Converts this SetAiMessage to JSON.
         * @function toJSON
         * @memberof web.SetAiMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SetAiMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SetAiMessage;
    })();

    web.ErrorMessage = (function() {

        /**
         * Properties of an ErrorMessage.
         * @memberof web
         * @interface IErrorMessage
         * @property {string|null} [Message] ErrorMessage Message
         */

        /**
         * Constructs a new ErrorMessage.
         * @memberof web
         * @classdesc Represents an ErrorMessage.
         * @implements IErrorMessage
         * @constructor
         * @param {web.IErrorMessage=} [properties] Properties to set
         */
        function ErrorMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ErrorMessage Message.
         * @member {string} Message
         * @memberof web.ErrorMessage
         * @instance
         */
        ErrorMessage.prototype.Message = "";

        /**
         * Creates a new ErrorMessage instance using the specified properties.
         * @function create
         * @memberof web.ErrorMessage
         * @static
         * @param {web.IErrorMessage=} [properties] Properties to set
         * @returns {web.ErrorMessage} ErrorMessage instance
         */
        ErrorMessage.create = function create(properties) {
            return new ErrorMessage(properties);
        };

        /**
         * Encodes the specified ErrorMessage message. Does not implicitly {@link web.ErrorMessage.verify|verify} messages.
         * @function encode
         * @memberof web.ErrorMessage
         * @static
         * @param {web.IErrorMessage} message ErrorMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Message != null && message.hasOwnProperty("Message"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified ErrorMessage message, length delimited. Does not implicitly {@link web.ErrorMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof web.ErrorMessage
         * @static
         * @param {web.IErrorMessage} message ErrorMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ErrorMessage message from the specified reader or buffer.
         * @function decode
         * @memberof web.ErrorMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {web.ErrorMessage} ErrorMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.web.ErrorMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ErrorMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof web.ErrorMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {web.ErrorMessage} ErrorMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ErrorMessage message.
         * @function verify
         * @memberof web.ErrorMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ErrorMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            return null;
        };

        /**
         * Creates an ErrorMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof web.ErrorMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {web.ErrorMessage} ErrorMessage
         */
        ErrorMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.web.ErrorMessage)
                return object;
            let message = new $root.web.ErrorMessage();
            if (object.Message != null)
                message.Message = String(object.Message);
            return message;
        };

        /**
         * Creates a plain object from an ErrorMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof web.ErrorMessage
         * @static
         * @param {web.ErrorMessage} message ErrorMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ErrorMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.Message = "";
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this ErrorMessage to JSON.
         * @function toJSON
         * @memberof web.ErrorMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ErrorMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ErrorMessage;
    })();

    web.Wrapper = (function() {

        /**
         * Properties of a Wrapper.
         * @memberof web
         * @interface IWrapper
         * @property {google.protobuf.IAny|null} [payload] Wrapper payload
         */

        /**
         * Constructs a new Wrapper.
         * @memberof web
         * @classdesc Represents a Wrapper.
         * @implements IWrapper
         * @constructor
         * @param {web.IWrapper=} [properties] Properties to set
         */
        function Wrapper(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Wrapper payload.
         * @member {google.protobuf.IAny|null|undefined} payload
         * @memberof web.Wrapper
         * @instance
         */
        Wrapper.prototype.payload = null;

        /**
         * Creates a new Wrapper instance using the specified properties.
         * @function create
         * @memberof web.Wrapper
         * @static
         * @param {web.IWrapper=} [properties] Properties to set
         * @returns {web.Wrapper} Wrapper instance
         */
        Wrapper.create = function create(properties) {
            return new Wrapper(properties);
        };

        /**
         * Encodes the specified Wrapper message. Does not implicitly {@link web.Wrapper.verify|verify} messages.
         * @function encode
         * @memberof web.Wrapper
         * @static
         * @param {web.IWrapper} message Wrapper message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Wrapper.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.payload != null && message.hasOwnProperty("payload"))
                $root.google.protobuf.Any.encode(message.payload, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Wrapper message, length delimited. Does not implicitly {@link web.Wrapper.verify|verify} messages.
         * @function encodeDelimited
         * @memberof web.Wrapper
         * @static
         * @param {web.IWrapper} message Wrapper message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Wrapper.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Wrapper message from the specified reader or buffer.
         * @function decode
         * @memberof web.Wrapper
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {web.Wrapper} Wrapper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Wrapper.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.web.Wrapper();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 2:
                    message.payload = $root.google.protobuf.Any.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Wrapper message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof web.Wrapper
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {web.Wrapper} Wrapper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Wrapper.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Wrapper message.
         * @function verify
         * @memberof web.Wrapper
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Wrapper.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.payload != null && message.hasOwnProperty("payload")) {
                let error = $root.google.protobuf.Any.verify(message.payload);
                if (error)
                    return "payload." + error;
            }
            return null;
        };

        /**
         * Creates a Wrapper message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof web.Wrapper
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {web.Wrapper} Wrapper
         */
        Wrapper.fromObject = function fromObject(object) {
            if (object instanceof $root.web.Wrapper)
                return object;
            let message = new $root.web.Wrapper();
            if (object.payload != null) {
                if (typeof object.payload !== "object")
                    throw TypeError(".web.Wrapper.payload: object expected");
                message.payload = $root.google.protobuf.Any.fromObject(object.payload);
            }
            return message;
        };

        /**
         * Creates a plain object from a Wrapper message. Also converts values to other types if specified.
         * @function toObject
         * @memberof web.Wrapper
         * @static
         * @param {web.Wrapper} message Wrapper
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Wrapper.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.payload = null;
            if (message.payload != null && message.hasOwnProperty("payload"))
                object.payload = $root.google.protobuf.Any.toObject(message.payload, options);
            return object;
        };

        /**
         * Converts this Wrapper to JSON.
         * @function toJSON
         * @memberof web.Wrapper
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Wrapper.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Wrapper;
    })();

    return web;
})();

export const google = $root.google = (() => {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.Any = (function() {

            /**
             * Properties of an Any.
             * @memberof google.protobuf
             * @interface IAny
             * @property {string|null} [type_url] Any type_url
             * @property {Uint8Array|null} [value] Any value
             */

            /**
             * Constructs a new Any.
             * @memberof google.protobuf
             * @classdesc Represents an Any.
             * @implements IAny
             * @constructor
             * @param {google.protobuf.IAny=} [properties] Properties to set
             */
            function Any(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Any type_url.
             * @member {string} type_url
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.type_url = "";

            /**
             * Any value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.value = $util.newBuffer([]);

            /**
             * Creates a new Any instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny=} [properties] Properties to set
             * @returns {google.protobuf.Any} Any instance
             */
            Any.create = function create(properties) {
                return new Any(properties);
            };

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.type_url);
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                return writer;
            };

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Any();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.type_url = reader.string();
                        break;
                    case 2:
                        message.value = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Any message.
             * @function verify
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Any.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    if (!$util.isString(message.type_url))
                        return "type_url: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                return null;
            };

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Any} Any
             */
            Any.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Any)
                    return object;
                let message = new $root.google.protobuf.Any();
                if (object.type_url != null)
                    message.type_url = String(object.type_url);
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length)
                        message.value = object.value;
                return message;
            };

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.Any} message Any
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Any.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.type_url = "";
                    if (options.bytes === String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== Array)
                            object.value = $util.newBuffer(object.value);
                    }
                }
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    object.type_url = message.type_url;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                return object;
            };

            /**
             * Converts this Any to JSON.
             * @function toJSON
             * @memberof google.protobuf.Any
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Any.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Any;
        })();

        return protobuf;
    })();

    return google;
})();

export { $root as default };
