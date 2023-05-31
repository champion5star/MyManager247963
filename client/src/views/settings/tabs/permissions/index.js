// ** React Imports
import { Fragment, useState } from 'react';
// ** Custom Components
import { AiOutlinePlus } from 'react-icons/ai';

// ** User List Component
import DataTable from 'react-data-table-component';
// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  Row,
  Col,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
// ** Styles
// import '@styles/react/apps/app-users.scss'
import '@styles/react/apps/app-kanban.scss';
import Card from './Card';
import Modaldata from './Modaldata';

const Permission = () => {
  const carddata = [
    {
      title: 'Role Type 1',
      date: '01/01/23',
      time: '03:09',
      totalrank: '12',
      type: 'By Stripe',
      rank: '21'
    },
    {
      title: 'User Type 2',
      date: '01/01/23',
      time: '03:09',
      totalrank: '12',
      type: 'By Stripe',
      rank: '21'
    },
    {
      title: 'User Type 3',
      date: '01/01/23',
      time: '03:09',
      totalrank: '12',
      type: 'By Stripe',
      rank: '21'
    },
    {
      title: 'User Type 4',
      date: '01/01/23',
      time: '03:09',
      totalrank: '12',
      type: 'By Stripe',
      rank: '21'
    }
  ];

  const [activecard, setActivecard] = useState('');
  const [tabledata, setTabledata] = useState([]);
  const [itemmodal, setItemmodal] = useState(false);
  const toggleitemmodal = () => setItemmodal(!itemmodal);
  return (
    <>
      <div>
        <Modal isOpen={itemmodal} toggle={toggleitemmodal} size="md">
          <ModalHeader toggle={toggleitemmodal}>Roles</ModalHeader>
          <ModalBody>
            <Modaldata />
          </ModalBody>
          <ModalFooter>
            <Button color="btn btn-outline-danger" onClick={toggleitemmodal}>
              Cancle
            </Button>{' '}
            <Button color="btn btn-primary" onClick={toggleitemmodal}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <Fragment>
        <div className="app-user-list">
          <Row>
            {carddata?.map((item, i) => (
              <>
                <Col lg="4" sm="6">
                  <div
                    className='card border border border-primary'
                    onClick={() => {
                      setActivecard(item?.title);
                      item?.title === 'Teakwondo' ? setTabledata([]) : setTabledata([]);
                    }}
                  >
                    <Card
                      togglemodal={toggleitemmodal}
                      title={item?.title}
                      subtitle1={item?.date}
                      subtitle2={item?.time}
                      des1={item?.rank}
                      des2={item?.type}
                    />
                  </div>
                </Col>
              </>
            ))}
            <Col lg="4" sm="6">
              <div className="card w-100  ">
                <div className="card-body text-center p-5 w-100 ">
                  <button onClick={toggleitemmodal} className="btn btn-primary ">
                    Add New Role
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Fragment>
    </>
  );
};

export default Permission;
