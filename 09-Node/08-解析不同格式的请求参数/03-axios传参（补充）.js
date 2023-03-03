/**
 * 1. 拼接在 url 后的参数
 */
axios.get('/user?id=123&name=user')

/**
 * 2. form-data 格式
 */
const formData = new FormData()
formData.append('username', 'john')
formData.append('password', 'doe')
axios.post('/api/login', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

/**
 * 3. x-www-form-urlencoded 格式
 */
const urlEncodedData = new URLSearchParams()
urlEncodedData.append('username', 'john')
urlEncodedData.append('password', 'doe')
axios.post('/api/login', urlEncodedData.toString(), {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

/**
 * 4. raw 格式
 */
const jsonData = {
  username: 'john',
  password: 'doe'
}
axios.post('/api/login', jsonData, {
  headers: {
    'Content-Type': 'application/json'
  }
})