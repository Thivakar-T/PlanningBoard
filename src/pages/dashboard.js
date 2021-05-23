import React, { Component } from 'react'
import months from './../data/months'
import utilization from './../data/utilization'
import _ from 'lodash'
import './dashboard.css'
import { inject, observer } from 'mobx-react'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { css } from '@emotion/core'
import AllocationDetail from './components/AllocationDetail'
import OrderSelection from './components/OrderSelection'
import logo from './logo.png'

const override = css`
  display: block;
  margin: 0 auto;
  position: relative;
  top: 50%;
  left: 50%;
  z-index: 999999999999;
  overflowx: 'hidden';
`
@inject('orderStore', 'styleStore', 'factoryStore')
@observer
class dashboard extends Component {
  constructor() {
    super()
    this.state = {
      months: months,
      filter: '',
      selected_orders: [],
      selected_allocation: {},
      selected_factory_id: '',
      selected_factory_name: '',
    }
  }
  componentDidMount() {
    this.props.orderStore.pullOrders()
  }
  setFilter = (value) => {
    if (!value || !value.trim()) {
      this.setState({ filter: '' })
    } else {
      this.setState({ filter: value })
    }
  }

  get_utlization_level(allocation) {
    const allocated_sam = _.sumBy(allocation.orders, 'sam')
    if (allocated_sam === 0) {
      return 'white'
    }
    if (allocated_sam > allocation.machineMins) {
      return utilization.high.color
    } else if (allocated_sam < allocation.machineMins) {
      return utilization.low.color
    } else {
      return utilization.equal.color
    }
  }

  is_over_utilisation(index) {
    const approved_sam = this.state.selected_allocation.machineMins
    const allocated_sam = _.sumBy(
      _.slice(this.state.selected_allocation.orders, 0, index + 1),
      'sam'
    )
    return allocated_sam > approved_sam
  }

  onDragStart = (ev, orderId) => {
    ev.dataTransfer.setData('orderId', orderId)
    ev.target.style.cursor = 'grabbing'
    const image = new Image()
    image.src = 'https://i.ibb.co/7yHnKy0/Drag-Image.png'
    ev.dataTransfer.setDragImage(image, 30, 30)
  }
  onFilteredDragStart = (ev, orders) => {
    const filtered_orders = orders.filter(
      (item) =>
        item.orderNo
          .toString()
          .toUpperCase()
          .includes(this.state.filter.toUpperCase()) ||
        item.styleDescription
          .toString()
          .toUpperCase()
          .includes(this.state.filter.toUpperCase())
    )
    const orderIds = _.map(filtered_orders, 'orderId')
    if (orderIds.length === 0) {
      ev.preventDefault()
    }
    ev.dataTransfer.setData('orderId', orderIds)
    ev.target.style.cursor = 'grabbing'
  }
  onSelectedDragStart = (ev, orders) => {
    const selected_orders = _.filter(orders, { selected: true })
    const orderIds = _.map(selected_orders, 'orderId')
    if (orderIds.length === 0) {
      ev.preventDefault()
    }
    ev.dataTransfer.setData('orderId', orderIds)
    ev.target.style.cursor = 'grabbing'
  }
  onDragOver = (ev) => {
    ev.target.style.border = '2px dashed darkblue'
    ev.preventDefault()
  }
  onDragLeave = (ev) => {
    ev.target.style.border = 'none'
    ev.preventDefault()
  }
  allowDrop(ev) {
    ev.preventDefault()
  }

  onClick = (ev, factoryId, factoryName, allocation) => {
    this.setState({
      selected_factory_id: factoryId,
      selected_factory_name: factoryName,
      selected_allocation: allocation,
    })
  }
  onUnallocate = (ev, factoryId, month, orderId) => {
    const { order, selected_allocation } =
      this.props.factoryStore.unallocateOrder({ factoryId, orderId, month })
    this.props.orderStore.unallocateOrder({ factoryId, orderId, month, order })
    this.setState({
      selected_allocation,
    })
  }
  onDrop = (ev, factoryId, month) => {
    let orderIds = ev.dataTransfer.getData('orderId')
    orderIds = orderIds.split(',')
    this.props.factoryStore.allocateOrder({ factoryId, orderIds, month })
    this.props.orderStore.allocateOrder({ factoryId, orderIds, month })
    ev.target.style.border = 'none'
  }
  filter_orders = (orders) => {
    return orders.filter(
      (item) =>
        item.orderNo
          .toString()
          .toUpperCase()
          .includes(this.state.filter.toUpperCase()) ||
        item.styleDescription
          .toString()
          .toUpperCase()
          .includes(this.state.filter.toUpperCase())
    )
  }
  selectOrUnselectOrder(ev, orderId) {
    const isSelected = ev.target.checked
    this.props.orderStore.selectOrUnselectOrder({ isSelected, orderId })
    console.log({ ev, orderId })
  }
  selectOrUnselectAllOrders(ev) {
    const isSelected = ev.target.checked
    this.props.orderStore.selectOrUnselectAllOrders({ isSelected })
    console.log({ ev })
  }
  clearSelectedOrders(ev) {
    const isSelected = false
    this.props.orderStore.selectOrUnselectAllOrders({ isSelected })
    console.log({ ev })
  }
  isAllOrderSelected(orders) {
    const order_length = orders.length
    const selected_orders = _.filter(orders, { selected: true })
    if (order_length !== 0 && order_length === selected_orders.length) {
      return true
    } else {
      return false
    }
  }
  render() {
    const { orders, loading_orders } = this.props.orderStore
    const { styles, loading_styles } = this.props.styleStore
    const { factories, loading_factories } = this.props.factoryStore

    return (
      <>
        <div
          className={`${
            loading_factories || loading_orders || loading_styles
              ? 'd-block'
              : 'd-none'
          }  loading`}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'rgb(255,255,255,.7)',
            top: 0,
            left: 0,
            zIndex: 999999999998,
            overflowX: 'hidden',
          }}
        >
          <PropagateLoader
            color={'#36D7B7'}
            css={override}
            loading={loading_factories || loading_orders || loading_styles}
            size={25}
          />
        </div>
        <div className="container">
          <div className="py-3 mr-1 row">
            <div className="col-6">
              <h3>
                <img
                  alt="Smart planner"
                  style={{ width: '40px', marginRight: '10px' }}
                  src={logo}
                />
                Smart planner
              </h3>
            </div>
            <div className="col-4"></div>
            <div className="col-2" style={{ textAlign: 'right' }}>
              <span>
                <span>Welcome admin !</span>
                <img
                  _ngcontent-weu-c112=""
                  src="https://icon-library.net/images/profiles-icon/profiles-icon-0.jpg"
                  width="43%"
                  alt="Header Avatar"
                  style={{ width: '12%' }}
                  className="rounded-circle header-profile-user"
                />
              </span>
            </div>
          </div>
          <hr style={{ margin: 0 }} />
          <br />
          <div className="main">
            <div className="row">
              {/* <div className="col-3">
                <div
                  className="form-group has-search"
                  style={{ width: '95%', marginBottom: '5px' }}
                >
                  <span className="fa fa-search form-control-feedback"></span>
                  <input
                    id="filter"
                    className="form-control"
                    name="filter"
                    type="text"
                    value={this.state.filter}
                    placeholder="Search by ID or Style"
                    onChange={(event) => this.setFilter(event.target.value)}
                  />
                </div>
              </div> */}
              <div className="col-6">
                <span
                  style={{
                    cursor: 'grab',
                    width: '90%',
                  }}
                  className={``}
                >
                  {!this.state.filter && (
                    <div
                      draggable="true"
                      data-toggle="modal"
                      data-target="#orderSelection"
                      className="card py-2 mr-3 text-black my-col"
                      onDragStart={(e) => this.onSelectedDragStart(e, orders)}
                      onDragEnd={(e) => (e.target.style.cursor = 'grab')}
                      style={{
                        width: '40%',
                        float: 'left',
                        backgroundColor: 'darkblue',
                        color: '#ffffff',
                        textAlign: 'center',
                        marginRight: '0.5rem',
                        borderRadius: '5px',
                        border: '1px solid #4e3e3e',
                        borderStyle: 'dashed',
                      }}
                    >
                      {' '}
                      {_.filter(orders, { selected: true }).length > 0
                        ? `Drag the selected ${
                            _.filter(orders, { selected: true }).length
                          } orders`
                        : 'Select multiple orders'}
                    </div>
                  )}
                  {_.filter(orders, { selected: true }).length > 0 &&
                    !this.state.filter && (
                      <div
                        className="card py-2 text-black my-col"
                        onClick={(e) => this.clearSelectedOrders(e)}
                        style={{
                          width: '30%',
                          backgroundColor: 'darkgrey',
                          color: '#ffffff',
                          textAlign: 'center',
                          borderRadius: '5px',
                          border: '1px solid #4e3e3e',
                          borderStyle: 'dashed',
                        }}
                      >
                        {' '}
                        Clear
                      </div>
                    )}
                </span>
                {/* <span
                  style={{
                    cursor: 'grab',
                  }}
                  className={`${
                    this.state.filter && this.filter_orders(orders).length > 0
                      ? 'd-visible'
                      : 'd-none'
                  }`}
                >
                  <div
                    draggable="true"
                    className="card py-2 text-black my-col"
                    onDragStart={(e) => this.onFilteredDragStart(e, orders)}
                    onDragEnd={(e) => (e.target.style.cursor = 'grab')}
                    style={{
                      width: '40%',
                      backgroundColor: '#05e67e',
                      textAlign: 'center',
                      borderRadius: '5px',
                      border: '1px solid #4e3e3e',
                      borderStyle: 'dashed',
                    }}
                  >
                    {' '}
                    Drag all {this.filter_orders(orders).length} filtered orders
                  </div>
                </span> */}
              </div>
              <div className="col-6">
                <div className="align-right">
                  <div>
                    Orders pending allocation : <b>{orders.length}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          {/* <div className="row" style={{ overflow: 'scroll' }}>
            <div className="row flex-row flex-nowrap">
              {!loading_styles &&
                orders.length > 0 &&
                orders
                  .filter(
                    (item) =>
                      item.orderNo
                        .toString()
                        .toUpperCase()
                        .includes(this.state.filter.toUpperCase()) ||
                      item.styleDescription
                        .toString()
                        .toUpperCase()
                        .includes(this.state.filter.toUpperCase()) ||
                      !this.state.filter
                  )
                  .map((order, index) => {
                    return (
                      <div
                        draggable="true"
                        style={{ cursor: 'grab' }}
                        onDragStart={(e) => this.onDragStart(e, order.orderId)}
                        onDragEnd={(e) => (e.target.style.cursor = 'grab')}
                        className="col-xs-3 col-sm-3 col-md-3 "
                        key={order.orderId + '' + index}
                      >
                        <div
                          className={`card card-block text-white border py-3 px-5 my-col`}
                          style={{
                            backgroundColor: `${order.styleColour}`,
                          }}
                        >
                          <h6 className="font-weight-400">
                            {' '}
                            <span className="order_label">ID</span> :{' '}
                            <span className="order_label">{order.orderNo}</span>
                          </h6>
                          <h6 className="font-weight-400">
                            <span className="order_label">Style</span> :{' '}
                            <span className="order_label style_des">
                              {order.styleDescription}
                            </span>
                          </h6>
                          <h6 className="font-weight-400">
                            <span className="order_label">Quantity</span> :{' '}
                            <span className="order_label">
                              {order.orderedQty}
                            </span>
                          </h6>
                          <h6 className="font-weight-400">
                            <span className="order_label">SAM</span> :{' '}
                            <span className="order_label">{order.sam}</span>
                          </h6>
                        </div>
                      </div>
                    )
                  })}
            </div>
          </div> */}
          {/* py-2 */}
          <div className="factory_container">
            <div className="row mx-2 text-center">
              <div className="col-2 pt-1 pb-1 border">Factory</div>
              <div className="col-10">
                <div className="row ">
                  {this.state.months.map((item) => {
                    return (
                      <div key={item.month} className="col-1 pt-2 pb-2 border">
                        {item.month}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            {factories.map((factory) => {
              return (
                // py-2
                <div className="row mx-2 text-center" key={`${factory.id}`}>
                  <div
                    className="col-2 border pt-1 pb-1 "
                    title={factory.shortName}
                  >
                    <span
                      style={{ fontSize: '12px', cursor: 'pointer' }}
                      className="style_des"
                    >
                      {factory.shortName}
                    </span>
                  </div>
                  <div className="col-10 ">
                    <div className="row ">
                      {_.take(factory.allocations, 12).map((allocation) => {
                        return (
                          <div
                            style={{ padding: 0, cursor: 'pointer' }}
                            key={`${factory.id}-${allocation.month}`}
                            id={`${factory.id}-${allocation.month}`}
                            className="col-1 border height text-white"
                            data-toggle="modal"
                            data-target="#selectedMonth"
                            onDragOver={(e) => this.onDragOver(e)}
                            onDragLeave={(e) => this.onDragLeave(e)}
                            onDrop={(e) => {
                              this.onDrop(e, factory.id, allocation.month)
                            }}
                          >
                            <div
                              style={{
                                height: '100%',
                                backgroundColor: `${this.get_utlization_level(
                                  allocation
                                )}`,
                              }}
                              onClick={(e) => {
                                this.onClick(
                                  e,
                                  factory.id,
                                  factory.shortName,
                                  allocation
                                )
                              }}
                            ></div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <br />
          <footer className="footer " style={{ position: 'relative' }}>
            <div className="text-center hrfooter">
              <hr className="mx-5 " />
            </div>
            <div>
              <span>Copyright </span>
              <span>@ 2021 Smart Planner</span>
            </div>
          </footer>
          <AllocationDetail
            selected_allocation={this.state.selected_allocation}
            selected_factory_id={this.state.selected_factory_id}
            selected_factory_name={this.state.selected_factory_name}
            is_over_utilisation={this.is_over_utilisation.bind(this)}
            onUnallocate={this.onUnallocate}
          />
          <OrderSelection
            orders={orders}
            filter={this.state.filter}
            setFilter={this.setFilter}
            selectOrUnselectOrder={this.selectOrUnselectOrder.bind(this)}
            selectOrUnselectAllOrders={this.selectOrUnselectAllOrders.bind(
              this
            )}
            isAllOrderSelected={this.isAllOrderSelected}
          >
            {this.props.children}
          </OrderSelection>
        </div>
      </>
    )
  }
}

export default dashboard
