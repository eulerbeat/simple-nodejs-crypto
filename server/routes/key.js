const express = require('express')
const router = express.Router()

const {key} = require('../db')
const utils = require('../utils')

router.post('/store', utils.verifyToken, (req, res) => {
  const {public_key: publicKey} = req.body;

  const ret = key.store(req.username, publicKey)

  if (ret) return res.send('success')
  
  res.status(400).send('failure: key already exists')
})

router.post('/verify', (req, res) => {
  const {username, message, signature} = req.body;

  const ret = key.verify(username, message, signature)

  if (ret) return res.send('success')
  
  res.send('failure')
})

router.get('/all', (req, res) => {
  res.json(key.all())
})

module.exports = router;
