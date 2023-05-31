// ** Reducers Imports
import navbar from './navbar';
import layout from './layout';
import auth from './authentication';
import todo from '@src/views/apps/todo/store';
import chat from '@src/views/apps/chat/store';
import users from '@src/views/apps/user/store';
import email from '@src/views/apps/email/store';
import invoice from '@src/views/apps/invoice/store';
import calendar from '@src/views/calendar/store';
import kanban from '@src/views/apps/kanban/store';
import ecommerce from '@src/views/apps/ecommerce/store';
import dataTables from '@src/views/tables/data-tables/store';
import permissions from '@src/views/apps/roles-permissions/store';

// custom
import clientContact from '../views/contacts/client/store/reducer';
import employeeContact from '../views/contacts/employee/store/reducer';
import leadContact from '../views/contacts/leads/store/reducer';
import relationshipContact from '../views/contacts/relationship/store/reducer';
import vendorContact from '../views/contacts/vendor/store/reducer';
import event from '../views/calendar/event/store';
import filemanager from '../views/apps/filemanager/store';
import book from '../views/calendar/book/store';

import ticket from '../views/apps/ticket/store';
import tasks from '../views/tasks/store/reducer';
import { EmailMarketing } from '../views/apps/email/store/emailMarketing';

const rootReducer = {
  auth,
  todo,
  chat,
  email,
  users,
  kanban,
  navbar,
  layout,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  permissions,
  clientContact,
  employeeContact,
  leadContact,
  relationshipContact,
  vendorContact,
  tasks,
  filemanager,
  book,
  event,
  ticket,
  EmailMarketing: EmailMarketing
};

export default rootReducer;
