const user = require('./user')

beforeAll(()=> {
  user.register('test', 'testpass')
})

test('create a user', () => {
  expect(user.register('test', 'testpass')).toBe(false)
  expect(user.all().length).toBe(1)

  expect(user.register('test1', 'testpass')).toBe(true)
  expect(user.all().length).toBe(2)
})

test('authenticate a user', () => {
  const token = user.login('test', 'testpass')
  expect(token).toBeTruthy()

  expect(user.login('test', 'testpass wrong')).toBe(null)
})
