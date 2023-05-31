// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
// ** Icons Imports
import { GiRank2 } from 'react-icons/gi';
import { FiSettings } from 'react-icons/fi';
import { BsUiChecks } from 'react-icons/bs';
import { BsListCheck } from 'react-icons/bs';
import { MdOutlineNotifications } from 'react-icons/md';
import { RiFilePaperLine } from 'react-icons/ri';
import { Code } from 'react-feather';
import { CiCircleList } from 'react-icons/ci';
// ** User Components

import { Col, Row } from 'reactstrap';
import TaskReporting from './tabs/TaskReporting';
import TaskList from './tabs/TaskList';
import TaskBoard from './tabs/TaskBoard';
import TaskManagement from './tabs/TaskManagement';

const TaskAndGoalsTabs = () => {
  const [active, setActive] = useState('1');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <>
      <Row style={{ width: '100%' }}>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
          <Fragment>
            <Nav pills className="mb-2">
              <NavItem>
                <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                  <FiSettings className="font-medium-1 me-50" />
                  <span className="fs-6">Task Reporting</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                  <GiRank2 className="font-medium-1 me-50" />
                  <span className="fs-6">Task List</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                  <BsUiChecks className="font-medium-1 me-50" />
                  <span className="fs-6">Task Board</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                  <BsListCheck className="font-medium-1 me-50" />
                  <span className="fs-6">Task Management</span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={active}>
              <TabPane tabId="1">
                <TaskReporting />
              </TabPane>
              <TabPane tabId="2">
                <TaskList />
              </TabPane>
              <TabPane tabId="3">
                <TaskBoard />
              </TabPane>
              <TabPane tabId="4">
                <TaskManagement />
              </TabPane>
            </TabContent>
          </Fragment>
        </Col>
      </Row>
    </>
  );
};
export default TaskAndGoalsTabs;
