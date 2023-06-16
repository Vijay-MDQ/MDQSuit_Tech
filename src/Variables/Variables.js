import { v1 as uuidv1 } from 'uuid';
import ProjectIcon from '../Assets/Icons/icons8-project-color-96.png';
import AnnounceIcon from '../Assets/Icons/icons8-commercial-color-96.png';
import SupportIcon from '../Assets/Icons/icons8-computer-support-color-96.png';
import FinanceIcon from '../Assets/Icons/icons8-bill-color-96.png';
import HRMSIcon from '../Assets/Icons/icons8-resources-color-96.png';
import TaskIcon from '../Assets/Icons/icons8-task-color-96.png';
import DownloadIcon from '@mui/icons-material/Download';
import ApprovalIcon from '../Assets/Icons/icons8-approval-color-96.png';
import { Box, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';


  const role = JSON.parse(localStorage.getItem('role'));

// Admin View Start

const orderdetails = [
    {
        id: uuidv1(),
        name: 'Order Number',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Customer Name',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Mobile Number'
    },
    {
        id: uuidv1(),
        name: 'Services',
        
    },
    {
        id: uuidv1(),
        name: 'Company Name'
    },
    {
        id: uuidv1(),
        name: 'Project Name'
    },
    {
        id: uuidv1(),
        name: 'Project Description'
    },
    {
        id: uuidv1(),
        name: 'Expected Date'
    },
    {
        id: uuidv1(),
        name: 'Project Budget'
    },
    {
        id: uuidv1(),
        name: 'Project Start Date'
    },
    {
        id: uuidv1(),
        name: 'Project Status'
    }
    
]

const emporderdetails = [
    {
        id: uuidv1(),
        name: 'Order Number',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Assigned Date',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Due Date',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Project Status',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Remarks'
    }
    
]

const expensehead = [
    {
        id: uuidv1(),
        name: 'Employee Name',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Expense Type',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Date',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Amount',
        
    },
    {
        id: uuidv1(),
        name: 'Edit',
       
    },
    {
        id: uuidv1(),
        name: 'Delete',
       
    }
]
const orderstatus = [
    {
        id: uuidv1(),
        name: 'Date',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Product Quantity',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Remarks',
        
    },

    
]


const procuredetails = [
    {
        id: uuidv1(),
        name: ' Name',
        // filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'GST Number',
        // filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Project Cost',
        
    },
    {
        id: uuidv1(),
        name: 'Address',
        // filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Lead Time', 
        // filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Documents', 
        // filter: Boolean(true)
    },
    
]

const procureorder = [
    {
        id: uuidv1(),
        name: 'Status Assigned',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Date',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Due Date',
        
    },
    {
        id: uuidv1(),
        name: 'Status',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Remarks', 
        filter: Boolean(true)
    },
    
]
const productdetails = [
    {
        id: uuidv1(),
        name: 'Product Name',
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Produst Description'
    },
    {
        id: uuidv1(),
        name: 'Product Photos',
        
    },
    {
        id: uuidv1(),
        name: 'Product Quantity'
    },
    {
        id: uuidv1(),
        name: 'Product Quality'
    },
    {
        id: uuidv1(),
        name: 'Product Stock', 
        filter: Boolean(true)
    },
    {
        id: uuidv1(),
        name: 'Product Price'
    },
    {
        id: uuidv1(),
        name: 'Discount Price'
    },
    {
        id: uuidv1(),
        name: 'Edit'
    },
    {
        id: uuidv1(),
        name: 'Delete'
    }
]


const Homepagecardsinfo = [
    {
        Icon:ProjectIcon,
        name:'Site Project',
        path:'siteproject',
    },
    {
        Icon:ProjectIcon,
        name:'Factory Project',
        path:'project',
    },
    {
        Icon: FinanceIcon,
        name:'Finance',
        path:'finance',
    },
    {
        Icon: HRMSIcon,
        name:'HRMS',
        path:'HRMS',
    },
    {
        Icon:TaskIcon,
        name:'Task',
        path:'task',
    },
    {
        Icon:AnnounceIcon,
        name:'Announcement',
        path:'announcement',
    },
]

const financepageControllerView = [
    {
        Icon: HRMSIcon,
        name:'Expense',
        path:'expense',
    },
    {
        Icon:ProjectIcon,
        name:'Payslip',
        path:'payslip',
    },
    {
        Icon: FinanceIcon,
        name:'Incentives',
        path:'incentives',
    },
    {
        Icon: HRMSIcon,
        name:'Payout',
        path:'payout',
    }
    ,
    {
        Icon: HRMSIcon,
        name:'Fund Request',
        path:'fund_request',
    },
]

const financepageEmployeeView = [
    {
        Icon:ProjectIcon,
        name:'Payslip',
        path:'payslip',
    },
    {
        Icon: FinanceIcon,
        name:'Incentives',
        path:'incentives',
    },
    {
        Icon: HRMSIcon,
        name:'Payout',
        path:'payout',
    },
]

const expenseTable = [
    {
        Icon:ProjectIcon,
        name:'Payslip',
        path:'payslip',
    },
    {
        Icon: FinanceIcon,
        name:'Incentives',
        path:'incentives',
    },
    {
        Icon: HRMSIcon,
        name:'Payout',
        path:'payout',
    },
]

const HRMSControllerView = [
        {
        Icon: HRMSIcon,
        name:'Profile',
        path:'profile',
    },
    {
        Icon:TaskIcon,
        name:'Hierarchy',
        path:'hierarchy',
    },
    {
        Icon:SupportIcon,
        name:'Last 3 Payout',
        path:'last3pay',
    },
    {
        Icon:ApprovalIcon,
        name:'Leaves',
        path:'leaves',
    },
    {
        Icon:TaskIcon,
        name:'CTC',
        path:'CTC',
    },
    {
        Icon:AnnounceIcon,
        name:'Form16',
        path:'form16',
    }, 
    {
        Icon:AnnounceIcon,
        name:'OnBoard',
        path:'onboard',
    }, 
    {
        Icon:SupportIcon,
        name:'Complaints',
        path:'complaints',
    },
]

const LeaveApprovaltable = [
    {
        name:'Ajay',
        id:'2901',
        appliedon:'02-02-2023',
        appliedfor:'01-02-2023',
        status:'pending',
        approve:<Button sx={{bgcolor:'#7bc54c', ':hover':{bgcolor:'#616e80'}}}>Approve</Button>,
        reject: <Button sx={{bgcolor:'red', ':hover':{bgcolor:'#616e80'}}}>Reject</Button>,
    },
    {
        name:'Ajay',
        id:'2901',
        appliedon:'02-02-2023',
        appliedfor:'01-02-2023',
        status:'pending',
        approve:<Button sx={{bgcolor:'#7bc54c', ':hover':{bgcolor:'#616e80'}}}>Approve</Button>,
        reject: <Button sx={{bgcolor:'red', ':hover':{bgcolor:'#616e80'}}}>Reject</Button>,
    },
    {
        name:'Ajay',
        id:'2901',
        appliedon:'02-02-2023',
        appliedfor:'01-02-2023',
        status:'pending',
        approve:<Button sx={{bgcolor:'#7bc54c', ':hover':{bgcolor:'#616e80'}}}>Approve</Button>,
        reject: <Button sx={{bgcolor:'red', ':hover':{bgcolor:'#616e80'}}}>Reject</Button>,
    },
    {
        name:'Ajay',
        id:'2901',
        appliedon:'02-02-2023',
        appliedfor:'01-02-2023',
        status:'pending',
        approve:<Button sx={{bgcolor:'#7bc54c', ':hover':{bgcolor:'#616e80'}}}>Approve</Button>,
        reject: <Button sx={{bgcolor:'red', ':hover':{bgcolor:'#616e80'}}}>Reject</Button>,
    },
]

const allProfileTable = [
    {
        name:'Ajay',
        id:'2901',
        join:'02-02-2023',
        status:'Active',
       view:<Button sx={{bgcolor:'#7bc54c', ':hover':{bgcolor:'#616e80'}}}>View</Button>,
    },
    {
        name:'Ajay',
        id:'2901',
        join:'02-02-2023',
        status:'Active',
      view:<Button sx={{bgcolor:'#7bc54c', ':hover':{bgcolor:'#616e80'}}}>View</Button>,
    },
    {
        name:'Ajay',
        id:'2901',
        join:'02-02-2023',
        status:'Active',
       view:<Button sx={{bgcolor:'#7bc54c', ':hover':{bgcolor:'#616e80'}}}>View</Button>,
    },
    {
        name:'Ajay',
        id:'2901',
        join:'02-02-2023',
        status:'Active',
     view:<Button sx={{bgcolor:'#7bc54c', ':hover':{bgcolor:'#616e80'}}}>View</Button>,
    },
]
const allComplaintsTable = [
    {
       
        id:'2901',
        complaint:"Desktop BSOD'ed",
        raised: 2901,
        raisedon :'01-02-2023',
        level:'HIGH',
        status:'completed',
       response:'New screen Provided'
    },
    {
       
        id:'2901',
        complaint:"Desktop BSOD'ed",
        raised: 2901,
        raisedon :'01-02-2023',
        level:'LOW',
        status:'Pending',
       response:'New screen Provided'
    },
    {
       
        id:'2901',
        complaint:"Desktop BSOD'ed",
        raised: 2901,
        raisedon :'01-02-2023',
        level:'Medium',
        status:'completed',
       response:'New screen Provided'
    },
    {
       
        id:'2901',
        complaint:"Desktop BSOD'ed",
        raised: 2901,
        raisedon :'01-02-2023',
        level:'Medium',
        status:'completed',
       response:'New screen Provided'
    },
]

const OnBoardtable = [
    {
        id:'2901',
        fname:'Ajay',
        lname:'kumar',
        joined:'01-02-2023',
        status:'Active',
        view:<VisibilityIcon />,
        edit:<ModeEditIcon />,
    },
    {
        id:'2901',
        fname:'Ajay',
        lname:'kumar',
        joined:'01-02-2023',
        status:'Active',
        view:<VisibilityIcon />,
        edit:<ModeEditIcon />,
    },
    {
        id:'2901',
        fname:'Ajay',
        lname:'kumar',
        joined:'01-02-2023',
        status:'Active',
        view:<VisibilityIcon />,
        edit:<ModeEditIcon />,
    },
    {
        id:'2901',
        fname:'Ajay',
        lname:'kumar',
        joined:'01-02-2023',
        status:'Active',
        view:<VisibilityIcon />,
        edit:<ModeEditIcon />,
    },
    {
        id:'2901',
        fname:'Ajay',
        lname:'kumar',
        joined:'01-02-2023',
           status:'Active',
        view:<VisibilityIcon />,
        edit:<ModeEditIcon />,
    },
]

const OnBoardDeletetable = [
    {
        id:'2901',
        fname:'Ajay',
        lname:'kumar',
        joined:'01-02-2023',
        status:'Active',
        delete:<DeleteIcon />,
    },
    {
        id:'2901',
        fname:'Ajay',
        lname:'kumar',
        joined:'01-02-2023',
        status:'Active',
        delete:<DeleteIcon />,
    },
    {
        id:'2901',
        fname:'Ajay',
        lname:'kumar',
        joined:'01-02-2023',
        status:'Active',
        delete:<DeleteIcon />,
    },
    {
        id:'2901',
        fname:'Ajay',
        lname:'kumar',
        joined:'01-02-2023',
        status:'Active',
        delete:<DeleteIcon />,
    },
    {
        id:'2901',
        fname:'Ajay',
        lname:'kumar',
        joined:'01-02-2023',
        status:'Active',
        delete:<DeleteIcon />,
    },
]

const paysliptable = [
    {
        name:'Ajay',
        id:'2901',
        period:'Feb-2023',
        file:'File',
        Download:<DownloadIcon />
    },
    {
        name:'VJay',
        id:'4901',
        period:'Feb-2023',
        file:'File',
        Download:<DownloadIcon />
    },
    {
        name:'Ajax',
        id:'2961',
        period:'Feb-2023',
        file:'File',
        Download:<DownloadIcon />
    },
    {
        name:'Shell',
        id:'2921',
        period:'Feb-2023',
        file:'File',
        Download:<DownloadIcon />
    },
]

const incentivetable = [
    {
        name:'Ajay',
        id:'2901',
        period:'Feb-2023',
        actual:2500,
        paid:2000
    },
    {
        name:'Ajay',
        id:'2901',
        period:'Feb-2023',
        actual:2500,
        paid:1000
    },
    {
        name:'Ajay',
        id:'2901',
        period:'Feb-2023',
        actual:2500,
        paid:800
    },
    {
        name:'Ajay',
        id:'2901',
        period:'Feb-2023',
        actual:2500,
        paid:1700
    },
]

const ctctable = [
    {
        name:'Ajay',
        id:'2901',
        join:'Feb-2023',
        ctc:250000 ,
        pf:2000,
        gratuity:1000,
        ins:800,
        tax:200,
    },
    {
        name:'Ajay',
        id:'2901',
        join:'Feb-2023',
        ctc:250000 ,
        pf:2000,
        gratuity:1000,
        ins:800,
        tax:200,
    },
    {
        name:'Ajay',
        id:'2901',
        join:'Feb-2023',
        ctc:250000 ,
        pf:2000,
        gratuity:1000,
        ins:800,
        tax:200,
    },
    {
        name:'Ajay',
        id:'2901',
        join:'Feb-2023',
        ctc:250000 ,
        pf:2000,
        gratuity:1000,
        ins:800,
        tax:200,
    },
]

const siteprojectTable =[
    {
     name:'EB-03-SUB-NB/JAN/21/RADIAL ROAD',
     date:'01-12-2023 11:11',
     team:'finance',
     status:'In Progress',
     last:'AK(11-01-2023)',
     view:<VisibilityIcon />,
     edit:<ModeEditIcon />,
    },
        {
     name:'EB-02-SUB-NB/JAN/21/RADIAL ROAD',
     date:'01-12-2023 11:11',
      team:'operations',
     status:'In Progress',
     last:'TK(11-01-2023)',
     view:<VisibilityIcon />,
     edit:<ModeEditIcon />,
    },
        {
     name:'EB-03-SUB-NB/JAN/21/RADIAL ROAD',
     date:'01-12-2023 11:11',
      team:'finance',
     status:'In Progress',
     last:'VK(11-01-2023)',
     view:<VisibilityIcon />,
     edit:<ModeEditIcon />,
    },
        {
     name:'EB-04-SUB-NB/JAN/21/RADIAL ROAD',
     date:'01-12-2023 11:11',
    team:'operations',
     status:'In Progress',
     last:'AK(11-01-2023)',
     view:<VisibilityIcon />,
     edit:<ModeEditIcon />,
    },
        {
     name:'EB-03-SUB-NB/JAN/21/RADIAL ROAD',
     date:'01-12-2023 11:11',
      team:'finance',
     status:'In Progress',
     last:'AK(11-01-2023)',
     view:<VisibilityIcon />,
     edit:<ModeEditIcon />,
    },
]



// Admin View End



// EMployee View Start


const HRMSemployeeView = [
    {
        Icon: HRMSIcon,
        name:'Profile',
        path:'profile',
    },
     {
        Icon:SupportIcon,
        name:'Last 3 Payout',
        path:'last3pay',
    },
    {
        Icon:ApprovalIcon,
        name:'Leaves',
        path:'leaves',
    },
    {
        Icon:AnnounceIcon,
        name:'Form16',
        path:'form16',
    }, 
    {
        Icon:SupportIcon,
        name:'Complaints',
        path:'complaints',
    },
]


const assignedtaskEmpTable = [
    {
    name:'Project1',
    code:'1123',
    members:'Arjun, Vignesh, Vikki',
    deadline:'01-05-2023',
    type:'Project',
    status:'In Progress',
     view:<VisibilityIcon />,
     edit:<ModeEditIcon />,
    },
    {
    name:'Project1',
    code:'1123',
    members:'Arjun, Vignesh, Vikki',
    deadline:'01-05-2023',
    type:'Non-Project',
    status:'In Progress',
     view:<VisibilityIcon />,
     edit:<ModeEditIcon />,
    },
    {
    name:'Project1',
    code:'1123',
    members:'Arjun, Vignesh, Vikki',
    deadline:'01-05-2023',
    type:'Project',
    status:'In Progress',
     view:<VisibilityIcon />,
     edit:<ModeEditIcon />,
    },
    {
    name:'Project1',
    code:'1123',
    members:'Arjun, Vignesh, Vikki',
    deadline:'01-05-2023',
    type:'Non-Project',
    status:'In Progress',
     view:<VisibilityIcon />,
     edit:<ModeEditIcon />,
    },
    {
    name:'Project1',
    code:'1123',
    members:'Arjun, Vignesh, Vikki',
    deadline:'01-05-2023',
    type:'Project',
    status:'In Progress',
     view:<VisibilityIcon />,
     edit:<ModeEditIcon />,
    },
]














const appendData = (data) => {
    const serverData = new FormData()
    for (var key in data) {
        serverData.append(key, data[key]);
    }
    return serverData
}

export { appendData,assignedtaskEmpTable, HRMSemployeeView , financepageEmployeeView,orderdetails,siteprojectTable,OnBoardDeletetable, OnBoardtable,allComplaintsTable,allProfileTable,LeaveApprovaltable,ctctable ,HRMSControllerView,paysliptable,incentivetable,Homepagecardsinfo,financepageControllerView, productdetails, procureorder, procuredetails, orderstatus, expensehead,emporderdetails }