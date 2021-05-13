import { observable, action, computed, makeObservable } from 'mobx'
import agent from '../agent'
import _ from 'lodash'

export class OrderStore {
  orders = []
  loading_orders = false

  constructor() {
    makeObservable(this, {
      orders: observable,
      loading_orders: observable,
      pullOrders: action,
      allocateOrder: action,
      unallocateOrder: action,
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

  allocateOrder({ orderId }) {
    console.log({ orderId })
    this.orders = this.orders.filter((order) => {
      return order.orderId.toString() !== orderId.toString()
    })

    // console.log({ factories: new_factories })
    // this.setState({
    //   factories: new_factories,
    // })
  }

  unallocateOrder({ order }) {
    console.log({ order })
    this.orders = this.orders.concat(order)
  }

  pullOrders() {
    this.loading_orders = true
    return agent.Order.pullOrder()
      .then(
        action(({ data }) => {
          let items: any = _.take(data, 4)
          this.orders = this.orderSAM(items)
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
