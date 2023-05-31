import React from 'react';
import { Card, Col, FormGroup, Input, Row } from 'reactstrap';
import IncomeChart from '../Chart';

function MemberStatistics() {
  return (
    <Card style={{ minHeight: '100%' }}>
      <IncomeChart />
    </Card>
  );
}

export default MemberStatistics;
