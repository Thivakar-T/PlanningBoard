import { observable, action, computed, makeObservable } from 'mobx'
import agent from '../agent'

export class OrderStore {
  orders = []
  loading_orders = false

  constructor() {
    makeObservable(this, {
      orders: observable,
      loading_orders: observable,
    })
  }

  pullOrders() {
    this.loading_orders = true
    return agent.Order.pullOrder()
      .then(
        action(({ orders }) => {
          this.orders = orders
        })
      )
      .finally(
        action(() => {
          this.loading_orders = false
        })
      )
  }
}

export default new OrderStore()
