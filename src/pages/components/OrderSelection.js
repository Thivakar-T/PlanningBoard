import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrashAlt,
  faBalanceScaleRight,
} from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import React from 'react'

const OrderSelection = (props) => (
  <div
    className="modal fade "
    id="orderSelection"
    tabIndex="-1"
    role="dialog"
    aria-labelledby=""
    aria-hidden="true"
  >
    <div className="modal-dialog modal-fullscreen" role="document">
      <div className="modal-content">
        <div className="modal-header ">
          <div className="container-fluid">
            <div className="row">
              <div className="col-11">
                <h5 className="modal-title" id="exampleModalLabel">
                  Order Selection
                </h5>
              </div>
              <div className="col-1">
                <button
                  type="button"
                  style={{ float: 'right' }}
                  className="btn-close"
                  data-dismiss="modal"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-3">
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
                    value={props.filter}
                    placeholder="Search by ID or Style"
                    onChange={(event) => props.setFilter(event.target.value)}
                  />
                </div>
              </div>
              <div className="offset-6 col-3">
                <div className="align-right">
                  <div>
                    Orders pending allocation : <b>{props.orders.length}</b>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      value={props.isAllOrderSelected(props.orders)}
                      onChange={(e) => {
                        props.selectOrUnselectAllOrders(e)
                      }}
                    />
                  </th>
                  <th scope="col">Orde No#</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Style</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">SAM</th>
                  <th scope="col">Season</th>
                  <th scope="col">Country</th>
                </tr>
              </thead>
              <tbody>
                {props.orders.length > 0 &&
                  props.orders
                    .filter(
                      (item) =>
                        item.orderNo
                          .toString()
                          .toUpperCase()
                          .includes(props.filter.toUpperCase()) ||
                        item.styleDescription
                          .toString()
                          .toUpperCase()
                          .includes(props.filter.toUpperCase()) ||
                        !props.filter
                    )
                    .map((order, index) => {
                      return (
                        <tr key={order.orderId + '' + index}>
                          <td scope="row">
                            <input
                              type="checkbox"
                              checked={order.selected}
                              onChange={(e) => {
                                props.selectOrUnselectOrder(e, order.orderId)
                              }}
                            />
                          </td>
                          <td>{order.orderNo}</td>
                          <td>{order.customerName}</td>
                          <td>{order.styleDescription}</td>
                          <td>{order.orderedQty}</td>
                          <td>{order.orderSam}</td>
                          <td>{order.season}</td>
                          <td>{order.country}</td>
                        </tr>
                      )
                    })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-footer">
          <div className="container-fluid">
            <button
              type="button"
              style={{ float: 'right' }}
              className="btn btn-outline-dark"
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

export default OrderSelection
