import { observable, action, computed, makeObservable, toJS } from 'mobx'
import agent from '../agent'
import factories from './../data/factories'
import orderStore from './orderStore'

export class FactoryStore {
  factories = factories
  loading_factories = false

  constructor() {
    makeObservable(this, {
      factories: observable,
      loading_factories: observable,
      pullFactories: action,
    })
    // this.pullFactories()
  }

  allocateOrder({ factoryId, orderId, month }) {
    const selected_order = orderStore.orders.filter((order) => {
      return order.orderId.toString() === orderId.toString()
    })
    let selected_factory = this.factories.filter(
      (factory) => factory.factoryId === factoryId
    )
    let selected_allocation = selected_factory[0].allocations.filter(
      (allocation) => allocation.month === month
    )
    selected_allocation[0].orders.push(selected_order[0])
  }

  unallocateOrder({ factoryId, orderId, month }) {
    let selected_factory = this.factories.filter(
      (factory) => factory.factoryId === factoryId
    )
    let selected_allocation = selected_factory[0].allocations.filter(
      (allocation) => allocation.month === month
    )
    let order = selected_allocation[0].orders.filter(
      (order) => order.orderId.toString() === orderId.toString()
    )
    selected_allocation[0].orders = selected_allocation[0].orders.filter(
      (order) => order.orderId.toString() !== orderId.toString()
    )
    return { order, selected_allocation: selected_allocation[0] }
  }

  pullFactories() {
    this.loading_factories = true
    // return agent.Factory.pullFactory()
    //   .then(
    //     action(({ data }) => {
    //       this.factories = data
    //     })
    //   )
    //   .finally(
    //     action(() => {
    //       this.loading_factories = false
    //     })
    //   )
  }
}

export default new FactoryStore()
