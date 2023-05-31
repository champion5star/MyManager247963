import React, { useContext, useEffect, useState } from 'react';
import { HelpCircle } from 'react-feather';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';
import { DocumentContext } from '../../../utility/context/Document';
import PreviewModal from '../preview/PreviewModal';
import EditRecipients from './menuModals/EditRecipients';
import MessageModal from './menuModals/MessageModal';
import { putAddRecipients } from '../../../requests/documents/create-doc';

export default function PageTitle() {
  const [isOpen, setIsOpen] = useState(true);
  const [previewModal, setPreviewModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [recipientsModal, setRecipientsModal] = useState(false);

  const { url, board, recipients, docMessage } = useContext(DocumentContext);

  const toggle = () => setIsOpen(!isOpen);
  const handlePreviewToggle = () => setPreviewModal(!previewModal);
  const handleMessageToggle = () => setMessageModal(!messageModal);
  const handleRecipientsModal = () => setRecipientsModal(!recipientsModal);
  const handleSaveDoc = () => {
    //update db with data
    let boardPayload = [];
    board.map((b) => {
      boardPayload.push({ ...b, icon: null });
    });

    putAddRecipients(url.id, {
      documentUrl: url.url,
      mymanagerUrl: `https://mymanager.com/document/preview/`,
      recipients: recipients,
      properties: boardPayload,
      docMessage: docMessage
    });

    setIsOpen(false);
  };

  return (
    <div>
      <Navbar full="true" expand="md">
        <NavbarText>Complete with MyManager {url.name}</NavbarText>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink href="#">
                <HelpCircle />
              </NavLink>
            </NavItem>
            <NavItem className="me-1">
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  ACTIONS
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem></DropdownItem>
                  <DropdownItem onClick={handleSaveDoc}>Save & Close</DropdownItem>
                  {/* <DropdownItem>Discard</DropdownItem> */}
                  <DropdownItem divider />
                  <DropdownItem onClick={handleMessageToggle}>Edit Message</DropdownItem>
                  <DropdownItem onClick={handleRecipientsModal}>Edit Recipient</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem>
            <NavItem className="me-1">
              <Button className="btn-outline-primary px-2" onClick={handlePreviewToggle}>
                Preview
              </Button>
            </NavItem>
            <NavItem>
              <NavLink href="#" className="btn-primary rounded-pill px-2">
                View Plans
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <PreviewModal toggle={handlePreviewToggle} open={previewModal} />
      <MessageModal toggle={handleMessageToggle} open={messageModal} />
      <EditRecipients toggle={handleRecipientsModal} open={recipientsModal} />
    </div>
  );
}
