import React from 'react';
import { Col, Row } from 'reactstrap';
import { ComposedChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  {
    name: 'Belt-Red',
    gain: 590,
    loss: 800,
    amt: 1400,
    cnt: 490
  },
  {
    name: 'Black-White',
    gain: 868,
    loss: 967,
    amt: 1506,
    cnt: 590
  },
  {
    name: 'White-Orange',
    gain: 1397,
    loss: 1098,
    amt: 989,
    cnt: 350
  },
  {
    name: 'Yellow',
    gain: 1480,
    loss: 1200,
    amt: 1228,
    cnt: 480
  },
  {
    name: 'Purple',
    gain: 1520,
    loss: 1108,
    amt: 1100,
    cnt: 460
  },
  {
    name: 'Blue-Black',
    gain: 1400,
    loss: 680,
    amt: 1700,
    cnt: 380
  },
  {
    name: 'Green-Black',
    gain: 1400,
    loss: 680,
    amt: 1700,
    cnt: 380
  },
  {
    name: 'White',
    gain: 1400,
    loss: 680,
    amt: 1700,
    cnt: 380
  }
];

export default function App() {
  return (
    <Row>
      {/* <Col md={7}>
                <RankTable />
            </Col> */}
      <Col md={12}>
        <ComposedChart
          layout="vertical"
          width={1000}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 80,
            bottom: 5
          }}
        >
          <XAxis type="number" height={20} />
          <YAxis type="category" dataKey="name" height={40} />
          <Tooltip />
          <Legend />
          <Bar dataKey="gain" barSize={10} fill="#413ea0" />
          <Bar dataKey="loss" barSize={10} fill="red" />
        </ComposedChart>{' '}
      </Col>
    </Row>
  );
}
