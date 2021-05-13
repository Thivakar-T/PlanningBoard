import { observable, action, computed, makeObservable, toJS } from 'mobx'
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
      order.sam = order.orderedQty * order.styleSam
      return order
    })
    return orders
  }

  allocateOrder({ factoryId, orderId, month }) {
    this.loading_orders = true
    this.orders = this.orders.filter((order) => {
      return order.orderId.toString() !== orderId.toString()
    })
    return agent.Order.allocateOrder({ factoryId, orderId, month })
      .then(
        action(({ data }) => {
          console.log(data)
        })
      )
      .catch(
        action((err) => {
          console.log({ err })
        })
      )
      .finally(
        action(() => {
          this.loading_orders = false
        })
      )
  }

  unallocateOrder({ factoryId, orderId, month, order }) {
    this.loading_orders = true
    this.orders = this.orders.concat(order)
    return agent.Order.unallocateOrder({ factoryId, orderId, month })
      .then(
        action(({ data }) => {
          console.log(data)
        })
      )
      .catch(
        action((err) => {
          console.log({ err })
        })
      )
      .finally(
        action(() => {
          this.loading_orders = false
        })
      )
  }

  pullOrders() {
    this.loading_orders = true
    return agent.Order.pullOrder()
      .then(
        action(({ data }) => {
          this.orders = this.orderSAM(data)
        })
      )
      .catch(
        action((err) => {
          console.log({ err })
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
