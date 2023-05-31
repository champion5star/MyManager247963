import React from 'react'
import { Link, useParams } from 'react-router-dom'

import ContactsTable from './ContactsTable'
import SelectedContactsTable from './SelectedContactsTable'

import {
    Badge,
    Button,
    Col,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from 'reactstrap'

const ContactsModal = (props) => {
    const { contactsModal, setContactsModal, toggle, active } = props
    return (
        <div>
            <Modal
                isOpen={contactsModal}
                className="modal-lg"
                toggle={() => setContactsModal(!contactsModal)}
            >
                <ModalHeader toggle={() => setContactsModal(!contactsModal)}>
                    Select Recipients From Contacts
                </ModalHeader>
                <ModalBody>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                active={active === '1'}
                                onClick={() => {
                                    toggle('1')
                                }}
                            >
                                My Contacts
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === '2'}
                                onClick={() => {
                                    toggle('2')
                                }}
                            >
                                Selected (12)
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent className="py-50" activeTab={active}>
                        <TabPane tabId="1">
                            <Row>
                                <Col md={4}>
                                    <ListGroup
                                        tag="div"
                                        className="list-group-labels"
                                    >
                                        <ListGroupItem
                                            tag={Link}
                                            // to="/apps/email/label/personal"
                                            action
                                        >
                                            <span className="bullet bullet-sm bullet-warning me-1"></span>
                                            Clients
                                            <Badge
                                                className="float-end"
                                                color="light-primary"
                                                pill
                                            >
                                                7878
                                            </Badge>
                                        </ListGroupItem>
                                        <ListGroupItem
                                            tag={Link}
                                            // to="/apps/email/label/company"
                                            action
                                        >
                                            <span className="bullet bullet-sm bullet-primary me-1"></span>
                                            Leads
                                            <Badge
                                                className="float-end"
                                                color="light-primary"
                                                pill
                                            >
                                                234
                                            </Badge>
                                        </ListGroupItem>
                                        <ListGroupItem
                                            tag={Link}
                                            // to="/apps/email/label/important"
                                            action
                                        >
                                            <span className="bullet bullet-sm bullet-success me-1"></span>
                                            Vendors
                                            <Badge
                                                className="float-end"
                                                color="light-primary"
                                                pill
                                            >
                                                38
                                            </Badge>
                                        </ListGroupItem>
                                        <ListGroupItem
                                            tag={Link}
                                            // to="/apps/email/label/private"
                                            action
                                        >
                                            <span className="bullet bullet-sm bullet-danger me-1"></span>
                                            Relationship
                                            <Badge
                                                className="float-end"
                                                color="light-primary"
                                                pill
                                            >
                                                8789
                                            </Badge>
                                        </ListGroupItem>
                                        <ListGroupItem
                                            tag={Link}
                                            // to="/apps/email/label/private"
                                            action
                                        >
                                            <span className="bullet bullet-sm bullet-danger me-1"></span>
                                            Employee
                                            <Badge
                                                className="float-end"
                                                color="light-primary"
                                                pill
                                            >
                                                9
                                            </Badge>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Col>
                                <Col md={8}>
                                    <ContactsTable />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <SelectedContactsTable />
                        </TabPane>
                    </TabContent>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => setContactsModal(!contactsModal)}
                    >
                        Aplly Selected
                    </Button>
                    <Button
                        color="flat-danger"
                        onClick={() => setContactsModal(!contactsModal)}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ContactsModal
