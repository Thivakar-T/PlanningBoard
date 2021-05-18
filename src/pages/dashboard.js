import React, { Component } from 'react'
import months from './../data/months'
import utilization from './../data/utilization'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrashAlt,
  faBalanceScaleRight,
} from '@fortawesome/free-solid-svg-icons'
import './dashboard.css'
import { inject, observer } from 'mobx-react'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { css } from '@emotion/core'

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
    console.log({ allocated_sam, apsaom: allocation.machineMins })
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
    const {
      order,
      selected_allocation,
    } = this.props.factoryStore.unallocateOrder({ factoryId, orderId, month })
    this.props.orderStore.unallocateOrder({ factoryId, orderId, month, order })
    this.setState({
      selected_allocation,
    })
  }
  onDrop = (ev, factoryId, month) => {
    let orderId = ev.dataTransfer.getData('orderId')
    this.props.factoryStore.allocateOrder({ factoryId, orderId, month })
    this.props.orderStore.allocateOrder({ factoryId, orderId, month })
  }
  render() {
    const { orders, loading_orders } = this.props.orderStore
    const { styles, loading_styles } = this.props.styleStore
    const { factories, loading_factories } = this.props.factoryStore
    console.log({
      orders,
      styles,
      loading_orders,
      loading_styles,
      loading_factories,
    })
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
          <hr style={{ margin: 0 }} />
          <br />
          <div className="main">
            <div className="row">
              <div className="col-6">
                <div className="form-group has-search" style={{ width: '50%' }}>
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
          <div className="row" style={{ overflow: 'scroll' }}>
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
                  .map((order) => {
                    return (
                      <div
                        draggable="true"
                        onDragStart={(e) => this.onDragStart(e, order.orderId)}
                        className="col-xs-3 col-sm-3 col-md-3 "
                        key={order.orderId}
                      >
                        <div
                          className={`card card-block text-white border py-3 px-5 my-col`}
                          style={{ backgroundColor: `${order.styleColour}` }}
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
          </div>

          <div className="row py-2 mx-2 text-center">
            <div className="col-2 pt-2 pb-2 border">Factory</div>
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
          <div className="factory_container">
            {factories.map((factory) => {
              return (
                <div
                  className="row py-2 mx-2 text-center"
                  key={`${factory.id}`}
                >
                  <div className="col-2 border pt-2 pb-2 ">
                    {factory.shortName}
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
                                this.onClick(e, factory.id, allocation)
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

          <footer className="footer " style={{ position: 'relative' }}>
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
                    <span>Factory: {this.state.selected_factory}</span>
                    <span style={{ marginLeft: '25px' }}>
                      Month:{' '}
                      {this.state.selected_allocation &&
                        this.state.selected_allocation.month}
                    </span>
                    <span style={{ marginLeft: '25px' }}>
                      Approved SAM:{' '}
                      {this.state.selected_allocation &&
                        this.state.selected_allocation.machineMins}
                    </span>
                    <span style={{ marginLeft: '25px' }}>
                      Allocated SAM:{' '}
                      {this.state.selected_allocation.orders &&
                        _.sumBy(this.state.selected_allocation.orders, 'sam')}
                    </span>
                  </p>

                  {this.state.selected_allocation.orders &&
                    this.state.selected_allocation.orders.map(
                      (order, index) => {
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
                              className={`text-white border py-1 px-3 my-col height  `}
                              style={{
                                backgroundColor: `${order.styleColour}`,
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
                                <span
                                  style={{
                                    position: 'absolute',
                                    right: '6px',
                                    bottom: '10px',
                                  }}
                                  className=""
                                >
                                  <FontAwesomeIcon
                                    className={`close ${
                                      this.is_over_utilisation(index)
                                        ? 'd-block'
                                        : 'd-none'
                                    }`}
                                    color="red"
                                    icon={faBalanceScaleRight}
                                  />
                                </span>
                              </h6>
                              <h6 className="font-weight-400">
                                {' '}
                                <span className="order_label">ID</span> :{' '}
                                <span className="order_label">
                                  {order.orderNo}
                                </span>
                              </h6>
                              <h6 className="font-weight-400">
                                <span className="order_label ">Style</span> :{' '}
                                <span className="order_label style_des">
                                  {order.styleDescription}
                                </span>
                              </h6>
                              <h6 className="font-weight-400">
                                <span className="order_label">Quantity</span> :{' '}
                                <span className="order_label">
                                  {order.orderedQty
                                    ? order.orderedQty
                                    : order.qty}
                                </span>
                              </h6>
                              <h6 className="font-weight-400">
                                <span className="order_label">SAM</span> :{' '}
                                <span className="order_label">{order.sam}</span>
                              </h6>
                            </div>
                          </div>
                        )
                      }
                    )}
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
      </>
    )
  }
}

export default dashboard
