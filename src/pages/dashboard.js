import React, { Component } from 'react'
import orders from './../data/order'
import factories from './../data/factories'
import months from './../data/months'

class dashboard extends Component {
  constructor() {
    super()
    this.state = {
      orders: orders,
      months: months,
      factories: factories,
      filter: '',
      selected_orders: [],
      selected_factory: '',
      selected_month: '',
    }
  }
  setFilter = (value) => {
    if (!value || !value.trim()) {
      this.setState({ filter: '' })
    } else {
      this.setState({ filter: value })
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

  onClick = (ev, factoryId, month) => {
    console.log(factoryId)
    console.log(month)
    this.setState({
      selected_factory: factoryId,
      selected_month: month,
    })
    let selected_factory = factories.filter(
      (factory) => factory.factoryId === factoryId
    )
    console.log(selected_factory)
    let selected_allocation = selected_factory[0].allocations.filter(
      (allocation) => allocation.month === month
    )
    this.setState({
      selected_orders: selected_allocation[0].orders,
    })
  }
  onUnallocate = (ev, factoryId, month, orderId) => {
    console.log(factoryId)
    console.log(month)
    const factories = this.state.factories
    this.setState({
      selected_factory: factoryId,
      selected_month: month,
    })
    let selected_factory = factories.filter(
      (factory) => factory.factoryId === factoryId
    )
    console.log(selected_factory)
    let selected_allocation = selected_factory[0].allocations.filter(
      (allocation) => allocation.month === month
    )
    let order = selected_allocation[0].orders.filter(
      (order) => order.orderId === orderId
    )
    selected_allocation[0].orders = selected_allocation[0].orders.filter(
      (order) => order.orderId !== orderId
    )
    const selected_orders = this.state.selected_orders.filter((order) => {
      return order.orderId !== orderId
    })
    this.setState({
      factories: factories,
      orders: this.state.orders.concat(order),
      selected_orders: selected_orders,
    })
  }
  onDrop = (ev, factoryId, month) => {
    let orderId = ev.dataTransfer.getData('orderId')
    let selected_order = this.state.orders.filter((order) => {
      return order.orderId === orderId
    })
    let filtered_orders = this.state.orders.filter((order) => {
      return order.orderId !== orderId
    })
    const new_factories = this.state.factories
    let selected_factory = factories.filter(
      (factory) => factory.factoryId === factoryId
    )
    console.log(selected_factory)
    let selected_allocation = selected_factory[0].allocations.filter(
      (allocation) => allocation.month === month
    )
    selected_allocation[0].orders.push(selected_order[0])
    console.log({ factories: new_factories })
    this.setState({
      orders: filtered_orders,
      filteredList: filtered_orders,
    })
    this.setState({
      factories: new_factories,
    })
  }
  render() {
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
        </div>

        <div className="row">
          <div id="demo" className="carousel slide" data-ride="carousel">
            <div className="container carousel-inner no-padding">
              <div className="carousel-item active">
                {this.state.orders
                  .filter(
                    (item) =>
                      item.orderId.includes(this.state.filter) ||
                      !this.state.filter
                  )
                  .map((order) => {
                    return (
                      <div
                        draggable="true"
                        onDragStart={(e) => this.onDragStart(e, order.orderId)}
                        className="col-xs-3 col-sm-3 col-md-3"
                        key={order.orderId}
                      >
                        <div
                          className={`card text-white border py-3 px-5 my-col`}
                          style={{ backgroundColor: `#${order.color}` }}
                        >
                          <h6 className="font-weight-400">
                            {' '}
                            {order.orderId}
                          </h6>
                          <h6 className="font-weight-400">
                            {order.style}
                          </h6>
                          <h6 className="font-weight-400">
                            <span className="">PQTY</span> : {order.qty}
                          </h6>
                          <h6 className="font-weight-400">
                            <span className="">SAM</span> : {order.sam}
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
        {this.state.factories.map((factory) => {
          return (
            <div
              className="row py-2 mx-2 text-center"
              key={`${factory.factoryId}`}
            >
              <div className="col-2 border height pt-1">{factory.factoryName}</div>
              <div className="col-10">
                <div className="row ">
                  {factory.allocations.map((allocation) => {
                    return (
                      <div
                        style={{ padding: 0 }}
                        key={`${factory.factoryId}-${allocation.month}`}
                        id={`${factory.factoryId}-${allocation.month}`}
                        className="col-1 border height text-white"
                        data-toggle="modal"
                        data-target="#selectedMonth"
                        onDragOver={(e) => this.onDragOver(e)}
                        onClick={(e) => {
                          this.onClick(e, factory.factoryId, allocation.month)
                        }}
                        onDrop={(e) => {
                          this.onDrop(e, factory.factoryId, allocation.month)
                        }}
                      >
                        {allocation.orders.map((order) => {
                          var totalSAM=0;
                          var cellColor='';
                          for(var i=0; i< allocation.orders.length; i++) {
                            totalSAM+=allocation.orders[i].sam;
                          }
                          cellColor=(totalSAM==100000)?'94fbab':(totalSAM>100000)?'bf4342':'0496ff';

                          return (
                            <div
                              style={{
                                height: `${100 / allocation.orders.length}%`,
                                backgroundColor: `#${cellColor}`,
                              }}
                              className={`height`}
                              onDrop={(e) => {
                                this.allowDrop(e)
                              }}
                              key={`${factory.factoryId}-${allocation.month}-${order.orderId}`}
                            ></div>
                          )
                        })}
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
                <h5 className="modal-title" id="exampleModalLabel">
                  Planning Board
                </h5>
              </div>
              <div className="modal-body row">
                <p>{this.state.selected_factory}</p>
                {this.state.selected_orders.map((order) => {
                  return (
                    <div
                      draggable="true"
                      onDragStart={(e) => this.onDragStart(e, order.orderId)}
                      className="col-xs-4 col-sm-4 col-md-4"
                      key={order.orderId}
                    >
                      <div
                        className={`text-white border py-3 px-5 my-col height `}
                        style={{
                          backgroundColor: `#${order.color}`,
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
                            }}
                            className=""
                            onClick={(e) => {
                              this.onUnallocate(
                                e,
                                this.state.selected_factory,
                                this.state.selected_month,
                                order.orderId
                              )
                            }}
                          >
                            <button
                              type="button"
                              className="close"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </span>
                        </h6>
                        <h6 className="font-weight-300">
                          {order.orderId}
                        </h6>
                        <h6 className="font-weight-300">
                          {order.style}
                        </h6>
                        <h6 className="font-weight-300">
                          <span className="">QTY</span> : {order.qty} , <span className="">SAM</span> : {order.sam}
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
