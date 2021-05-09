import React, { Component } from "react";
import { useState } from "react";
import orders from "./../data/order";
import factories from "./../data/factories";
import MONTHS from "./../data/months";


class dashboard extends Component {
    
    constructor() {
      super();
      this.state = {
        orders: orders,
        months: MONTHS,
        factories: factories,
        filteredList: orders,
        filter: '',
        colors: {},
        palette : [ "5BC0EB","FDE74C","9BC53D","E55934","FA7921","9BC53D", "7AE7C7", "75BBA7",  "982649", "6C809A", "60B2E5", "53F4FF", "71A2B6", "343E3D", "607466", "AEDCC0", "7BD389", "A5B452", "C8D96F", "C4F7A1", "9BA7C0", "3C1518", "69140E", "A44200", "D58936", "F2F3AE", "795663", "645244" ]
      };
      this.assignColors();
    }
    /*
   componentDidMount() {
      window.addEventListener('load', this.assignColors);
   }
   */
   assignColors = () => {
     orders.forEach((item,index) => {
      this.state.colors[item.orderId]=this.state.palette[index];
     });
     console.log(this.state.colors);
   };

   setFilter = (value) => {
     if(!value || value === "") {
      this.setState({filteredList: this.state.orders})
     } else {
      let ordersList = this.state.orders;
      let filteredList = []
      ordersList.forEach((item, index) => {
        if(item.orderId.includes(value)) {
            filteredList.push(item);
        }
      })

      this.setState({filteredList: filteredList})
    }
   };

  

    onDragStart = (ev, orderId) => {
      console.log("dragstart:", orderId);
      ev.dataTransfer.setData("orderId", orderId);
    };
    onDragOver = (ev) => {
      ev.preventDefault();
    };
    allowDrop(ev) {
      ev.preventDefault();
    }
  
    onDrop = (ev, factoryId, month) => {
      let orderId = ev.dataTransfer.getData("orderId");
      let selected_order = this.state.orders.filter((order) => {
        return order.orderId === orderId;
      });
      let filtered_orders = this.state.orders.filter((order) => {
        return order.orderId !== orderId;
      });
      const new_factories = this.state.factories;
      let selected_factory = factories.filter(
        (factory) => factory.factoryId === factoryId
      );
      console.log(selected_factory);
      let selected_allocation = selected_factory[0].allocations.filter(
        (allocation) => allocation.month === month
      );
      selected_allocation[0].orders.push(selected_order[0]);
      console.log({ factories: new_factories });
      this.setState({
        orders: filtered_orders,
        filteredList: filtered_orders
      });
      this.setState({
        factories: new_factories,
      });
    };
    render() {
      return (
        <div className="container">
          <div className="py-3 mr-1 row">
            <div className="col-6">
              <h3>Planning Board</h3>
            </div>
            <div className="col-5"></div>
            <div className="col-1">
              <span>
                <img
                  _ngcontent-weu-c112=""
                  src="https://icon-library.net/images/profiles-icon/profiles-icon-0.jpg"
                  width="43%"
                  alt="Header Avatar"
                  className="rounded-circle header-profile-user"
                />
              </span>
            </div>
          </div>
          <div class="main">  
            <div class="form-group has-search">
              <span class="fa fa-search form-control-feedback"></span>
              <input id="filter" 
                class="form-control"
                  name="filter"
                  type="text"
                  placeholder="Type here to filter your orders"
                  onChange={event => this.setFilter(event.target.value)}
                />             
            </div>
          </div>

          <div className="align-right">
            <div>Orders pending allocation : <b>{this.state.filteredList.length}</b></div>
          </div>
          <div className="align-right">
            <div>&nbsp;</div>
          </div>
          <div className="row">
            <div id="demo"  >
              <div className="container carousel-inner no-padding">
                <div className="carousel-item active">
                  {this.state.filteredList.map((order) => {
                    return (
                      <div
                        draggable="true"
                        onDragStart={(e) => this.onDragStart(e, order.orderId)}
                        className="col-xs-3 col-sm-3 col-md-3"
                        key={order.orderId}
                      >
                        <div className={`card text-white border py-3 px-5 my-col bg-${this.state.colors[order.orderId]}`}>
                          <h6 className="font-weight-400">
                            {" "}
                            <span className="">Order ID</span> : {order.orderId}
                          </h6>
                          <h6 className="font-weight-400">
                            <span className="">Style</span> : {order.style}
                          </h6>
                          <h6 className="font-weight-400">
                            <span className="">Quantity</span> : {order.qty}
                          </h6>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
  
          <div className="pt-5">
            <h5>
              <u className="text-muted">
              </u>
            </h5>
          </div>
          <div className="row py-2 mx-2 text-center">
            <div className="col-1 pt-1 border">
              Place
            </div>
            <div className="col-11">
              <div className="row ">
              {this.state.months.map((month) => {
                    return (
                      <div className="col-1 pt-1 border">
                           {month.month}
                </div>
                );
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
                <div className="col-1 border height pt-1">
                  {factory.location}
                </div>
                <div className="col-11">
                  <div className="row ">
                    {factory.allocations.map((allocation) => {
                      return (
                        <div
                          style={{ padding: 0 }}
                          key={`${factory.factoryId}-${allocation.month}`}
                          id={`${factory.factoryId}-${allocation.month}`}
                          className="col-1 border height text-white"
                          onDragOver={(e) => this.onDragOver(e)}
                          onDrop={(e) => {
                            this.onDrop(e, factory.factoryId, allocation.month);
                          }}
                        >
                          {allocation.orders.map((order) => {
                            return (
                              <div style={{height: `${100/allocation.orders.length}%`}}
                                className={`bg-${this.state.colors[order.orderId]} height`}
                                onDrop={(e) => {
                                  this.allowDrop(e);
                                }}
                                key={`${factory.factoryId}-${allocation.month}-${order.orderId}`}
                              >
                                
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          
          <footer className="footer ">
                        <div className="text-center hrfooter">
                        <hr className="mx-5 " />

                        </div>
                        <div>
                            <a href="https://coreui.io">Planning </a>
                            <span>@ 2020 Planning Board.</span>
                        </div>
                       
                    </footer>

        </div>
      );
    }
  }
  
  export default dashboard;