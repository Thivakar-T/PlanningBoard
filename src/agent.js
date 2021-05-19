import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'
import commonStore from './stores/commonStore'
import authStore from './stores/authStore'

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT =
  'http://ec2-54-179-189-29.ap-southeast-1.compute.amazonaws.com:8080/api' //'http://f11835afe964.ngrok.io/api' //'http://ec2-54-179-189-29.ap-southeast-1.compute.amazonaws.com:8080/api'

const encode = encodeURIComponent

const handleErrors = (err) => {
  if (err && err.response && err.response.status === 401) {
    authStore.logout()
  }
  return err
}

const responseBody = (res) => res.body

const tokenPlugin = (req) => {
  if (commonStore.token) {
    req.set('authorization', `Token ${commonStore.token}`)
  }
}

const requests = {
  del: (url) =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  get: (url) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
}

const Auth = {
  current: () => requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: (user) => requests.put('/user', { user }),
}

const Order = {
  pullOrder: () => requests.get('/order/get'),
  allocateOrder: (order) => requests.post('/order/production/allocates', order),
  unallocateOrder: (order) =>
    requests.post('/order/production/deallocate', { ...order }),
}

const Style = {
  pullStyle: () => requests.get('/style/get'),
}

const Factory = {
  pullFactory: () => requests.get('/factory/get'),
}

export default {
  Auth,
  Order,
  Style,
  Factory,
}
