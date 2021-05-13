import React, { Component } from 'react'
import orders from './../data/order'
import factories from './../data/factories'
import months from './../data/months'
import utilization from './../data/utilization'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './dashboard.css'
import { inject, observer } from 'mobx-react'

@inject('orderStore', 'styleStore', 'factoryStore')
@observer
class dashboard extends Component {
  constructor() {
    super()
    this.state = {
      months: months,
      filter: '',
      selected_allocation: {},
      selected_factory: '',
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
    console.log({ allocated_sam, allocation_sam: allocation.sam })
    if (allocated_sam > allocation.sam) {
      return utilization.high.color
    } else if (allocated_sam < allocation.sam) {
      return utilization.low.color
    } else {
      return utilization.equal.color
    }
  }

  onDragStart = (ev, orderId) => {
    console.log('dragstart:', orderId)
    ev.dataTransfer.setData('orderId', orderId)
  }
  onDragOver = (ev) => {
    ev.preventDefault()
  }
  allowDrop(ev) {
    ev.preventDefault()
  }

  onClick = (ev, factoryId, allocation) => {
    this.setState({
      selected_factory: factoryId,
      selected_allocation: allocation,
    })
  }
  onUnallocate = (ev, factoryId, month, orderId) => {
    console.log(factoryId)
    console.log(month)
    const {
      order,
      selected_allocation,
    } = this.props.factoryStore.unallocateOrder({ factoryId, orderId, month })
    this.props.orderStore.unallocateOrder({ order })
    this.setState({
      selected_allocation,
    })
  }
  onDrop = (ev, factoryId, month) => {
    let orderId = ev.dataTransfer.getData('orderId')
    this.props.factoryStore.allocateOrder({ factoryId, orderId, month })
    this.props.orderStore.allocateOrder({ orderId })
  }
  render() {
    const { orders, loading_orders } = this.props.orderStore
    const { styles, loading_styles } = this.props.styleStore
    const { factories } = this.props.factoryStore
    console.log({ orders, styles, loading_orders, loading_styles })
    return (
      <div className="container">
        <div className="py-3 mr-1 row">
          <div className="col-6">
            <h3>Planning Board</h3>
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
        <hr />
        <div className="main">
          <div className="form-group has-search" style={{ width: '50%' }}>
            <span className="fa fa-search form-control-feedback"></span>
            <input
              id="filter"
              className="form-control"
              name="filter"
              type="text"
              value={this.state.filter}
              placeholder="Type here to filter your orders"
              onChange={(event) => this.setFilter(event.target.value)}
            />
          </div>
          <div className="align-right">
            <div>
              Orders pending allocation : <b>{orders.length}</b>
            </div>
          </div>
        </div>

        <div className="row">
          <div id="demo" className="carousel slide" data-ride="carousel">
            <div className="container carousel-inner no-padding order_container">
              <div className="carousel-item active">
                {!loading_styles &&
                  orders.length > 0 &&
                  _.take(orders, 4)
                    .filter(
                      (item) =>
                        item.orderId.toString().includes(this.state.filter) ||
                        !this.state.filter
                    )
                    .map((order) => {
                      return (
                        <div
                          draggable="true"
                          onDragStart={(e) =>
                            this.onDragStart(e, order.orderId)
                          }
                          className="col-xs-3 col-sm-3 col-md-3"
                          key={order.orderId}
                        >
                          <div
                            className={`card text-white border py-3 px-5 my-col`}
                            style={{ backgroundColor: `${order.color}` }}
                          >
                            <h6 className="font-weight-400">
                              {' '}
                              <span className="">ID</span> :{' '}
                              <span className="order_label">
                                {order.orderId}
                              </span>
                            </h6>
                            <h6 className="font-weight-400">
                              <span className="">Style</span> :{' '}
                              <span className="order_label">
                                {order.styleDescription}
                              </span>
                            </h6>
                            <h6 className="font-weight-400">
                              <span className="">Quantity</span> :{' '}
                              <span className="order_label">
                                {order.orderedQty}
                              </span>
                            </h6>
                            <h6 className="font-weight-400">
                              <span className="">SAM</span> :{' '}
                              <span className="order_label">{order.sam}</span>
                            </h6>
                          </div>
                        </div>
                      )
                    })}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <h5>
            <u className="text-muted"></u>
          </h5>
        </div>
        <div className="row py-2 mx-2 text-center">
          <div className="col-2 pt-1 border">Factory</div>
          <div className="col-10">
            <div className="row ">
              {this.state.months.map((item) => {
                return (
                  <div key={item.month} className="col-1 pt-1 border">
                    {item.month}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {factories.map((factory) => {
          return (
            <div
              className="row py-2 mx-2 text-center"
              key={`${factory.factoryId}`}
            >
              <div className="col-2 border height pt-1">
                {factory.factoryName}
              </div>
              <div className="col-10">
                <div className="row ">
                  {factory.allocations.map((allocation) => {
                    return (
                      <div
                        style={{ padding: 0, cursor: 'pointer' }}
                        key={`${factory.factoryId}-${allocation.month}`}
                        id={`${factory.factoryId}-${allocation.month}`}
                        className="col-1 border height text-white"
                        data-toggle="modal"
                        data-target="#selectedMonth"
                        onDragOver={(e) => this.onDragOver(e)}
                        onDrop={(e) => {
                          this.onDrop(e, factory.factoryId, allocation.month)
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
                            this.onClick(e, factory.factoryId, allocation)
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

        <footer className="footer ">
          <div className="text-center hrfooter">
            <hr className="mx-5 " />
          </div>
          <div>
            <span>Copyright </span>
            <span>@ 2021 Planning Board</span>
          </div>
        </footer>
        <div
          className="modal fade "
          id="selectedMonth"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-fullscreen-xl-down modal-xl"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <div className="col-12">
                  <div className="col-6">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Planning Board
                    </h5>
                  </div>
                  <div className="col-6"></div>
                </div>
              </div>
              <div className="modal-body row">
                <p>
                  <span>Selected Factory: {this.state.selected_factory}</span>
                  <span style={{ marginLeft: '25px' }}>
                    Selected Month:{' '}
                    {this.state.selected_allocation &&
                      this.state.selected_allocation.month}
                  </span>
                  <span style={{ marginLeft: '25px' }}>
                    Approved SAM:{' '}
                    {this.state.selected_allocation &&
                      this.state.selected_allocation.sam}
                  </span>
                  <span style={{ marginLeft: '25px' }}>
                    Allocated SAM:{' '}
                    {this.state.selected_allocation.orders &&
                      _.sumBy(this.state.selected_allocation.orders, 'sam')}
                  </span>
                </p>

                {this.state.selected_allocation.orders &&
                  this.state.selected_allocation.orders.map((order) => {
                    return (
                      <div
                        draggable="true"
                        onDragStart={(e) => this.onDragStart(e, order.orderId)}
                        className="col-xs-4 col-sm-4 col-md-4"
                        key={order.orderId}
                      >
                        <div
                          className={`text-white border py-1 px-3 my-col height `}
                          style={{
                            backgroundColor: `${order.color}`,
                            height: '120px',
                            position: 'relative',
                          }}
                        >
                          <h6 className="font-weight-400">
                            <span
                              style={{
                                position: 'absolute',
                                right: '6px',
                                top: '10px',
                                cursor: 'pointer',
                              }}
                              className=""
                              onClick={(e) => {
                                this.onUnallocate(
                                  e,
                                  this.state.selected_factory,
                                  this.state.selected_allocation.month,
                                  order.orderId
                                )
                              }}
                            >
                              <FontAwesomeIcon
                                className="close"
                                color="black"
                                icon={faTrashAlt}
                              />
                            </span>
                          </h6>
                          <h6 className="font-weight-400">
                            {' '}
                            <span className="">ID</span> :{' '}
                            <span className="order_label">{order.orderId}</span>
                          </h6>
                          <h6 className="font-weight-400">
                            <span className="">Style</span> :{' '}
                            <span className="order_label">
                              {order.styleDescription}
                            </span>
                          </h6>
                          <h6 className="font-weight-400">
                            <span className="">Quantity</span> :{' '}
                            <span className="order_label">
                              {order.orderedQty}
                            </span>
                          </h6>
                          <h6 className="font-weight-400">
                            <span className="">SAM</span> :{' '}
                            <span className="order_label">{order.sam}</span>
                          </h6>
                        </div>
                      </div>
                    )
                  })}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default dashboard
