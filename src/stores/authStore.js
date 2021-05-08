import { observable, action, makeObservable } from 'mobx'
import agent from '../agent'
import userStore from './userStore'
import commonStore from './commonStore'

class AuthStore {
  inprogress = false
  errors = undefined

  values = {
    username: '',
    email: '',
    password: '',
  }

  constructor() {
    makeObservable(this, {
      inprogress: observable,
      errors: observable,
      values: observable,
      setUsername: action,
      setEmail: action,
      setPassword: action,
      reset: action,
      login: action,
      register: action,
      logout: action,
    })
  }

  setUsername(username) {
    this.values.username = username
  }

  setEmail(email) {
    this.values.email = email
  }

  setPassword(password) {
    this.values.password = password
  }

  reset() {
    this.values.username = ''
    this.values.email = ''
    this.values.password = ''
  }

  login() {
    this.inProgress = true
    this.errors = undefined
    return agent.Auth.login(this.values.email, this.values.password)
      .then(({ user }) => commonStore.setToken(user.token))
      .then(() => userStore.pullUser())
      .catch(
        action((err) => {
          this.errors =
            err.response && err.response.body && err.response.body.errors
          throw err
        })
      )
      .finally(
        action(() => {
          this.inProgress = false
        })
      )
  }

  register() {
    this.inProgress = true
    this.errors = undefined
    return agent.Auth.register(
      this.values.username,
      this.values.email,
      this.values.password
    )
      .then(({ user }) => commonStore.setToken(user.token))
      .then(() => userStore.pullUser())
      .catch(
        action((err) => {
          this.errors =
            err.response && err.response.body && err.response.body.errors
          throw err
        })
      )
      .finally(
        action(() => {
          this.inProgress = false
        })
      )
  }

  logout() {
    commonStore.setToken(undefined)
    userStore.forgetUser()
    return Promise.resolve()
  }
}

export default new AuthStore()
