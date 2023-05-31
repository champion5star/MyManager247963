import React, { useState } from "react"
import moment from "moment"
import { ChevronDown, ChevronUp, Maximize, Minimize, Sun, User } from "react-feather"
import img5 from '@src/assets/images/portrait/small/avatar-s-4.jpg'
import { Input } from "reactstrap"

// const weather = [Sun]
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const WeekCalender = (props) => {
  const [openfooter, setopenfooter] = useState(false)

  const handleClickOpen = () => {
    setopenfooter(!openfooter)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleFormOpen = () => {
  }

  return (
    <>
      <div className="w-100 shadow p-3 mb-5 bg-white rounded">
        <table className="border w-100 ">
          <tbody>
            <tr>
              <td className="border cursor-pointer" width={'300'}>
                <div className="d-flex">
                  <div className="m-1">
                    <button
                      className="btn btn-primary"
                    >
                      Add Employee
                    </button>
                  </div>
                  <div className="d-flex m-1">
                    <Sun size={18} />
                    <span >30 F</span>
                    <br />
                    <span>66</span>
                  </div>
                </div>
              </td>
              {weekDays.map((item, i) => {
                return (
                  <td
                    className="border cursor-pointer"
                    align="center"
                    key={i}>
                    <span>
                      <b>{item}</b>
                    </span>
                    <br />
                    <div
                      className="d-flex justify-content-between p-1"
                    >
                      {[].map((img, i) => {
                        return (
                          <div className="d-flex">
                            <Sun />
                            <span>30 F</span>
                          </div>
                        )
                      })}
                      <div
                        className="d-flex justify-content-between w-100 m-1"
                      >
                        <User />
                        <span>10</span>
                      </div>
                    </div>
                  </td>
                )
              })}
            </tr>
            <tr>
              <td className="border p-1">Events</td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
            </tr>
            <tr>
              <td className="border p-1"
              >
                Open
              </td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
            </tr>
            <tr>
              <td className="border cursor-pointer" id="sub">
                <div className="d-flex p-1">
                  <img
                    src={img5}
                    className='rounded-circle me-2'
                    alt='Generic placeholder image'
                    height='50'
                    width='50'
                  />
                  <div className="ml-1">
                    <h5 className="font-weight-bold">Antanio S</h5>
                    <span>0.00 - $0.00</span>
                  </div>
                </div>
              </td>
              <td className="border cursor-pointer">
                <div draggable="true">
                  <div>
                    <div

                      style={{ backgroundColor: "rgb(150, 89, 169)" }}
                    >
                      L
                    </div>
                    <div className="base-shift__details">
                      <div className="base-shift__time">10am - 6pm</div>
                    </div>
                  </div>
                </div>
                <div
                  data-product-tour-target="create_a_shift"
                  onClick={handleFormOpen}
                ></div>
              </td>
              <td className="border cursor-pointer">
                <div
                  data-product-tour-target="create_a_shift"
                  onClick={handleFormOpen}
                ></div>{" "}
              </td>
              <td className="border cursor-pointer">
                <div
                  data-product-tour-target="create_a_shift"
                  onClick={handleFormOpen}
                ></div>
              </td>
              <td className="border cursor-pointer">
                <div
                  data-product-tour-target="create_a_shift"
                  onClick={handleFormOpen}
                ></div>
              </td>
              <td className="border cursor-pointer">
                <div
                  data-product-tour-target="create_a_shift"
                ></div>
              </td>
              <td className="border cursor-pointer">
                <div
                  data-product-tour-target="create_a_shift"
                  onClick={handleFormOpen}
                ></div>
              </td>
              <td className="border cursor-pointer">
                <div
                  data-product-tour-target="create_a_shift"
                  onClick={handleFormOpen}
                ></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-100" style={{
        position: 'absolute',
        bottom: '0',
        left: '-2px'
      }}>
        <div className="d-flex justify-content-end h-100">
          <div onClick={handleClickOpen} className="shadow bg-white p-1 cursor-pointer">
            {
              openfooter ? <ChevronDown /> : <ChevronUp />
            }
          </div>
        </div>
        <div className="w-100 shadow bg-white rounded h-100">
          <table className="w-100 p-1">
            <thead>
              <tr>
                <td
                  height="40"
                  width={"60"}
                  className="border cursor-pointer">
                  <b> WAGES
                    HOURS</b>
                </td>
                <td
                  height="40"
                  width={"40"}
                  className="border cursor-pointer">
                  <div className="d-flex justify-content-between p-1">
                    <User />
                    <b> $1,082.50
                      109.75</b>
                  </div>
                </td>
                <td
                  height="40"
                  width={"40"}
                  className="border cursor-pointer">
                  <div className="d-flex justify-content-between p-1">
                    <User />
                    <b> $1,082.50
                      109.75</b>
                  </div>
                </td>
                <td
                  height="40"
                  width={"40"}
                  className="border cursor-pointer">
                  <div className="d-flex justify-content-between p-1">
                    <User />
                    <b> $1,082.50
                      109.75</b>
                  </div>
                </td>
                <td
                  height="40"
                  width={"40"}
                  className="border cursor-pointer">
                  <div className="d-flex justify-content-between p-1">
                    <User />
                    <b> $1,082.50
                      109.75</b>
                  </div>
                </td>
                <td
                  height="40"
                  width={"40"}
                  className="border cursor-pointer">
                  <div className="d-flex justify-content-between p-1">
                    <User />
                    <b> $1,082.50
                      109.75</b>
                  </div>
                </td>
                <td
                  height="40"
                  width={"40"}
                  className="border cursor-pointer">
                  <div className="d-flex justify-content-between p-1">
                    <User />
                    <b> $1,082.50
                      109.75</b>
                  </div>
                </td>
              </tr>
            </thead>
            {
              openfooter ?
                <tbody>
                  <tr>
                    <td
                      className="border cursor-pointer"
                      height="40"
                    >
                      <div className="d-flex justify-content-between">
                        <b> LABOR % (Target/Actual)</b>
                        <Input style={{
                          width: '40px',
                          height: '30px',
                          padding: '0px'
                        }}
                          value={'0%'} />
                        <span>N/A</span>
                      </div>
                    </td>
                    <td
                      className="border cursor-pointer"
                      height="40"
                    >100</td>
                    <td
                      className="border cursor-pointer"
                      height="40"
                    >100</td>
                    <td
                      className="border cursor-pointer"
                      height="40"
                    >100</td>
                    <td
                      className="border cursor-pointer"
                      height="40"
                    >100</td>
                    <td
                      className="border cursor-pointer"
                      height="40"
                    >100</td>
                    <td
                      className="border cursor-pointer"
                      height="40"
                    >100</td>
                  </tr>
                  <tr>
                    <td
                      className="border cursor-pointer"
                      height="40"
                    >
                      <b>WEATHER FORECAST</b>
                    </td>
                    <td
                      className="border cursor-pointer"
                      height="40"
                    >100</td>
                    <td
                      className="border cursor-pointer"
                      height="40"
                    >100</td>
                    <td
                      className="border cursor-pointer"
                      height="40"
                    >100</td>
                    <td
                      className="border cursor-pointer"
                      height="40"
                    >100</td>
                    <td
                      className="border cursor-pointer"
                      height="40"
                    >100</td>
                    <td
                      className="border cursor-pointer"
                      height="40"
                    >100</td>
                  </tr>
                </tbody> : null
            }
          </table>
        </div>
      </div>
    </>
  )
}

export default WeekCalender
