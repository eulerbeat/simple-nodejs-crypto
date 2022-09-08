const user = require('./user')
const key = require('./key')
const utils = require('../utils')

beforeAll(()=> {
  key.store('test', utils.publicKey)
})

test('save public key', () => {
  expect(key.store('test', 'public key')).toBe(false)
  expect(key.all().length).toBe(1)

  expect(key.store('test1', 'public key')).toBe(true)
  expect(key.all().length).toBe(2)

  expect(key.store('test1', 'public key')).toBe(false)
  expect(key.all().length).toBe(2)
})

test('verify signature', () => {
  expect(key.verify('test', 'some message', utils.createSignature('some message'))).toBe(true)
  expect(key.verify('test', 'some message', utils.createSignature('some message wrong'))).toBe(false)
  expect(key.verify('test', 'some message', 'random wrong')).toBe(false)
})
