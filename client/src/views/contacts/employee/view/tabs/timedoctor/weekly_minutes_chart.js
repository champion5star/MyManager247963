// ** Third Party Components
import { Bar } from 'react-chartjs-2'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const WeeklyMinutesCharts = ({ success, gridLineColor, labelColor }) => {
	success = '#039BE5'
	// ** Chart Options
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		animation: { duration: 500 },
		scales: {
			x: {
				grid: {
					color: gridLineColor,
					borderColor: gridLineColor
				},
				ticks: { color: labelColor }
			},
			y: {
				min: 0,
				max: 400,
				grid: {
					color: gridLineColor,
					borderColor: gridLineColor
				},
				ticks: {
					stepSize: 100,
					color: labelColor
				}
			}
		},
		plugins: {
			legend: { display: false }
		}
	}

	// ** Chart data
	const data = {
		labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		datasets: [
			{
				maxBarThickness: 15,
				backgroundColor: success,
				borderColor: 'transparent',
				borderRadius: { topRight: 15, topLeft: 15 },
				data: [10, 90, 30, 20, 125, 85, 0]
			}
		]
	}

	return (
		<Card>
			<CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
				<CardTitle tag='h5'>Weekly minutes tracked</CardTitle>
			</CardHeader>
			<CardBody>
				<div style={{ height: '300px' }}>
					<Bar data={data} options={options} height={300} />
				</div>
			</CardBody>
		</Card>
	)
}

export default WeeklyMinutesCharts

