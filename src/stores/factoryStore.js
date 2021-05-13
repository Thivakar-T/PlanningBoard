import { observable, action, computed, makeObservable } from 'mobx'
import agent from '../agent'

export class FactoryStore {
  factories = []
  loading_factories = false

  constructor() {
    makeObservable(this, {
      factories: observable,
      loading_factories: observable,
      pullFactories: action,
    })
    this.pullFactories()
  }

  pullFactories() {
    this.loading_factories = true
    return agent.Factory.pullFactory()
      .then(
        action(({ data }) => {
          this.factories = data
        })
      )
      .finally(
        action(() => {
          this.loading_factories = false
        })
      )
  }
}

export default new FactoryStore()
