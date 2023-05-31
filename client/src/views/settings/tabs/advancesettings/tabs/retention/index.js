import React, { useState } from 'react';
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Row
} from 'reactstrap';

function Retention() {
  let checkentryarray1 = [];
  let checkentryarray2 = [];
  let checkentryarray3 = [];
  const [a, seta] = useState();
  const checkEntryto1 = (e) => {};
  const checkEntryto2 = (e) => {
    seta(e.target.value);
  };
  const checkEntryto3 = (e) => {
    seta(e.target.value);
  };
  const checkEntryfrom1 = (e) => {
    checkentryarray1.push(e.target.value);
  };
  const checkEntryfrom2 = (e) => {
    seta(e.target.value);
  };
  const checkEntryfrom3 = (e) => {
    seta(e.target.value);
  };

  return (
    <Card className="m-2">
      <CardBody className="rounded-none">
        <CardTitle tag="h5">
          {checkentryarray1?.map((item) => (
            <span>{item}</span>
          ))}
        </CardTitle>
        <CardText>
          <Row>
            <Col md={2}>
              <FormGroup>
                <Label for="secretKey">Color</Label>
                <div className="bg-primary p-2"></div>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="secretKey">From</Label>
                <Input
                  id="secret"
                  max={10}
                  min={1}
                  name="secretKey"
                  placeholder="From"
                  onChange={checkEntryfrom1}
                  type="range"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="secretKey">To</Label>
                <Input
                  id="secret"
                  name="secretKey"
                  disabled={true}
                  placeholder="to"
                  onChange={checkEntryto1}
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <FormGroup>
                <Label for="secretKey">Color</Label>
                <div className="bg-primary p-2"></div>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="secretKey">From</Label>
                <Input
                  id="secret"
                  name="secretKey"
                  placeholder="from"
                  type="text"
                  onChange={checkEntryfrom2}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="secretKey">To</Label>
                <Input
                  id="secret"
                  name="secretKey"
                  onChange={checkEntryto2}
                  placeholder="to"
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <FormGroup>
                <Label for="secretKey">Color</Label>
                <div className="bg-primary p-2"></div>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="secretKey">From</Label>
                <Input
                  id="secret"
                  name="secretKey"
                  placeholder="from"
                  onChange={checkEntryfrom3}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="secretKey">To</Label>
                <Input
                  id="secret"
                  name="secretKey"
                  onChange={checkEntryto3}
                  placeholder="to"
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <Button>Update</Button>
          </div>
        </CardText>
      </CardBody>
    </Card>
  );
}

export default Retention;
