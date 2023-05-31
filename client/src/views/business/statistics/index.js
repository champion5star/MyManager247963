import './style.css';
import { useState } from 'react';
import { NavLink, Col, TabContent, TabPane, Row } from 'reactstrap';
import { MessageCircle, Twitch } from 'react-feather';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Mail } from 'react-feather';
// ** Components imports live chat layout etc

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import MemberStatistics from './statistics/MemberStatistics';
import ProgramStatistics from './statistics/ProgramStatistics';
import LeadStatistics from './statistics/LeadStatistics';
import RankStatistics from './statistics/RankStatistics';

import InputType from './IncomeType';

const Sidebar = (props) => {
  // ** Props
  const { sidebarOpen, setSidebarOpen } = props;
  const [active, setActive] = useState('1');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  return (
    <Row>
      <Col md={3}>
        <div
          className={classnames('sidebar-left', {
            show: sidebarOpen
          })}
        >
          <div className="sidebar">
            <div className="sidebar-content email-app-sidebar">
              <div className="email-app-menu" style={{ margin: '10px 10px 10px 10px' }}>
                <div className="form-group-compose text-center compose-btn">
                  <Button className="compose-email" color="primary" block>
                    Some Action
                  </Button>
                </div>
                <PerfectScrollbar
                  className="sidebar-menu-list mt-1"
                  options={{ wheelPropagation: false }}
                >
                  <ListGroup tag="div" className="list-group-messages">
                    <ListGroupItem
                      tag={NavLink}
                      onClick={() => toggleTab('1')}
                      active={active === '1'}
                    >
                      <Mail size={18} className="me-75" />
                      <span className="align-middle">Member Statistics</span>
                    </ListGroupItem>
                    <ListGroupItem
                      tag={NavLink}
                      onClick={() => toggleTab('2')}
                      active={active === '2'}
                    >
                      <MessageCircle size={18} className="me-75" />
                      <span className="align-middle">Program Statistics</span>
                    </ListGroupItem>
                    <ListGroupItem
                      tag={NavLink}
                      onClick={() => toggleTab('3')}
                      active={active === '3'}
                    >
                      <Twitch size={18} className="me-75" />
                      <span className="align-middle">Lead Statistics</span>
                    </ListGroupItem>
                    <ListGroupItem
                      tag={NavLink}
                      onClick={() => toggleTab('4')}
                      active={active === '4'}
                    >
                      <Twitch size={18} className="me-75" />
                      <span className="align-middle">Rank Statistics</span>
                    </ListGroupItem>
                  </ListGroup>
                </PerfectScrollbar>
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col md={9}>
        <InputType />
        <PerfectScrollbar className="mt-1" style={{ minHeight: '50vh' }}>
          <TabContent activeTab={active}>
            <TabPane tabId="1">
              <MemberStatistics />
            </TabPane>
            <TabPane tabId="2">
              <ProgramStatistics />
            </TabPane>
            <TabPane tabId="3">
              <LeadStatistics />
            </TabPane>
            <TabPane tabId="4">
              <RankStatistics />
            </TabPane>
          </TabContent>
        </PerfectScrollbar>
      </Col>
    </Row>
  );
};

export default Sidebar;
