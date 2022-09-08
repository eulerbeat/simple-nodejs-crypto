const utils = require('../utils')

const keys = [];

function store(username, publicKey) {
  if (keys.find((key) => key.username == username)) return false;

  keys.push({
    username,
    publicKey
  })

  return true;
}

function verify(username, message, signature) {
  if (keys.find((key) => {
    if (key.username != username) return false;

    return utils.verifySignature(key.publicKey, message, signature)
  })) return true;

  return false;
}

function all() {
  return keys;
}

module.exports = {
  store,
  verify,
  all
}
