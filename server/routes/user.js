const express = require('express')
const router = express.Router()

const {user} = require('../db')

router.post('/register', (req, res) => {
  const {username, password} = req.body;

  const ret = user.register(username, password)

  if (ret) return res.send('success')
  
  res.status(400).send('failure: user already exists')
})

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  const ret = user.login(username, password)

  if (ret) return res.send(ret)
  
  res.status(401).send('failure')
})

router.get('/all', (req, res) => {
  res.json(user.all())
})

module.exports = router;
