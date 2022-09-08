const {createHash} = require('node:crypto')

const utils = require('../utils')

const users = [];

function register(username, password) {
  if (users.find((user) => user.username == username)) return false;

  const createdAt = Date.now();

  const hash = createHash('sha256');
  hash.update(`${password}${createdAt}`)

  users.push({
    username,
    password: hash.digest('hex'),
    createdAt
  })

  return true;
}

function login(username, password) {
  const found = users.find((user) => {
    if (user.username != username) return false;

    const {password: hashed, createdAt} = user;
    
    const hash = createHash('sha256');
    hash.update(`${password}${createdAt}`)

    if (hashed == hash.digest('hex')) return true;
    
    return false;
  });
  
  if (found) return utils.generateToken(username);

  return null;
}

function all() {
  return users;
}

module.exports = {
  register,
  login,
  all
}
