
// ** React Imports
import { Fragment, useState} from 'react'

// ** Components
import AddCategoryModal from "./addCategoryModal"

// ** Third Party Components
import Select from 'react-select'
import DataTable from 'react-data-table-component'
import {
    FileText,
    Trash2,
    Edit,
} from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Input,
    Button,
    CardBody,
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Customers = () => {
    // ** States
    const [centeredModal, setCenteredModal] = useState(false)
    const [currentCategory, setCurrentCategory] = useState({
        value: '',
        label: 'Filter By Category'
    })
    const categoryOptions = [
        { value: '', label: 'Filter By Category' },
        { value: 'category1', label: 'Category 1' },
        { value: 'category2', label: 'Category 2' }
    ]

    const tabledata = [
        {
            id: "E84h4k4",
            date: "10/02/2023",
            name: 'Md. Nahiduzzmana',
            email: "mdnahid071@gmail.com",
            phone: "+880838383838",
            address: "you are welcome"
        },
        {
            id: "E84h4k4",
            date: "10/02/2023",
            name: 'Md. Nahiduzzmana',
            email: "mdnahid071@gmail.com",
            phone: "+880838383838",
            address: "you are welcome"
        },
        {
            id: "E84h4k4",
            date: "10/02/2023",
            name: 'Md. Nahiduzzmana',
            email: "mdnahid071@gmail.com",
            phone: "+880838383838",
            address: "you are welcome"
        },
        {
            id: "E84h4k4",
            date: "10/02/2023",
            name: 'Md. Nahiduzzmana',
            email: "mdnahid071@gmail.com",
            phone: "+880838383838",
            address: "you are welcome"
        },
    ]

    const columnsdata = [
        {
            name: 'ID',
            sortable: true,
            // width: '130px',
            sortField: 'id',
            selector: row => row.id,
        },
        {
            name: 'Joining Date',
            sortable: true,
            // width: '130px',
            sortField: 'date',
            selector: row => row.date,
        },
        {
            name: 'Customer Name',
            sortable: true,
            // width: '130px',
            sortField: 'name',
            selector: row => row.name,
        },
        {
            name: 'Email',
            sortable: true,
            // width: '130px',
            sortField: 'email',
            selector: row => row.email,
        },
        {
            name: 'Phone',
            sortable: true,
            // width: '130px',
            sortField: 'phone',
            selector: row => row.phone,
        },
        {
            name: 'Address',
            sortable: true,
            // width: '130px',
            sortField: 'address',
            selector: row => row.address,
        },
        {
            name: 'Actions',
            // minWidth: '100px',
            cell: (row) => (
                <div className="column-action">
                    <FileText size={20} className="me-1" />
                    <Trash2 size={20} className="me-1" />
                </div>
            )
        }
    ]

    return (
        <Fragment>
            <Card>
                <CardBody>
                    <Row>
                        <Col md="12">
                            <Input
                                id="search-invoice"
                                // className="w-100"
                                type="text"
                                placeholder='Search by name/email/phone ...'
                            />
                        </Col>
                        
                    </Row>
                </CardBody>
            </Card>
            <Card>
                <Col>
                    <DataTable
                        columns={columnsdata}
                        data={tabledata}
                        pagination
                    />
                </Col>
            </Card>
        </Fragment>
    )
}

export default Customers
