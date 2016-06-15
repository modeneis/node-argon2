const t = require('tap')
const argon2 = require('../index')

const password = 'password'

t.test('verify correct password', t => {
  'use strict'

  t.plan(1)

  return argon2.generateSalt().then(salt => {
    return argon2.hash(password, salt).then(hash => {
      return argon2.verify(hash, password).then(result => {
        t.true(result)
      })
    })
  })
}).catch(t.threw)

t.test('verify wrong password', t => {
  'use strict'

  t.plan(1)

  return argon2.generateSalt().then(salt => {
    return argon2.hash(password, salt).then(hash => {
      return argon2.verify(hash, 'passworld').then(result => {
        t.false(result)
      })
    })
  })
}).catch(t.threw)

t.test('verify invalid hash', t => {
  'use strict'

  t.plan(1)

  return argon2.generateSalt().then(salt => {
    return argon2.hash(password, salt).then(hash => {
      /* cut just a piece of the hash making it invalid */
      return argon2.verify(hash.slice(8), password).catch(err => {
        t.match(err.message, /invalid hash.+generated by argon2/i)
      })
    })
  })
}).catch(t.threw)

t.test('verify with null in password', t => {
  'use strict'

  t.plan(1)

  return argon2.generateSalt().then(salt => {
    return argon2.hash('pass\0word', salt).then(hash => {
      return argon2.verify(hash, 'pass\0word').then(result => {
        t.true(result)
      })
    })
  })
}).catch(t.threw)

t.test('verify argon2d correct password', t => {
  'use strict'

  t.plan(1)

  return argon2.generateSalt().then(salt => {
    return argon2.hash(password, salt, {
      argon2d: true
    }).then(hash => {
      return argon2.verify(hash, password).then(result => {
        t.true(result)
      })
    })
  })
}).catch(t.threw)

t.test('verify argon2d wrong password', t => {
  'use strict'

  t.plan(1)

  return argon2.generateSalt().then(salt => {
    return argon2.hash(password, salt, {
      argon2d: true
    }).then(hash => {
      return argon2.verify(hash, 'passwolrd').then(result => {
        t.false(result)
      })
    })
  })
}).catch(t.threw)