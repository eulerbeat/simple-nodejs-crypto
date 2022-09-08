const axios = require('axios')

const prompt = require('prompt-sync')({sigint: true});

const config = require('./config')

const {username, password, server, publicKey, createSignature} = config;

let authToken;

async function createUser() {
  console.log('==========')
  console.log('creating a user, username:', username, 'password:', password)

  try{
    await axios.post(`${server}/user/register`, {
      username, password
    })

    console.log('successfully created a user')
  } catch(err) {
    console.log('user creation failed')
  }
}

async function authenticate() {
  console.log('==========')
  console.log('authenticating user:', username)

  try{
    const resp = await axios.post(`${server}/user/login`, {
      username, password
    })

    const token = resp.data;
    authToken = token;
    console.log('successfully authenticated, token:', token)
  } catch(err) {
    console.log('authentication failed')
    console.log(err.response.data);
  }
}

async function savePublicKey() {
  console.log('==========')
  console.log('saving public key for the authenticated user')
  console.log(publicKey)

  try{
    const resp = await axios.post(`${server}/key/store`, {
      public_key: publicKey
    }, {
      headers: {
        authorization: `Bearer ${authToken}`
      }
    })

    console.log('successfully stored public key')
  } catch(err) {
    console.log('public key save failed')
    console.log(err.response.data);
  }
}

async function verifySignature() {
  console.log('==========')
  console.log('verifying signature')

  const message = 'some message' + Date.now();
  const signature = createSignature(message);

  console.log('message: ', message)
  console.log('signature: ', signature)

  try{
    const resp = await axios.post(`${server}/key/verify`, {
      username, message, signature
    })

    if (resp.data == "success")
      console.log('verification success')
    else
      console.log('verification failure')
  } catch(err) {
    console.error('verification error')
    console.log(err.response.data);
  }
}

var readlineSync = require('readline-sync');

async function run() {
  let shouldContinue = true;

  while(shouldContinue) {
    let choice = readlineSync.keyInSelect([
      'create a user', 'authenticate', 'save public key', 'verify signature'
    ], 'which one?') + 1

    switch(choice) {
      case 1:
        await createUser();
        break;
      case 2:
        await authenticate();
        break;
      case 3:
        await savePublicKey();
        break;
      case 4:
        await verifySignature();
        break;
      default:
        shouldContinue = false;
        break;
    }
  }
}

async function app() {
  await createUser();
  await authenticate();
  await savePublicKey();
  await verifySignature();
}

run();
