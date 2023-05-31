// ** React Imports
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Mail, Send, Edit2, Folder, Trash, Plus } from 'react-feather'

// ** Reactstrap Imports
import {
  ListGroup,
  ListGroupItem,
  Badge,
} from 'reactstrap'
import Addmyforms from './Addmyforms'

const Sidebar = (props) => {
  // ** Props
  const {
    store,
    sidebarOpen,
    toggleCompose,
    dispatch,
    getMails,
    resetSelectedMail,
    setSidebarOpen
  } = props

  const [addFolderHide, setAddFolderHide] = useState(false)

  // ** Vars
  const params = useParams()

  // ** Functions To Handle Folder, Label & Compose
  const handleFolder = (folder) => {
    // dispatch(getMails({ ...store.params, folder }))
    // dispatch(resetSelectedMail())
  }

  const handleNewFolderAdd = () => {
    setAddFolderHide(!addFolderHide)
  }

  const handleLabel = (label) => {
    // dispatch(getMails({ ...store.params, label }))
    // dispatch(resetSelectedMail())
  }



  // ** Functions To Active List Item
  const handleActiveItem = (value) => {
    // if (
    //   (params.folder && params.folder === value) ||
    //   (params.label && params.label === value)
    // ) {
    //   return true
    // } else {
    //   return false
    // }
  }
  return (
    <div
      className={classnames('sidebar-left', {
        show: sidebarOpen
      })}
    ><div className="sidebar">
        <div className="sidebar-content email-app-sidebar">
          <div className="email-app-menu">
            <div className="form-group-compose text-center compose-btn">
              <Addmyforms />
            </div>
            <PerfectScrollbar
              className="sidebar-menu-list"
              options={{ wheelPropagation: false }}
            >
              <ListGroup
                tag="div"
                className="list-group-messages"
              >
                <ListGroupItem
                  // tag={Link}
                  // to="/myforms/inbox"
                  onClick={() => handleFolder('inbox')}
                  action
                  active={
                    !Object.keys(params).length ||
                    handleActiveItem('inbox')
                  }
                >
                  <Mail size={18} className="me-75" />
                  <span className="align-middle">Inbox</span>
                  <Badge
                    className="float-end"
                    color="light-primary"
                    pill
                  >
                    {0}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  // tag={Link}
                  // to="/documents/sent"
                  // onClick={() => handleFolder('sent')}
                  action
                  active={handleActiveItem('sent')}
                >
                  <Send size={18} className="me-75" />
                  <span className="align-middle">Sent</span>
                  <Badge
                    className="float-end"
                    color="light-primary"
                    pill
                  >
                    {0}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  // tag={Link}
                  // to="/documents/draft"
                  // onClick={() => handleFolder('draft')}
                  action
                  active={handleActiveItem('draft')}
                >
                  <Edit2 size={18} className="me-75" />
                  <span className="align-middle">Draft</span>
                  <Badge
                    className="float-end"
                    color="light-primary"
                    pill
                  >
                    {0}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  // tag={Link}
                  // to="/documents/trash"
                  // onClick={() => handleFolder('trash')}
                  action
                  active={handleActiveItem('trash')}
                >
                  <Trash size={18} className="me-75" />
                  <span className="align-middle">Trash</span>
                </ListGroupItem>
              </ListGroup>
              <h6 className="section-label mt-3 mb-1 px-2">
                Status
              </h6>
              <ListGroup tag="div" className="list-group-labels">
                <ListGroupItem
                  // tag={Link}
                  // to="/documents/label/personal"
                  // onClick={() => handleLabel('personal')}
                  active={handleActiveItem('personal')}
                  action
                >
                  <span className="bullet bullet-sm bullet-warning me-1"></span>
                  Waiting
                  <Badge
                    className="float-end"
                    color="light-primary"
                    pill
                  >
                    {0}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  // tag={Link}
                  // to="/documents/label/company"
                  // onClick={() => handleLabel('company')}
                  active={handleActiveItem('company')}
                  action
                >
                  <span className="bullet bullet-sm bullet-primary me-1"></span>
                  Viewed
                </ListGroupItem>
                <ListGroupItem
                  // tag={Link}
                  // to="/documents/label/important"
                  // onClick={() => handleLabel('important')}
                  active={handleActiveItem('important')}
                  action
                >
                  <span className="bullet bullet-sm bullet-success me-1"></span>
                  Completed
                </ListGroupItem>
                <ListGroupItem
                  // tag={Link}
                  // to="/documents/label/private"
                  // onClick={() => handleLabel('private')}
                  active={handleActiveItem('private')}
                  action
                >
                  <span className="bullet bullet-sm bullet-danger me-1"></span>
                  Expired
                </ListGroupItem>
              </ListGroup>
              <div className="mt-3 px-2 d-flex justify-content-between">
                <h6 className="section-label mb-1">Folders</h6>
                <Plus
                  className="cursor-pointer"
                  size={14}
                // onClick={() =>
                //     setAddFolderHide(!addFolderHide)
                // }
                />
              </div>
              <ListGroup tag="div" className="list-group-labels">
                <ListGroupItem
                  // tag={Link}
                  // to="/documents/label/personal"
                  // onClick={() => handleLabel('personal')}
                  active={handleActiveItem('personal')}
                  action
                >
                  <Folder size={18} className="me-75" />
                  <span className="align-middle">
                    Invoices
                  </span>
                </ListGroupItem>
                <ListGroupItem
                  // tag={Link}
                  // to="/documents/label/company"
                  // onClick={() => handleLabel('company')}
                  active={handleActiveItem('company')}
                  action
                >
                  <Folder size={18} className="me-75" />
                  <span className="align-middle">
                    Contracts
                  </span>
                </ListGroupItem>
              </ListGroup>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
