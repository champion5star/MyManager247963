import { Badge, Card } from 'reactstrap'
import React from 'react'
import TimeRuler from './TimeRuler'
import classes from './styles.module.css'
import { BsPlayFill, BsStopFill } from 'react-icons/bs'
import ImageCapture from './imageCapture'

const TimeDoctorPage = (props) => {
    return <div>
        <Card sx={{ margin: '1rem', padding: '6px' }}>
            <div className={classes.timelineBox}>
                <div className={classes.timelineHeader}>
                    <div className={classes.startEndDiv}>
                        <BsPlayFill />
                        <div style={{ marginLeft: '4px', marginRight: '4px' }}>Start time:</div>
                        <div> 3:26 AM</div>
                    </div>
                    <div className={classes.startEndDiv}>
                        <BsStopFill />
                        <div style={{ marginLeft: '4px', marginRight: '4px' }}>End time:</div>
                        <div> 9:26 AM</div>
                    </div>
                </div>
                <TimeRuler />
            </div>
            <div className={classes.flexRow}>
                <div className={classes.indexWrapper}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: '#27c26c' }}></div>
                    <div style={{ fontSize: '12px', marginLeft: '8px' }}>Tracked Time</div>
                </div>
                <div className={classes.indexWrapper}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: '#f7b82f' }}></div>
                    <div style={{ fontSize: '12px', marginLeft: '8px' }}>Manual Time</div>
                </div>
                <div className={classes.indexWrapper}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: '#a4a7b2' }}></div>
                    <div style={{ fontSize: '12px', marginLeft: '8px' }}>Ideal Time</div>
                </div>
                <div className={classes.indexWrapper}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: '#3c4ad9' }}></div>
                    <div style={{ fontSize: '12px', marginLeft: '8px' }}>Rest Time</div>
                </div>
            </div>
        </Card>
        {/* <ImageCapture /> */}
    </div>
}

export default TimeDoctorPage