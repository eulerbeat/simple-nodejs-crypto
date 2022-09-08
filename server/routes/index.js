const express = require('express')
const router = express.Router()

const user = require('./user')
const key = require('./key')

router.use('/user', user)
router.use('/key', key)

module.exports = router;
