import React from "react"
import { Sun, User } from "react-feather"
import img5 from '@src/assets/images/portrait/small/avatar-s-4.jpg'
import AddEmpolye from "./AddEmpolye"
import CreateEvent from "./CreateEvent"

const days = [
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
  "8pm",
  "9pm",
  "10pm",
  "11pm",
  "12am",
  "1am",
]
function DayCalendar() {
  return (
    <div className="w-100 shadow p-3 mb-5 bg-white rounded">
      <table align="center">
        <tbody>
          <tr>
            <td
              className="border cursor-pointer">
              <div className="d-flex">
                <AddEmpolye />
                <div className="d-flex m-1">
                  <Sun size={18} />
                  <span >30 F</span>
                  <br />
                  <span>66</span>
                </div>
              </div>
            </td>
            {days.map((item, i) => {
              return (
                <td
                  key={i}
                  align="center"
                  height="100"
                  width="100"
                  className="border cursor-pointer font-size font-small-2 fw-bold"
                >
                  {item}
                  <div>
                    <User size={18} />
                    <span>12</span>
                  </div>
                </td>
              )
            })}
          </tr>
          <tr>
            <td className="border p-1">Events</td>
            <td className="border cursor-pointer">
              <CreateEvent/>
            </td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
          </tr>
          <tr>
            <td className="border p-1">
              Open Shift
            </td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
            <td className="border cursor-pointer"></td>
          </tr>
          {data.map((item, i) => (
            <tr key={i}>
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
              </td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
              <td className="border cursor-pointer"></td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default DayCalendar

const data = [{
  "id": 1,
  "first_name": "Sancho",
  "last_name": "Vautin",
  "email": "svautin0@yahoo.com",
  "gender": "Male",
  "ip_address": "89.254.178.128"
}, {
  "id": 2,
  "first_name": "Moshe",
  "last_name": "Haggar",
  "email": "mhaggar1@rakuten.co.jp",
  "gender": "Male",
  "ip_address": "163.226.116.140"
}, {
  "id": 3,
  "first_name": "Linus",
  "last_name": "McGiven",
  "email": "lmcgiven2@yahoo.com",
  "gender": "Male",
  "ip_address": "43.48.178.43"
}, {
  "id": 4,
  "first_name": "Sherie",
  "last_name": "Chasson",
  "email": "schasson3@parallels.com",
  "gender": "Female",
  "ip_address": "220.61.179.138"
}, {
  "id": 5,
  "first_name": "Dud",
  "last_name": "Monk",
  "email": "dmonk4@tripadvisor.com",
  "gender": "Male",
  "ip_address": "166.52.51.7"
}]
