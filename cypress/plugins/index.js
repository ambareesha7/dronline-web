// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const $root = require('../../static/proto-bundle');
const { StringDecoder } = require('string_decoder');

module.exports = on => {
  on('task', {
    protobufEncode: ({ data, encoderName }) => {
      const builder = $root.lookupType(encoderName);
      const decoder = new StringDecoder('utf8');
      const bufferValue = builder.encode(data).finish();
      return decoder.end(Buffer.from(bufferValue));
    }
  });
};
