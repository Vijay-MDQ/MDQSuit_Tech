// this is for common path for api

// this is for development server 
const baseApiurl = `https://mdqapps.tech/mdq_cms_api/`;
 
//product image path for production server
// const productpath = `https://mdqualityapps.in/igreen/products/`;

// this api is for development purpose
//  const baseApiurl = `https://mdqualityapps.in/igreen/UAT/`;

//product image path
 const productpath = `https://mdqualityapps.in/API/igreen_cms/UAT/products/`;

// get method
const methodGet = 'GET';

// post method
const methodPost = 'POST';

//Add Customer Details and project details
const add_factory_project = `${baseApiurl}add_factory_project`;

//get order Details
const getorderdetails = `${baseApiurl}getallproject`;

//get Product Details
const getproductdetails = `${baseApiurl}getallproduct`;

//Login api
const login = `${baseApiurl}login`;

// add products
const addproduct = `${baseApiurl}addproduct`;

// delete products
const deleteproduct = `${baseApiurl}deleteproduct`;

//get single project

const getsingleproject = `${baseApiurl}getproject`;

//edit product

const editproduct = `${baseApiurl}updateproduct`;

//get product
const getproduct =  `${baseApiurl}getproduct`;

//update Assigned projects
const updateassignedproject =  `${baseApiurl}updateassignedproject`;

//assign project
const assignproject = `${baseApiurl}assignproject`;

//add vendor
const addvendor = `${baseApiurl}addvendor`;

//Procurement
const procurement = `${baseApiurl}addquotation`;

//get assigned orders
const getassignedorders = `${baseApiurl}getassignedproject`;

//get assigned orders
const addexpense = `${baseApiurl}addexpense`;

//get assigned orders
const deleteexpense = `${baseApiurl}deleteexpense`;

//get assigned orders
const getallexpense = `${baseApiurl}getallexpense`;


//get assigned orders
const updateexpense = `${baseApiurl}updateexpense`;


//get assigned orders
const getexpense = `${baseApiurl}getexpense`;

const siteClient = `${baseApiurl}get_client`;

const siteState = `${baseApiurl}get_state`;

const siteDistrict = `${baseApiurl}get_district`;

const create_project_code = `${baseApiurl}create_project_code`;

const factorydepartment = `${baseApiurl}factorydepartment`;

const get_factory_employees = `${baseApiurl}get_factory_employees`;

const get_all_factory_project = `${baseApiurl}get_all_factory_project`;

const update_factory_project = `${baseApiurl}update_factory_project`;

const apply_leave = `${baseApiurl}apply_leave`;

const get_user_leave = `${baseApiurl}get_user_leave`;

const getall_applied_leave = `${baseApiurl}getall_applied_leave`;

const update_tender_details = `${baseApiurl}update_tender_details`;

const getAllSiteProject = `${baseApiurl}getAllSiteProject`;

const updateSiteProject = `${baseApiurl}update_site_project`;

const getParticularSiteProject = `${baseApiurl}getParticularSiteProject`;

const getFlowOfBill =  `${baseApiurl}getFlowOfBill`;

const getDeduction = `${baseApiurl}getDeduction`;

const get_all_fuel_expense = `${baseApiurl}get_all_fuel_expense`;

const get_all_accommodation_expense = `${baseApiurl}get_all_accommodation_expense`;

const get_all_rental_expense =`${baseApiurl}get_all_rental_expense`;

const get_all_travel_expense =  `${baseApiurl}get_all_travel_expense`;

const get_all_transport_expense = `${baseApiurl}get_all_transport_expense`;

const get_all_food_expense = `${baseApiurl}get_all_food_expense`;

const get_all_maintenance_expense = `${baseApiurl}get_all_maintenance_expense`;

const get_all_general_expense =  `${baseApiurl}get_all_general_expense`;

const get_all_wages_expense =  `${baseApiurl}get_all_wages_expense`;

const get_all_purchases_expense =  `${baseApiurl}get_all_purchases_expense`;

const get_all_utilization_expense = `${baseApiurl}get_all_utilization_expense`;

const get_all_others_expense = `${baseApiurl}get_all_others_expense`;

const approve_leave = `${baseApiurl}approve_leave`;

const get_all_pending_leaves = `${baseApiurl}get_all_pending_leaves`;

const reject_leave = `${baseApiurl}reject_leave`;

const get_all_view_leaves = `${baseApiurl}get_all_view_leaves`;

const signup = `${baseApiurl}signup`;

const add_employee_details = `${baseApiurl}add_employee_details`;

const get_department = `${baseApiurl}get_department`;

const get_employee_detail = `${baseApiurl}get_employee_detail`;

const get_all_escalation = `${baseApiurl}get_all_escalation`;

const escalation_approval = `${baseApiurl}escalation_approval`;

const get_employee_id = `${baseApiurl}get_employee_id`;

const getTask = `${baseApiurl}getTask`;

const insertTask = `${baseApiurl}insertTask`;

const getAllEmployeeName = `${baseApiurl}getAllEmployeeName`;

const update_task_details = `${baseApiurl}update_task_details`;

const getParticularTask = `${baseApiurl}getParticularTask`;

const add_announcement = `${baseApiurl}add_announcement`;

const getallannouncement = `${baseApiurl}getall_message`;

const getAllFundRequest = `${baseApiurl}getAllFundRequest`;

const getPendingFundRequest = `${baseApiurl}getPendingFundRequest`;

const approve_notify = `${baseApiurl}approve_notify`;

const reject_notify =  `${baseApiurl}reject_notify`;

const add_employee_salary = `${baseApiurl}add_employee_salary`;

const add_incentives =  `${baseApiurl}add_incentives`;

const add_deductions =  `${baseApiurl}add_deductions`;

const get_all_ctc = `${baseApiurl}get_all_ctc`;

const get_expense_summary = `${baseApiurl}get_expense_summary`;

const get_employee_name = `${baseApiurl}get_employee_name`;

const addincentives = `${baseApiurl}addincentives`;

const get_available_balance = `${baseApiurl}get_available_balance`;

const add_amount = `${baseApiurl}add_amount`;

const get_factory_project= `${baseApiurl}get_factory_project`;

const get_employee_pay_slip = `${baseApiurl}get_employee_pay_slip`;

const get_project_manager = `${baseApiurl}get_project_manager`;

const add_raw_material_availability = `${baseApiurl}add_raw_material_availability`;

const get_project_for_purchase = `${baseApiurl}get_project_for_purchase`;

const add_purchase_quotation = `${baseApiurl}add_purchase_quotation`;

const get_project_for_store = `${baseApiurl}get_project_for_store`;

export {
  methodGet,
  get_factory_project,
  get_project_for_store,
  add_purchase_quotation,
  get_project_for_purchase,
  add_raw_material_availability,
  get_employee_pay_slip,
  get_project_manager,
  add_amount,
  addincentives,
  get_available_balance,
  siteClient,
  get_all_ctc,
  getFlowOfBill,
  reject_notify,
  get_employee_name,
  add_incentives,
  get_expense_summary,
  add_deductions,
  add_employee_salary,
  getAllEmployeeName,
  getParticularTask,
  update_task_details,
  insertTask,
  getTask,
  get_employee_id,
  escalation_approval,
  get_all_escalation,
  get_employee_detail,
  get_department,
  add_employee_details,
  signup,
  get_all_view_leaves,
  reject_leave,
  get_all_food_expense,
  get_all_pending_leaves,
  approve_leave ,
  get_all_utilization_expense,
  get_all_others_expense,
  get_all_purchases_expense,
  get_all_wages_expense,
  get_all_general_expense,
  get_all_maintenance_expense,
  get_all_transport_expense,
  get_all_travel_expense,
  get_all_rental_expense,
  get_all_accommodation_expense,
  getDeduction,
  get_all_fuel_expense,
  update_tender_details,
  getParticularSiteProject,
  updateSiteProject,
  create_project_code,
  siteState,
  getAllSiteProject,
  factorydepartment,
  siteDistrict,
  methodPost,
  get_user_leave,
  getall_applied_leave,
  apply_leave,
  update_factory_project,
  login,
  get_factory_employees,
  get_all_factory_project,
  add_factory_project,
  getorderdetails,
  getproductdetails,
  baseApiurl,
  productpath,
  addproduct,
  getsingleproject,
  editproduct,
  getproduct,
  updateassignedproject,
  assignproject,
  addvendor,
  procurement,
  getassignedorders,
  deleteproduct,
  addexpense,
  deleteexpense,
  getallexpense,
  updateexpense,
  getexpense,
  add_announcement,
  getallannouncement,
  getAllFundRequest,
  getPendingFundRequest,
  approve_notify
};
