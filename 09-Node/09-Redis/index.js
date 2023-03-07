const Redis = require('ioredis')

const redis = new Redis()

redis.set('myKey', 'value')

redis.keys('*').then(res => {
  console.log('res', res)
})

redis.get('myKey', (err, result) => {
  if (err) {
    console.error('err', err)
  } else {
    console.log('result', result)
  }
})