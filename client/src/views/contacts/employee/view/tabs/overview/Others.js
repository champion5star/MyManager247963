// ** Third Party Components
import classnames from 'classnames'
import { TrendingUp, Box, DollarSign, FileText } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardText,
} from 'reactstrap'

const Others = ({ cols }) => {

    return (
        <Card className="card-statistics pb-1 h-100">
            <CardHeader>
                <CardTitle tag="h4">Other</CardTitle>
                <CardText className="card-text font-small-2 me-25 mb-0">

                </CardText>
            </CardHeader>
            <CardBody className="statistics-body">
            </CardBody>
        </Card>
    )
}

export default Others
