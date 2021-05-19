import { observable, action, computed, makeObservable } from 'mobx'
import agent from '../agent'

export class StyleStore {
  styles = []
  loading_styles = false

  constructor() {
    makeObservable(this, {
      styles: observable,
      loading_styles: observable,
      pullStyles: action,
    })
    //this.pullStyles()
  }

  pullStyles() {
    this.loading_styles = true
    return agent.Style.pullStyle()
      .then(
        action(({ data }) => {
          this.styles = data
        })
      )
      .finally(
        action(() => {
          this.loading_styles = false
        })
      )
  }
}

export default new StyleStore()
