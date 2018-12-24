/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.web.TrickCompleted');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.web.Move');


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
proto.web.TrickCompleted = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.web.TrickCompleted, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.web.TrickCompleted.displayName = 'proto.web.TrickCompleted';
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
proto.web.TrickCompleted.prototype.toObject = function(opt_includeInstance) {
  return proto.web.TrickCompleted.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.web.TrickCompleted} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.web.TrickCompleted.toObject = function(includeInstance, msg) {
  var f, obj = {
    move: (f = msg.getMove()) && proto.web.Move.toObject(includeInstance, f),
    tricksremaining: jspb.Message.getFieldWithDefault(msg, 2, 0)
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
 * @return {!proto.web.TrickCompleted}
 */
proto.web.TrickCompleted.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.web.TrickCompleted;
  return proto.web.TrickCompleted.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.web.TrickCompleted} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.web.TrickCompleted}
 */
proto.web.TrickCompleted.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.web.Move;
      reader.readMessage(value,proto.web.Move.deserializeBinaryFromReader);
      msg.setMove(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTricksremaining(value);
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
proto.web.TrickCompleted.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.web.TrickCompleted.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.web.TrickCompleted} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.web.TrickCompleted.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMove();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.web.Move.serializeBinaryToWriter
    );
  }
  f = message.getTricksremaining();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional Move Move = 1;
 * @return {?proto.web.Move}
 */
proto.web.TrickCompleted.prototype.getMove = function() {
  return /** @type{?proto.web.Move} */ (
    jspb.Message.getWrapperField(this, proto.web.Move, 1));
};


/** @param {?proto.web.Move|undefined} value */
proto.web.TrickCompleted.prototype.setMove = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.web.TrickCompleted.prototype.clearMove = function() {
  this.setMove(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.web.TrickCompleted.prototype.hasMove = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int32 TricksRemaining = 2;
 * @return {number}
 */
proto.web.TrickCompleted.prototype.getTricksremaining = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.web.TrickCompleted.prototype.setTricksremaining = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};

