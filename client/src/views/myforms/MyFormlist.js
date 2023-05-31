// ** React Imports
import { useParams } from 'react-router-dom'
import { Fragment, useState } from 'react'

// ** myforms App Component Imports
import Sidebar from './Sidebar'

// ** Third Party Components
import classnames from 'classnames'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'


// ** Styles
import '@styles/react/apps/app-email.scss'
import FormList from './FormList'

const MyFormlist = () => {
    // ** States
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [composeOpen, setComposeOpen] = useState(false)

    // ** Toggle Compose Function
    const toggleCompose = () => setComposeOpen(!composeOpen)

    // ** Store Variables
    const dispatch = useDispatch()
    const store = useSelector((state) => state.email)

    // ** Vars
    const params = useParams()

    // ** UseEffect: GET initial data on Mount
    // useEffect(() => {
    //     dispatch(
    //         getMails({
    //             q: query || '',
    //             folder: params.folder || 'inbox',
    //             label: params.label || ''
    //         })
    //     )
    // }, [query, params.folder, params.label])

    return (
        <Fragment>
            <Sidebar
                // store={store}
                // dispatch={dispatch}
                // getMails={getMails}
                sidebarOpen={sidebarOpen}
            // toggleCompose={toggleCompose}
            // setSidebarOpen={setSidebarOpen}
            // resetSelectedMail={resetSelectedMail}
            />
            <div className="content-right">
                <div className="content-body">
                    <FormList />
                </div>
            </div>
        </Fragment>
    )
}

export default MyFormlist
