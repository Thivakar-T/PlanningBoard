import { observable, action, computed, makeObservable } from 'mobx'
import agent from '../agent'

export class OrderStore {
  orders = []
  loading_orders = false

  constructor() {
    makeObservable(this, {
      orders: observable,
      loading_orders: observable,
      pullOrders: action,
    })
  }

  orderSAM(orders: []) {
    orders.map((order: any) => {
      order.color = this.orderColor()
      order.sam = order.orderedQty * order.styleSam
      return order
    })
    return orders
  }

  orderColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  pullOrders() {
    this.loading_orders = true
    return agent.Order.pullOrder()
      .then(
        action(({ data }) => {
          this.orders = this.orderSAM(data)
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
