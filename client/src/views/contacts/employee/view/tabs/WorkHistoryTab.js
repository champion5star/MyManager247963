// ** React Imports
import { Fragment, useState } from 'react'
import { BsPlayFill, BsStopFill } from 'react-icons/bs'
import Select from 'react-select'

// ** Reactstrap Imports
import { Badge, Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from 'reactstrap'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Charts
import ApexDonutChart from './timedoctor/timedoctorDonutChart'
import WeeklyMinutesCharts from './timedoctor/weekly_minutes_chart'


// ** Custom Components
import TimeDoctorPage from './timedoctor/timedoctor'
import ImageCapture from './timedoctor/imageCapture'

const WorkHistoryTab = () => {
	// **Employee filter options
	const [currentPart, setCurrentPart] = useState({
		value: '',
		label: 'General',
	})

	//** Sort by part (unknown filter)
	const partOptions = [
		{ value: '', label: 'General' },
		{ value: 'meeting', label: 'Meeting' },
		{ value: 'project1', label: 'Project1' },
	]

	return (
		<Fragment>
			<Card>
				<Row className='d-flex p-1 align-items-center justify-content-between'>
					<Col>
						{/* {workStatu === 'isPlay' ? (
							<Button color='warning'>
								CLOCK OUT
								<BsStopFill />
							</Button>
						) : (
							<Button color='success'>
								CLOCK IN
								<BsPlayFill />
							</Button>
						)} */}
						{/* <Button color='success'>
							CLOCK IN
							<BsPlayFill />
						</Button> */}
						<ImageCapture />
					</Col>
					{/* <Col>
					  	<h3 className='d-flex justify-content-center pt-1'>00:00:00</h3>
					</Col> */}
					<Col>
						<Select
							theme={selectThemeColors}
							isClearable={false}
							className="react-select"
							classNamePrefix="select"
							options={partOptions}
							value={currentPart}
							onChange={(data) => {
								setCurrentPart(data)
							}}
						/>
					</Col>
				</Row>
			</Card>
			<Row>
				<Col lg="6" sm="6">
					<Card className='d-flex p-1'>
						<span className='mb-1'>Today</span>
						<div className='d-flex justify-content-between align-items-center'>
							<h3>0 hrs 0 Mins</h3>
							<Button color='info'>View Proof</Button>
						</div>
					</Card>
				</Col>
				<Col lg="6" sm="6">
					<Card className='d-flex p-1'>
						<span className='mb-1'>This Week</span>
						<div className='d-flex justify-content-between align-items-center'>
							<h3>0 hrs 0 Mins</h3>
							<Button color='info'>View Proof</Button>
						</div>
					</Card>
				</Col>
				<Col lg="6" sm="6">
					<Card className='d-flex p-1'>
						<span className='mb-1'>This Month</span>
						<div className='d-flex justify-content-between align-items-center'>
							<h3>0 hrs 0 Mins</h3>
							<Button color='info'>View Proof</Button>
						</div>
					</Card>
				</Col>
				<Col lg="6" sm="6">
					<Card className='d-flex p-1'>
						<span className='mb-1'>Total days worked</span>
						<div className='d-flex justify-content-between align-items-center'>
							<h3>0 days</h3>
							<Button color='info'>View Proof</Button>
						</div>
					</Card>
				</Col>
			</Row>
			<Card className='p-1'>
				<CardHeader>
					<CardTitle>
						<CardTitle tag="h4">Today</CardTitle>
					</CardTitle>
				</CardHeader>
				<CardBody>
					<TimeDoctorPage />
				</CardBody>
			</Card>
			<Row>
				<Col lg="6" sm="6">
					<Card>
						<ApexDonutChart />
					</Card>
				</Col>
				<Col lg="6" sm="6">
					<Card>
						<WeeklyMinutesCharts />
					</Card>
				</Col>
			</Row>
			<Card>
				<Table borderless>
					<thead>
						<tr>
							<th>
								Project Name
							</th>
							<th>
								Start Time
							</th>
							<th>
								End Time
							</th>
							<th>
								Duration
							</th>
							<th>

							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								projectName
							</td>
							<td>
								startTime
							</td>
							<td>
								endTime
							</td>
							<td>
								duration
							</td>
							<td>
								<Badge className="text-primary bg-info bg-opacity-25">View Screenshot</Badge>
							</td>
						</tr>
					</tbody>
				</Table>
			</Card>
		</Fragment>
	)
}

export default WorkHistoryTab