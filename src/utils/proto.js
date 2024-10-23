import blobToBuffer from 'blob-to-buffer';
import $root from '../../static/proto-bundle';

const textEncoder = new TextEncoder();

export const decode = (message, payload) => {
  const container = $root.lookup(message);
  const data = typeof payload === 'string' ? textEncoder.encode(payload) : new Uint8Array(payload);
  return container.decode(data);
};

export const encode = (message, data) => {
  const builder = $root.lookupType(message);
  const payload = builder.create(data);
  return new Uint8Array(builder.encode(payload).finish());
};

const adjustToPhoenixProtocol = message => {
  if (message.event === 'phx_reply' && message.replyStatus) {
    if (!message.payload) {
      message.payload = {};
    }
    message.payload.status = message.replyStatus;
  }
  if (message.event === 'phx_close') {
    message.payload = {
      status: 'ok'
    };
  }
  if (message.event === 'phx_error') {
    if (!message.payload) {
      message.payload = {
        status: 'error'
      };
    }
  }
  return message;
};

export const decodePhoenix = (payload, callback) => {
  blobToBuffer(payload, (err, buffer) => {
    const container = $root.lookup('SocketMessage');
    const message = container.decode(new Uint8Array(buffer));
    const normalizedJSON = adjustToPhoenixProtocol(message);
    callback(normalizedJSON);
  });
};

export const encodePhoenix = (payload, callback) => {
  const builder = $root.lookup('SocketMessage');
  const message = builder.create(payload);
  const buffer = builder.encode(message).finish();
  callback(buffer);
};
