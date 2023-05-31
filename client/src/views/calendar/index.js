// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import { Row, Col } from 'reactstrap'

// ** Calendar App Component Imports
import Calendar from './Calendar'
import SidebarLeft from './SidebarLeft'
import AddEventSidebar from './event/AddEventSidebar'

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchEvents,
    selectEvent,
    updateEvent,
    updateFilter,
    updateAllFilters,
    addEvent,
    removeEvent
} from './store'

// ** Styles
import '@styles/react/apps/app-calendar.scss'

// ** CalendarColors
const calendarsColor = {
    Business: 'primary',
    Holiday: 'success',
    Personal: 'danger',
    Family: 'warning',
    ETC: 'info'
}
const filtersRadio = [
    { label: 'Events', id: 'events', defaultChecked: true },
    { label: 'Appointments', id: 'appointments' },
    { label: 'Booking', id: 'booking' },
    { label: 'Attendance', id: 'attendance' }
]

const CalendarComponent = () => {
    // ** Variables
    const dispatch = useDispatch()
    const store = useSelector((state) => state.calendar)

    // ** states
    const [calendarApi, setCalendarApi] = useState(null)
    const [addSidebarOpen, setAddSidebarOpen] = useState(false)
    const [addAppSidebarOpen, setAddAppSidebarOpen] = useState(false)
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
    const [activeFilter, setActiveFilter] = useState(filtersRadio[0]?.label)


    // ** Hooks
    const [isRtl] = useRTL()

    // ** AddEventSidebar Toggle Function
    const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)

    // ** AddAppSidebar Toggle Function
    const handleAddAppSidebar = () => setAddAppSidebarOpen(!addAppSidebarOpen)

    // ** LeftSidebar Toggle Function
    const toggleSidebar = (val) => setLeftSidebarOpen(val)

    // ** Blank Event Object
    const blankEvent = {
        title: '',
        start: '',
        end: '',
        allDay: false,
        url: '',
        extendedProps: {
            calendar: '',
            guests: [],
            location: '',
            description: ''
        }
    }

    // ** refetchEvents
    const refetchEvents = () => {
        if (calendarApi !== null) {
            calendarApi.refetchEvents()
        }
    }

    // ** Fetch Events On Mount
    useEffect(() => {
        dispatch(fetchEvents(store.selectedCalendars))
    }, [])

    return (
        <Fragment>
            <div className="app-calendar overflow-hidden border">
                <Row className="g-0">
                    <Col
                        id="app-calendar-sidebar"
                        className={classnames(
                            'col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column',
                            {
                                show: leftSidebarOpen
                            }
                        )}
                    >
                        <SidebarLeft
                            store={store}
                            dispatch={dispatch}
                            updateFilter={updateFilter}
                            filtersRadio={filtersRadio}
                            activeFilter={activeFilter}
                            toggleSidebar={toggleSidebar}
                            setActiveFilter={setActiveFilter}
                            updateAllFilters={updateAllFilters}
                            handleAddEventSidebar={handleAddEventSidebar}
                            handleAddAppSidebar={handleAddAppSidebar}
                        />
                    </Col>
                    <Col className="position-relative">
                        <Calendar
                            isRtl={isRtl}
                            store={store}
                            dispatch={dispatch}
                            blankEvent={blankEvent}
                            calendarApi={calendarApi}
                            selectEvent={selectEvent}
                            updateEvent={updateEvent}
                            toggleSidebar={toggleSidebar}
                            calendarsColor={calendarsColor}
                            setCalendarApi={setCalendarApi}
                            handleAddEventSidebar={handleAddEventSidebar}
                        />
                    </Col>
                    <div
                        className={classnames('body-content-overlay', {
                            show: leftSidebarOpen === true
                        })}
                        onClick={() => toggleSidebar(false)}
                    ></div>
                </Row>
            </div>
            <AddEventSidebar
                store={store}
                dispatch={dispatch}
                addEvent={addEvent}
                open={addSidebarOpen}
                selectEvent={selectEvent}
                updateEvent={updateEvent}
                removeEvent={removeEvent}
                calendarApi={calendarApi}
                refetchEvents={refetchEvents}
                calendarsColor={calendarsColor}
                handleAddEventSidebar={handleAddEventSidebar}
            />

        </Fragment>
    )
}

export default CalendarComponent
