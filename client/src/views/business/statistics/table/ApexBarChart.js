import React from 'react';
import { Col, Row } from 'reactstrap';
import { ComposedChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  {
    name: 'Belt Red',
    uv: 590,
    pv: 800,
    amt: 1400,
    cnt: 490
  },
  {
    name: 'Black White',
    uv: 868,
    pv: 967,
    amt: 1506,
    cnt: 590
  },
  {
    name: 'White-orange',
    uv: 1397,
    pv: 1098,
    amt: 989,
    cnt: 350
  },
  {
    name: 'Page D',
    uv: 1480,
    pv: 1200,
    amt: 1228,
    cnt: 480
  },
  {
    name: 'Page E',
    uv: 1520,
    pv: 1108,
    amt: 1100,
    cnt: 460
  },
  {
    name: 'Page F',
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380
  },
  {
    name: 'Page F',
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380
  }
];

export default function ApexBarChart() {
  return (
    <Row>
      {/* <Col md={7}>
                <RankTable />
            </Col> */}
      <Col md={12}>
        <ComposedChart
          layout="vertical"
          width={400}
          height={400}
          data={data}
          margin={{
            top: 40,
            right: 20,
            bottom: 20,
            left: 20
          }}
        >
          {/* <CartesianGrid stroke="#f5f5f5" /> */}
          <XAxis type="number" height={5} />
          <YAxis type="category" scale="band" height={40} />
          <Tooltip />
          <Legend />
          {/* <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
          <Bar dataKey="pv" barSize={20} fill="#413ea0" />
          {/* <Line dataKey="uv" stroke="#ff7300" /> */}
        </ComposedChart>
      </Col>
    </Row>
  );
}
