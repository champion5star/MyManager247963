import React, { useRef, useState } from 'react'
// import * as cron from "node-cron"
import { Button } from 'reactstrap'
import { BsPlayFill, BsStopFill } from 'react-icons/bs'


// let count = 0;
// const job = cron.schedule("*/1 * * * * *", function () {
//     count++;
//     screenshot({ filename: `D://demo${count}.png` })
//     console.log("screen shot", count);
// });

function format(val) {
    val = val.toString()
    if (val.length == 1) {
        val = "0" + val
    }
    return val
}

const ImageCapture = () => {
    // const [job, setJob] = useState(null)
    //    const [imgsrc, setImgsrc] = useState()
    const [isStart, setIsStart] = useState(false)
    // const [count, setCount] = useState(0)
    const watch = useRef()
    const[timer, setTimer] = useState({
        secs: 0,
        mins: 0,
        hrs: 0,
        on: false
    })
    const pace = () => {
        setTimer((prev) => {
            var secs = prev.secs
            var mins = prev.mins
            var hrs = prev.hrs
            secs++
            if (secs >= 60) {
                mins++
                secs = 0
            }
            if (mins >= 60) {
                hrs++
                mins = 0
            }
            return { secs, mins, hrs }
        })
    }
    const startTimer = () => {
        watch.current = setInterval(pace, 1000)
        setTimer((prev) => ({
            ...prev,
            on: true
        }))
    }

    const stopTimer = () => {
        clearInterval(watch.current)
        setTimer((prev) => {
            return {
                ...prev,
                on: false
            }
        })
    }

    const resetTimer = () =>
        setTimer((prev) => ({ ...prev, mins: 0, secs: 0, hrs: 0 }))

    const toggleState = () => {
        if (!isStart) {
        //     const newJob = cron.schedule("*/1 * * * * *", function () {
        //         setCount(count++)
        //         console.log("screen shot", count)
        //     })
        //     setJob(newJob)
        // }
        // else {
        //     job.stop()
        }
        setIsStart(!isStart)
    }

    return (
        <div className='d-flex align-items-center'>
            {isStart ? (
                <Button color='warning' onClick={(e) => {toggleState(), stopTimer(), resetTimer()}}>
                    CLOCK OUT
                    <BsStopFill />
                </Button>
            ) : (
                <Button color='success' onClick={(e) => {toggleState(), startTimer()}}>
                    CLOCK IN
                    <BsPlayFill />
                </Button>
            )}
            <h3 className='d-flex px-3 m-0'>{format(timer.hrs)} : {format(timer.mins)} : {format(timer.secs)}</h3>
        </div>
    )
}

export default ImageCapture