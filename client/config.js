const {generateKeyPairSync, createSign} = require('node:crypto')

const { privateKey, publicKey: keyObj } = generateKeyPairSync('ec', {
  namedCurve: 'secp256k1'
});

const publicKey = keyObj.export({type: 'spki', format: 'pem'})

function createSignature(message) {
  const sign = createSign('SHA256');
  sign.write(message);
  sign.end();
  const signature = sign.sign(privateKey, 'hex');

  return signature;
}

const username = 'anon'
const password = 'anonpass'

const server = 'http://localhost:3000';

module.exports = {
  publicKey,
  createSignature,
  username,
  password,
  server,
}
