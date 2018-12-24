/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.web.Move');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.web.Move = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.web.Move, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.web.Move.displayName = 'proto.web.Move';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.web.Move.prototype.toObject = function(opt_includeInstance) {
  return proto.web.Move.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.web.Move} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.web.Move.toObject = function(includeInstance, msg) {
  var f, obj = {
    aiscore: +jspb.Message.getFieldWithDefault(msg, 1, 0.0),
    aibid: jspb.Message.getFieldWithDefault(msg, 2, 0),
    playerscore: +jspb.Message.getFieldWithDefault(msg, 3, 0.0),
    playerbid: jspb.Message.getFieldWithDefault(msg, 4, 0),
    handvalue: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.web.Move}
 */
proto.web.Move.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.web.Move;
  return proto.web.Move.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.web.Move} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.web.Move}
 */
proto.web.Move.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setAiscore(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setAibid(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setPlayerscore(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPlayerbid(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setHandvalue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.web.Move.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.web.Move.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.web.Move} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.web.Move.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAiscore();
  if (f !== 0.0) {
    writer.writeFloat(
      1,
      f
    );
  }
  f = message.getAibid();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getPlayerscore();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = message.getPlayerbid();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getHandvalue();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
};


/**
 * optional float AiScore = 1;
 * @return {number}
 */
proto.web.Move.prototype.getAiscore = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 1, 0.0));
};


/** @param {number} value */
proto.web.Move.prototype.setAiscore = function(value) {
  jspb.Message.setProto3FloatField(this, 1, value);
};


/**
 * optional int32 AiBid = 2;
 * @return {number}
 */
proto.web.Move.prototype.getAibid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.web.Move.prototype.setAibid = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional float PlayerScore = 3;
 * @return {number}
 */
proto.web.Move.prototype.getPlayerscore = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 3, 0.0));
};


/** @param {number} value */
proto.web.Move.prototype.setPlayerscore = function(value) {
  jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional int32 PlayerBid = 4;
 * @return {number}
 */
proto.web.Move.prototype.getPlayerbid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/** @param {number} value */
proto.web.Move.prototype.setPlayerbid = function(value) {
  jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int32 HandValue = 5;
 * @return {number}
 */
proto.web.Move.prototype.getHandvalue = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/** @param {number} value */
proto.web.Move.prototype.setHandvalue = function(value) {
  jspb.Message.setProto3IntField(this, 5, value);
};

