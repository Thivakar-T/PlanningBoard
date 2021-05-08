import { observable, action, reaction, decorate, makeObservable } from 'mobx'
// import agent from "../agent";

class CommonStore {
  appName = 'PlanningBoard'
  appLoaded = false
  token = window.localStorage.getItem('jwt')

  constructor() {
    makeObservable(this, {
      appName: observable,
      appLoaded: observable,
      token: observable,
      setAppLoaded: action,
      setToken: action,
    })
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem('jwt', token)
        } else {
          window.localStorage.removeItem('jwt')
        }
      }
    )
  }

  setAppLoaded() {
    this.appLoaded = true
  }

  setToken(token) {
    this.token = token
  }
}

export default new CommonStore()
