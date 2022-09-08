const jwt = require('jsonwebtoken');
const {createVerify} = require('node:crypto')

const config = require('./config')

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    let decoded;

    try {
      decoded = jwt.verify(bearerToken, config.SECRET);
    } catch(err) {
      return res.sendStatus(403);
    }

    req.username = decoded.username;
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

function generateToken(username) {
  const token = jwt.sign({username}, config.SECRET, {expiresIn: '8h'})
  return token;
}

function verifySignature(publicKey, message, signature) {
  const verify = createVerify('SHA256')
  verify.write(message);
  verify.end();
  return verify.verify(publicKey, signature, 'hex')
}


// for test

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

module.exports = {
  verifyToken,
  generateToken,
  verifySignature,
  createSignature,
  publicKey
}
