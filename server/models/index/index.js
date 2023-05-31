const Temp = require("../Temp");
const UserToken = require("../UserToken");
const Authenticate = require("../Authenticate");
const Admin = require("../Admin");
const AEmployee = require("../AEmployee");
const User = require("../User");
const UEmployee = require("../UEmployee");
const ClientContact = require("../ClientContact");
const ClientPosition = require("../ClientPosition");
const LeadPosition = require("../LeadPosition");
const VendorPosition = require("../VendorPosition");
const TaskContact = require("../TaskContact");
const Project = require("../Project");
const Task = require("../Tasks");
const Employee = require("../Employee");
const EmployeeContact = require("../EmployeeContact");
const EmployeePosition = require("../EmployeePosition");
const CheckList = require("../CheckList");
const { ScheduleCheckList, ScheduleTask } = require("../CheckListAns");
const ResetPass = require("../resetPass");
const MenuData = require("../MenuData");
const Document = require("../Document");
const DocumentRecipient = require("../DocumentRecipient");
const DocumentFolder = require("../DocumentFolder");
const DocumentSubfolder = require("../DocumentSubfolder");
const DocumentSignature = require("../DocumentSignature");
const Shop = require("../shop");
const Membership = require("../Membership");
const Customer = require("../Customer");
const Invoice = require("../Invoice");
const Product = require("../product");
const Roles = require("../Roles");
// const StripeCustomer = require("./StripeCustomers");
// const Candidate = require("../Candidate");
const Program = require("../Program");
const ProgramRank = require("../ProgramRank");
const CandidateStripe = require("../CandidateStripe");
const MarketingEmail = require("../MarketingEmail");

// NLM
const NLMAdmin = require("../NLMAdmin");

const models = {
  // Client
  Authenticate,
  Admin,
  AEmployee,
  User,
  UEmployee,
  Temp,
  ClientContact,
  ClientPosition,
  LeadPosition,
  VendorPosition,
  UserToken,
  TaskContact,
  Project,
  Task,
  Roles,
  Employee,
  EmployeeContact,
  EmployeePosition,
  CheckList,
  ScheduleCheckList,
  ScheduleTask,
  ResetPass,
  MenuData,
  // NLM Admin
  NLMAdmin,
  Document,
  DocumentRecipient,
  DocumentFolder,
  DocumentSubfolder,
  DocumentSignature,
  Shop,
  Customer,
  Invoice,
  Membership,
  Product,
  // StripeCustomer,
  // Candidate,
  CandidateStripe,
  MarketingEmail,
  Program,
  ProgramRank,
};

module.exports = models;
