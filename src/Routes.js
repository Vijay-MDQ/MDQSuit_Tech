import { lazy, useState } from 'react';

// project imports
import { Navigate, useRoutes } from 'react-router-dom'
import React, { Suspense } from 'react'
import Layout from './Layout';
import Pagenotfound from './Components/Pagenotfound';

// ==============================|| Pages ||============================== //

import Login from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import FinacePage from './Pages/FinancePage';
import HRMSpage from './Pages/HRMSpage';
import ProjectsPage from './Pages/FactoryProjectsPage';
import SupportPage from './Pages/SupportPage';
import TaskPage from './Pages/TaskPage';
import AnnouncementPage from './Pages/AnnouncementPage';
import FinancePage from './Pages/FinancePage';

// Finance Page
import PayslipSection from './Components/FinanceComps/PayslipSection';
import PayoutSection from './Components/FinanceComps/PayoutSection';
import Last3PayoutSection from './Components/FinanceComps/Last3PayoutSection';
import IncentiveSection from './Components/FinanceComps/IncentivePageTab/IncentiveSection';
import CTCSection from './Components/FinanceComps/CTCSection';
import Form16Section from './Components/FinanceComps/Form16Ssection';

// HRMS PAGE
import Complaints from './Components/HRMSComps/Complaints/Complaints';
import Hierarchy from './Components/HRMSComps/Hierarchy';
import LeaveApproval from './Components/HRMSComps/LeaveTabPanels/LeaveApproval';
import OnBoard from './Components/HRMSComps/OnBoard';
import Profile from './Components/HRMSComps/Profile';
import ViewLeaves from './Components/HRMSComps/LeaveTabPanels/ViewLeaves';

// Component Section
import EditEmployeeEditForm from './Components/HRMSComps/OnBoardTabPanels/EditEmployeeEditForm';
import SiteProjectsPage from './Pages/SiteProjectPage';
import SiteProjectsEditForm from './Components/SiteProjectComps/SiteProjectsEditForm.jsx';
import SiteProjectsViewForm from './Components/SiteProjectComps/SiteProjectsViewForm';
import ProfileEmployeeDialog from './Components/HRMSComps/ProfileEmployeeView';
import FactoryProjectEditForm from './Components/FactoryProjectComps/FactoryProjectEditForm';
import FactoryProjectViewForm from './Components/FactoryProjectComps/FactoryProjectViewForm';
import PurchaseSection from './Components/FactoryProjectComps/PurchaseSection';
import TaskEditForm from './Components/TaskComps/TaskEditForm';
import TaskViewForm from './Components/TaskComps/TaskViewForm';
import EditEmployeeViewForm from './Components/HRMSComps/OnBoardTabPanels/EditEmployeeViewForm';
import Leaves from './Components/HRMSComps/Leaves';
import ExpensePage from './Pages/ExpensePage';
import FundRequest from './Pages/FundRequest';
import IncentivePage from './Components/FinanceComps/IncentivePage';
import StoreEditViewPage from './Components/FactoryProjectComps/StoreEditViewPage';

// ==============================|| MAIN ROUTING ||============================== //

//this variable is for local development 
export const startUrl = `/`;


// ==============================|| ROUTING RENDER ||============================== //


function Routes() {
    const auth = localStorage.getItem('auth');
    const [successOpen, setsuccessOpen] = useState(false);
    const [successMessage, setsuccessMessage] = useState('');
    const [successStatus, setsuccessStatus] = useState(false);
    const [successColor, setsuccessColor] = useState(false);


    const role = JSON.parse(localStorage.getItem('role'));
    const admin = role === 'Super Admin';


        return useRoutes([
            {
                path: `*`,
                element: <Pagenotfound />
            },
            {
                path: startUrl,
                element: <Login setsuccessOpen={setsuccessOpen} setsuccessMessage={setsuccessMessage} setsuccessStatus={setsuccessStatus} setsuccessColor={setsuccessColor} />
            },
            {
                path: `${startUrl}home`,
                element: auth ? <Layout  successOpen={successOpen} setsuccessOpen={setsuccessOpen} successMessage={successMessage} successStatus={successStatus} successColor={successColor} /> : <Navigate to={startUrl} />,
        
        children: [       
                { path: `${startUrl}home`, element: <HomePage /> },
                { path: `logout`, element: <Navigate to={startUrl} /> },
                { path: `siteproject`, element: <SiteProjectsPage /> },
                { path: `siteproject/editsiteproject`, element: <SiteProjectsEditForm /> },
                { path: `siteproject/viewsiteproject`, element: <SiteProjectsViewForm /> },
                { path: `project`, element: <ProjectsPage /> },
                { path: `project/editFactproject`, element: <FactoryProjectEditForm /> },
                { path: `project/viewFactproject`, element: <FactoryProjectViewForm /> },
                  { path: `project/viewstore`, element: <StoreEditViewPage /> },
                { path: `project/addquote`, element: <PurchaseSection /> },

                { path: `finance`, element: <FinancePage />},
                { path: `finance/payslip`, element: <PayslipSection /> },
                { path: `finance/payout`, element: <PayoutSection /> },
                { path: `finance/incentives`, element: <IncentivePage /> },
                { path: `finance/expense`, element: <ExpensePage /> },

                { path: `task`, element: <TaskPage /> },
                 { path: `task/edittask`, element: <TaskEditForm /> },
                  { path: `task/viewtask`, element: <TaskViewForm /> },

                { path: `HRMS`, element: <HRMSpage /> },
                { path: `HRMS/complaints`, element: <Complaints /> },
                { path: `HRMS/leaves`, element: <Leaves /> },
                { path: `HRMS/onboard`, element: <OnBoard /> },
                { path: `HRMS/onboard/updateemployee`, element: <EditEmployeeEditForm /> },
                { path: `HRMS/onboard/viewemployee`, element: <EditEmployeeViewForm /> },
                { path: `HRMS/profile`, element:  admin ? <Profile /> : <ProfileEmployeeDialog /> },
                { path: `HRMS/hierarchy`, element: <Hierarchy /> },
                { path: `HRMS/last3pay`, element: <Last3PayoutSection /> },
                { path: `HRMS/form16`, element: <Form16Section /> },
                { path: `HRMS/CTC`, element: <CTCSection /> },

                { path: `announcement`, element: <AnnouncementPage /> },
                { path: `finance/fund_request`, element: <FundRequest /> },
        ]},
    ])
     
    }
    
export default Routes

