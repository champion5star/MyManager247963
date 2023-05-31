// ** React Imports
import { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// ** Components
import CardEvent from './CardEvent'
import GuestTracker from './guests/GuestTracker'
import CardInvite from './CardInvite'
import AttendeesTabs from './AttendeesTabs'

// ** Reactstrap Imports
import { Row, Col, Card } from 'reactstrap'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Redux Action Import
import { getEventInfo } from './store'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'

const EventDetails = () => {
    // ** Context
    const { colors } = useContext(ThemeColors)
    const  { eventId } = useParams()
    const eventInfo = useSelector( state => state.event.eventInfo)
    // const [ eventInfo, setEventInfo ] = useState({})

    // ** Store vars
    
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getEventInfo(eventId))
    }, [])
    // const guestData = useSelector( state => state.event )
    // console.log(eventInfo)
    return (
        <div>
            <Row className="match-height">
                <Col lg="4" md="6" xs="12">
                    <CardEvent 
                    eventInfo={
                        {
                            title: eventInfo.title,
                            start: eventInfo.start,
                            end: eventInfo.end,
                            eventLocation: eventInfo.eventLocation,
                            eventStreet: eventInfo.eventStreet,
                            eventCity: eventInfo.eventCity,
                            eventState: eventInfo.eventState
                        }
                    }/>
                </Col>
                <Col lg="4" md="6" xs="12">
                    <GuestTracker
                        primary={colors.primary.main}
                        danger={colors.danger.main}
                        data={eventInfo}
                    />
                </Col>
                <Col lg="4" md="6" xs="12">
                    <CardInvite />
                </Col>
            </Row>
            <Row className="match-height">
                <Col lg="12" xs="12">
                    <AttendeesTabs data={eventInfo.guests}/>
                </Col>
            </Row>
        </div>
    )
}

export default EventDetails
