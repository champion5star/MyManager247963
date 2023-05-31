import React from 'react';
// ** Reactstrap Imports
import { Card, CardHeader, Progress } from 'reactstrap';

// ** Third Party Components
import { ChevronDown } from 'react-feather';
import DataTable from 'react-data-table-component';

// ** Custom Components
import Avatar from '@components/avatar';

// ** User List Component
// import Table from './retentionTable'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather';

// redux
import { useSelector } from 'react-redux';

// ** Styles
import '@styles/react/apps/app-users.scss';

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss';

//**timeline component
import AvatarGroup from '@components/avatar-group';

// ** Reactstrap Imports
import { UncontrolledTooltip } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { CardTitle } from 'reactstrap';
import { CardText } from 'reactstrap';
import { Label, Input } from 'reactstrap';

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import {
  MoreVertical,
  Edit,
  FileText,
  Archive,
  Trash,
  Send,
  Save,
  Info,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  ArrowDownCircle
} from 'react-feather';
import ReactPaginate from 'react-paginate';
const CustomPagination = () => {
  // const count = Math.ceil(clientStore?.contacts?.total / rowsPerPage)
  return (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      pageCount={1}
      activeClassName="active"
      // forcePage={currentPage !== 0 ? currentPage - 1 : 0}
      // onPageChange={(page) => handlePagination(page)}
      pageClassName={'page-item'}
      nextLinkClassName={'page-link'}
      nextClassName={'page-item next'}
      previousClassName={'page-item prev'}
      previousLinkClassName={'page-link'}
      pageLinkClassName={'page-link'}
      containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
    />
  );
};
const avatarGroupArr = [
  {
    imgWidth: 25,
    imgHeight: 25,
    title: 'Progression ',
    placement: 'bottom',
    img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default
  },
  {
    imgWidth: 25,
    imgHeight: 25,
    title: 'Amy Carson',
    placement: 'bottom',
    img: require('@src/assets/images/portrait/small/avatar-s-6.jpg').default
  },
  {
    imgWidth: 25,
    imgHeight: 25,
    title: 'Brandon Miles',
    placement: 'bottom',
    img: require('@src/assets/images/portrait/small/avatar-s-8.jpg').default
  },
  {
    imgWidth: 25,
    imgHeight: 25,
    title: 'Daisy Weber',
    placement: 'bottom',
    img: require('@src/assets/images/portrait/small/avatar-s-7.jpg').default
  },
  {
    imgWidth: 25,
    imgHeight: 25,
    title: 'Jenny Looper',
    placement: 'bottom',
    img: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default
  }
];

const projectsArr = [
  {
    progress: 60,
    hours: '210:30h',
    progressColor: 'info',
    totalTasks: ' Korrie O Crevy',
    subtitle: 'React Project',
    title: ' 1',
    img: require('@src/assets/images/icons/brands/react-label.png').default
  },
  {
    hours: '89h',
    progress: 15,
    totalTasks: ' Korrie O Crevy',
    progressColor: 'danger',
    subtitle: 'UI/UX Project',
    title: ' 2',
    img: require('@src/assets/images/icons/brands/xd-label.png').default
  },
  {
    progress: 90,
    hours: '129:45h',
    totalTasks: ' Korrie O Crevy',
    progressColor: 'success',
    subtitle: 'Vuejs Project',
    title: ' 3',
    img: require('@src/assets/images/icons/brands/vue-label.png').default
  },
  {
    hours: '45h',
    progress: 49,
    totalTasks: ' Korrie O Crevy',
    progressColor: 'warning',
    subtitle: 'iPhone Project',
    title: ' 4',
    img: require('@src/assets/images/icons/brands/sketch-label.png').default
  },

  {
    progress: 73,
    hours: '67:10h',
    totalTasks: ' Korrie O Crevy',
    progressColor: 'info',
    subtitle: 'React Project',
    title: ' 5',
    img: require('@src/assets/images/icons/brands/react-label.png').default
  },
  {
    progress: 81,
    hours: '108:39h',
    totalTasks: ' Korrie O Crevy',
    title: ' 6',
    progressColor: 'success',
    subtitle: 'Crypto Website',
    img: require('@src/assets/images/icons/brands/html-label.png').default
  },
  {
    progress: 78,
    hours: '88:19h',
    totalTasks: ' Korrie O Crevy',
    progressColor: 'success',
    subtitle: 'Vuejs Project',
    title: ' 7',
    img: require('@src/assets/images/icons/brands/vue-label.png').default
  }
];
export const columns = [
  // {
  //   sortable: true,
  //   // minWidth: '30px',
  //   name: 'Stripe Image',
  //   selector: (row) => row.title,
  //   cell: (row) => {
  //     return (
  //       <div className="d-flex justify-content-left align-items-center">
  //         <div className="avatar-wrapper">
  //           <Avatar
  //             className="mx-1"
  //             img={row.img}
  //             alt={row.title}
  //             imgWidth="32"
  //           />
  //         </div>
  //       </div>
  //     )
  //   }
  // },
  {
    name: 'Student',
    // selector: (row) => row.totalTasks
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">
              {/* {row.title} */}
              Korrie O'Crevy
            </span>
          </div>
        </div>
      );
    }
  },
  {
    name: 'Rank',
    selector: (row) => row.title
  },
  {
    name: 'Recommended',
    // minWidth: '150px',
    // selector: (row) => row.progress
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <span className=" mx-3">
              {row.progress}
              {/* Korrie O'Crevy */}
            </span>
          </div>
        </div>
      );
    }
  },
  {
    name: 'Candidate',
    selector: (row) => row.title
  },
  {
    name: 'Stripe',
    selector: (row) => row.title
  },
  {
    name: 'Manage',
    allowOverflow: true,
    cell: () => {
      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pe-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
                <FileText size={15} />
                <span className="align-middle ms-50">Details</span>
              </DropdownItem>
              <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
                <Archive size={15} />
                <span className="align-middle ms-50">Archive</span>
              </DropdownItem>
              <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
                <Trash size={15} />
                <span className="align-middle ms-50">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      );
    }
  },

  {
    name: 'Action',
    allowOverflow: true,
    cell: () => {
      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pe-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
          </UncontrolledDropdown>
        </div>
      );
    }
  }
];
function Retention(props) {
  const { totalEmployeeCount, activeEmployeeCount, internshipEmployeeCount, formerEmployeeCount } =
    useSelector((state) => state.employeeContact);
  const { title, subtitle1, des1, des2, togglemodal } = props;

  return (
    <>
      <div className="d-flex justify-content-around mx-auto">
        <div class="row ">
          <div class="col">
            <Card
              className="mb-1"
              // color="primary"
              outline
              style={{
                width: '16rem'
              }}
            >
              <CardBody>
                <CardTitle tag="h5">This Month</CardTitle>
                <CardText>Join</CardText>
                <CardText>Not Join</CardText>
              </CardBody>
            </Card>
          </div>
          <div class="col">
            <Card
              className="mb-1"
              // color="primary"
              outline
              style={{
                width: '16rem'
              }}
            >
              <CardBody>
                <CardTitle tag="h5">Last Month</CardTitle>
                <CardText>Join</CardText>
                <CardText>Not Join</CardText>
              </CardBody>
            </Card>
          </div>
          <div class="col">
            <Card
              className="mb-1"
              // color="primary"
              outline
              style={{
                width: '16rem'
              }}
            >
              <CardBody>
                <CardTitle tag="h5">New Candidate</CardTitle>
                <CardText>Join</CardText>
                <CardText>Not Join</CardText>
              </CardBody>
            </Card>
          </div>
          <div class="col">
            <Card
              className="mb-1"
              // color="primary"
              outline
              style={{
                width: '16rem'
              }}
            >
              <CardBody>
                <CardTitle tag="h5">This Year</CardTitle>
                <CardText>Join</CardText>
                <CardText>Not Join</CardText>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <CardHeader tag="h4">Candidate Report</CardHeader>

      <div class="d-flex justify-content-between align-items-center pb-1">
        <div>
          <div class=" mx-2">
            <span>
              Join - <strong class="income-amt-coming">0</strong>
            </span>
            <span>
              {' '}
              Not Join - <strong class="income-amt-coming">0</strong>
            </span>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center mx-2 ">
          <div class="">
            <Col>
              <Input id="exampleSelect" name="select" type="select" placeholder="Select Notes">
                <option selected>
                  January
                  {/* <BiUser size={18} className="me-75" /> */}
                </option>
                <option>february</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
              </Input>
            </Col>
          </div>
          <div class="mr-1">
            <Col>
              <Input id="exampleSelect" name="select" type="select" placeholder="Select Notes">
                <option selected>2023</option>
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
                <option>2028</option>
              </Input>
            </Col>
          </div>
          <button class="rounded btn btn-primary text-white customFilterBtn" disabled="">
            Filter
          </button>
        </div>
      </div>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={projectsArr}
          className="react-dataTable"
          pagination
          paginationServer
          paginationComponent={CustomPagination}
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </>
  );
}
export default Retention;
