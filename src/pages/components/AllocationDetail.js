import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrashAlt,
  faBalanceScaleRight,
} from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import React from 'react'
import logo from '../logo.png'

const AllocationDetail = (props) => (
  <div
    className="modal fade "
    id="selectedMonth"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-fullscreen" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-11">
                <h5 className="modal-title" id="exampleModalLabel">
                  <img
                    alt="Smart planner"
                    style={{ width: '40px', marginRight: '10px' }}
                    src={logo}
                  />{' '}
                  Allocation Details
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
            <div className="col-12">
              <span>
                Factory: <b>{props.selected_factory_name}</b>
              </span>
              <span style={{ marginLeft: '25px' }}>
                Month:{' '}
                <b>
                  {props.selected_allocation && props.selected_allocation.month}
                </b>
              </span>
              <span style={{ marginLeft: '25px' }}>
                Approved SAM:{' '}
                <b>
                  {props.selected_allocation &&
                    props.selected_allocation.machineMins}
                </b>
              </span>
              <span style={{ marginLeft: '25px' }}>
                Allocated SAM:{' '}
                <b>
                  {props.selected_allocation.orders &&
                    _.sumBy(props.selected_allocation.orders, 'sam')}
                </b>
              </span>
            </div>
            <br />
            <table className="table table-striped table-hover table-fixed">
              <thead>
                <tr>
                  <th scope="col">PO Number - IONO#</th>
                  <th scope="col">Buyer Name</th>
                  <th scope="col">Season</th>
                  {/* <th scope="col">Prod Unit</th> */}
                  <th scope="col">Style Number</th>
                  <th scope="col">Embellishment</th>
                  <th scope="col">SDESC</th>
                  <th scope="col">Combo</th>
                  <th scope="col">Ord Qty</th>
                  <th scope="col">Prd Qty</th>
                  <th scope="col">SAM</th>
                  <th scope="col">Country</th>
                  <th scope="col" style={{ width: '90px' }}>
                    Ship Dt
                  </th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {props.selected_allocation.orders &&
                  props.selected_allocation.orders.map((order, index) => {
                    return (
                      <tr key={order.orderId + '' + index}>
                        <td>
                          <span style={{ float: 'left' }}>{order.orderNo}</span>
                          <FontAwesomeIcon
                            style={{ marginLeft: '10px', float: 'left' }}
                            className={`close ${
                              props.is_over_utilisation(index)
                                ? 'd-block'
                                : 'd-none'
                            }`}
                            color="red"
                            icon={faBalanceScaleRight}
                          />
                        </td>

                        <td>{order.customerName}</td>
                        <td>{order.season}</td>
                        {/* <td>{order.prodUnit}</td> */}
                        <td>{order.styleName}</td>
                        <td>{order.embellishment}</td>
                        <td>{order.styleDescription}</td>
                        <td>{order.combo}</td>
                        <td>
                          {order.orderedQty ? order.orderedQty : order.qty}
                        </td>
                        <td>{order.productionQty}</td>
                        <td>{order.orderSam ? order.orderSam : order.sam}</td>
                        <td>{order.country}</td>
                        <td>{order.deliveryDate}</td>
                        <td>
                          <span
                            style={{
                              cursor: 'pointer',
                            }}
                            className=""
                            onClick={(e) => {
                              props.onUnallocate(
                                e,
                                props.selected_factory_id,
                                props.selected_allocation.month,
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
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-dark"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default AllocationDetail
