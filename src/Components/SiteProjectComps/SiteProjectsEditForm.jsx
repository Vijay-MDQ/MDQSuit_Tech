import React, { useEffect, useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Autocomplete, Table, TableContainer, TablePagination, TableCell, TableBody, TableRow, TableHead} from "@mui/material";
import { useForm } from 'react-hook-form';
import { add_factory_project, getDeduction, getFlowOfBill, getParticularSiteProject, methodGet, methodPost, updateSiteProject } from '../../API_Service/API_Links';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { appendData } from '../../Variables/Variables';
import SnackBar from '../SnackBar';
import { useLocation, useNavigate } from 'react-router-dom';
import IconBreadcrumbs from '../Breadcrumbs';
import Heading from '../Heading';
import SiteProjectBillChatDialog from './SiteProjectBillChatDialog';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';

export default function SiteProjectsViewForm() {


    const options = ['Factory', 'Field'];

    const { formState: { errors }, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const empID = JSON.parse(localStorage.getItem('EmployeeId'));
     const empName = JSON.parse(localStorage.getItem('user'));
    const location = useLocation();
    const ProjectCode = location.state.projectCode;
    const SiteProjectId = location.state.SiteProjectId;
    const [currentProjectData, setcurrentProjectData] = useState([]);
    const [FlowBillList , setFlowBillList] = useState([]);
    const [ deductionTypeOptions, setdeductionTypeOptions] = useState([]);

    // FILEDVALUE STATE
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [projectType,setSelectedProjectType] = useState(""); 
    const [siteProjectId, setsiteProjectId] = useState('');
    const [selectedArea , setSelectedArea] = useState("");
    const [districtList, setDistrictList]= useState([]);
    const [client , setClient] = useState([]);
    const [state, setState] = useState([]);



    // CRAETING NEW PROJECT STATES
    const [selectedTenderType,setSelectedTenderType] = useState('');
    const [tenderSpecRemarkText, setTenderSpecRemarkText] = useState('');
    const [tenderSpecDocument, setTenderSpecDocument] = useState('');
    const [openingDateRemarkText, setOpeningDateRemarkText] = useState('');
    const [openingDate , setOpeningDate] = useState('');
    const [closingDateRemarkText, setClosingDateRemarkText] = useState('');
    const [closingDate , setClosingDate] = useState('');
    const [BQRRemarkText, setBQRRemarkText] = useState('');
    const [BQRDocument, setBQRDocument] = useState('');
    const [EMDExemptionRemarkText, setEMDExemptionRemarkText] = useState('');
    const [EMDExemptionDocument, setEMDExemptionDocument] = useState('');
    const [TenderLostRemarkText, setTenderLostRemarkText] = useState('');
    const [SelectedTenderLost, setSelectedTenderLost] = useState('');
    const [TenderLostCompetitorName, setTenderLostCompetitorName] = useState('');
    const [TenderLostAmount, setTenderLostAmount] = useState('');
    const [BillDeductionRemarkText, setBillDeductionRemarkText] = useState('');
    const [BillDeductionDocument, setBillDeductionDocument] = useState('');
    const [BOQRemarkText, setBOQRemarkText] = useState('');
    const [BOQDocument, setBOQDocument] = useState('');
    const [ProjectDetailsRemarkText, setProjectDetailsRemarkText] = useState('');
    const [ProjectDetailsDocument, setProjectDetailsDocument] = useState('');
    const [LOARemarkText, setLOARemarkText] = useState('');
    const [LOADocument, setLOADocument] = useState('');
    const [ProfileDrawingRemarkText, setProfileDrawingRemarkText] = useState('');
    const [ProfileDrawing, setProfileDrawing] = useState('');
    const [AgreementRemarkText, setAgreementRemarkText] = useState('');
    const [AgreementDocument, setAgreementDocument] = useState('');  
    const [SupplyofMaterialRemarkText, setSupplyofMaterialRemarkText] = useState('');
    const [SupplyofMaterialDocument, setSupplyofMaterialDocument] = useState('');  
    const [SubContract, setSubContract] = useState('');  
    const [SubContractNameRemarkText, setSubContractNameRemarkText] = useState('');  
    const [SubContractName, setSubContractName] = useState('');  
    const [SubContractOrderRemarkText, setSubContractOrderRemarkText] = useState('');  
    const [SubContractOrder, setSubContractOrder] = useState('');  
    const [ScopeOfWorkRemarkText, setScopeOfWorkRemarkText] = useState('');  
    const [ScopeOfWork, setScopeOfWork] = useState(''); 
    const [OurScopeOfWorkRemarkText, setOurScopeOfWorkRemarkText] = useState('');  
    const [OurScopeOfWork, setOurScopeOfWork] = useState(''); 
    const [OwnMachineOrSubRemarkText, setOwnMachineOrSubRemarkText] = useState(''); 
    const [SelectedOwnMachineOrSub, setSelectedOwnMachineOrSub] = useState(''); 
    const [BillingDetailsRemarkText, setBillingDetailsRemarkText] = useState('');
    const [BillingDetailsDocument, setBillingDetailsDocument] = useState('');
    const [FlowOfBillsRemarkText, setFlowOfBillsRemarkText] = useState('');
    const [FlowOfBills, setFlowOfBills] = useState('');
    const [SelectedFlowOfBills, setSelectedFlowOfBills] = useState('');
    const [PaymentsRemarkText, setPaymentsRemarkText] = useState('');
    const [PaymentsReceived, setPaymentsReceived] = useState('');
    const [SelectedDeductionType, setSelectedDeductionType] = useState('');
    const [deductedAmount , setDeductedAmount] = useState('');
    const [SDRetentionDateRemarkText, setSDRetentionDateRemarkText] = useState('');
    const [SDRetentionDate, setSDRetentionDate] = useState('');
    const [SDRetentionAmount, setSDRetentionAmount] = useState('');
    const [EMDRetentionDateRemarkText, setEMDRetentionDateRemarkText] = useState('');
    const [EMDRetentionDate, setEMDRetentionDate] = useState('');
    const [EMDRetentionAmount, setEMDRetentionAmount] = useState('');
    const [OtherRetentionDateRemarkText, setOtherRetentionDateRemarkText] = useState('');
    const [OtherRetentionDate, setOtherRetentionDate] = useState('');
    const [OtherRetentionAmount, setOtherRetentionAmount] = useState('');
    const [AllDeduction, setAllDeduction] = useState([]);
    const [lastUpdatedEmployeeID, setlastUpdatedEmployeeID] = useState('');
    const [lastUpdatedDate , setlastUpdatedDate] = useState('');
    const[lastUpdatedEmployeeName, setlastUpdatedEmployeeName] = useState('');
    // checkBoxes

    const[HDD, setHDD] = useState('');
    const[escavatorsSmall,setescavatorsSmall]= useState('');
    const[hydraSmall,sethydraSmall]= useState('');
    const[hydraBig,sethydraBig]= useState('');
    const[Generator,setGenerator]= useState('');
    const[weldingMachine,setweldingMachine]= useState('');
    const[grindingMachine,setgrindingMachine]= useState('');
    const[Clamp,setClamp]= useState('');
    const[rollersSmall,setrollersSmall]= useState('');
    const[rollersBig,setrollersBig]= useState('');
    const[ Cradels,setCradels]= useState('');
    const[drumStands,setdrumStands]= useState('');
    const[ winchMachine,setwinchMachine]= useState('');
    const[ manPower,setmanPower]= useState('');

        // GET Current Project
           useEffect(() => {
            const serverData = new FormData()
            serverData.append('SiteProjectId', SiteProjectId);
            axios({
                method: 'POST',
                url: getParticularSiteProject,
                data:serverData
            }).then(res => {
                if (res.data.error) {
                    setMessage(res.data.message)
                    setOpen(true)
                    setStatus(false)
                    setColor(false)
                } else {
                    setMessage(res.data.message)
                    setcurrentProjectData(res.data.data);                    
                    setSelectedTenderType(res.data.data.TenderType);
                    setTenderSpecRemarkText(res.data.data.TenderSpecRemarks);
                    setTenderSpecDocument(res.data.data.TenderSpecFile);
                    setOpeningDateRemarkText(res.data.data.OpeningDateRemarks);
                    setOpeningDate(res.data.data.OpeningDate);
                    setClosingDateRemarkText(res.data.data.ClosingDateRemarks);
                    setClosingDate(res.data.data.closingDate);
                    setBQRRemarkText(res.data.data.bqrRemarks);
                    setBQRDocument(res.data.data.bqrFile);
                    setEMDExemptionRemarkText(res.data.data.emdExemptionRemarks);
                    setEMDExemptionDocument(res.data.data.emdExemptionFile);
                    setTenderLostRemarkText(res.data.data.tenderLostRemarks);
                    setSelectedTenderLost(res.data.data.tenderLost);
                    setTenderLostCompetitorName(res.data.data.opponentCompany);
                    setTenderLostAmount(res.data.data.amount);
                    setBillDeductionRemarkText(res.data.data.billDeductionRemarks);
                    setBillDeductionDocument(res.data.data.billDeductionFile);
                    setBOQRemarkText(res.data.data.boqRemarks);
                    setBOQDocument(res.data.data.boqFile);
                    setProjectDetailsRemarkText(res.data.projectDetailsRemarks);
                    setProjectDetailsDocument(res.data.data.projectDetailsFile);
                    setLOARemarkText(res.data.data.workOrderRemarks);
                    setLOADocument(res.data.data.workOrderFile);
                    setProfileDrawingRemarkText(res.data.data.profileDrawingRemarks);
                    setProfileDrawing(res.data.data.profileDrawing);
                    setAgreementRemarkText(res.data.data.agreementRemarks);
                    setAgreementDocument(res.data.data.agreementFile);
                    setSupplyofMaterialRemarkText(res.data.data.budgetRemarks);
                    setSupplyofMaterialDocument(res.data.data.budgetFile);
                    setSubContract(res.data.data.subcontract);
                    setSubContractNameRemarkText(res.data.data.subcontractNameRemarks);
                    setSubContractName(res.data.data.subcontractName);
                    setSubContractOrderRemarkText(res.data.data.subcontractOrderRemarks);
                    setSubContractOrder(res.data.data.subcontractOrder);
                    setScopeOfWorkRemarkText(res.data.data.subcontractScopeWorkRemarks);
                    setScopeOfWork(res.data.data.subcontractScopeWork);
                    setOurScopeOfWorkRemarkText(res.data.data.ourWork);
                    setOurScopeOfWork(res.data.data.ourWorkRemarks);
                    setOwnMachineOrSubRemarkText(res.data.data.machineOrSubcontractRemark);
                    setSelectedOwnMachineOrSub(res.data.data.machineOrSubcontract);
                    setBillingDetailsRemarkText(res.data.data.billingRemarks);
                    setBillingDetailsDocument(res.data.data.billingFile);
                    setFlowOfBillsRemarkText(res.data.data.flowBillsRemarks);
                    setSelectedFlowOfBills(res.data.data.flowBills);
                    setPaymentsRemarkText(res.data.data.paymentReceivedRemarks);
                    setPaymentsReceived(res.data.data.paymentReceived);
                    setSelectedDeductionType(res.data.data.deductionType);
                    setDeductedAmount(res.data.data.deductedAmount);
                    setSDRetentionDateRemarkText(res.data.data.sdRetentionRemarks);
                    setSDRetentionDate(res.data.data.sdRetentionDate);
                    setSDRetentionAmount(res.data.data.sdAmount);
                    setEMDRetentionDateRemarkText(res.data.data.emdRetentionRemarks);
                    setEMDRetentionDate(res.data.data.emdRetentionDate);
                    setEMDRetentionAmount(res.data.data.emdAmount);
                    setOtherRetentionDateRemarkText(res.data.data.otherRetentionRemarks);
                    setOtherRetentionDate(res.data.data.otherRetentionDate);
                    setOtherRetentionAmount(res.data.data.otherAmount);
                    setHDD(res.data.data.hdd);             
                    setescavatorsSmall(res.data.data.escavatorsSmall);              
                    sethydraSmall(res.data.data.hydraSmall);              
                    sethydraBig(res.data.data.hydraBig);  
                    setGenerator(res.data.data.generator);  
                    setweldingMachine(res.data.data.weldingMachine);             
                    setgrindingMachine(res.data.data.grindingMachine);             
                    setClamp(res.data.data.clamp);             
                    setrollersSmall(res.data.data.rollersSmall);            
                    setrollersBig(res.data.data.rollersBig);             
                    setCradels(res.data.data.cradels);            
                    setdrumStands(res.data.data.drumStands);             
                    setwinchMachine(res.data.data.winchMachine);            
                    setmanPower(res.data.data.manPower);  
                    setlastUpdatedEmployeeName(res.data.data.lastUpdatedEmployeeName)
                    setlastUpdatedEmployeeID(res.data.data.lastUpdatedEmployeeID)
                    setlastUpdatedDate(res.data.data.lastUpdatedDate)
                    setAllDeduction(res.data.data.deduction)
                    setOpen(true)
                    setStatus(true)
                    setColor(true)
                }
            }).catch(err => {
                alert('Oops something went wrong ' + err)
            });
    }, [])


const removeDeduction = (type) =>{
    const updatedDeductions = AllDeduction.filter(deduction => deduction.deductionType !== type);
    setAllDeduction(updatedDeductions)
}


    // GET FLOW OF BILLS
        useEffect(() => {
            axios({
                method: methodGet,
                url: getFlowOfBill,
            }).then(res => {
                if (res.data.error) {
                    setMessage(res.data.message)
                    setOpen(true)
                    setStatus(false)
                    setColor(false)
                } else {
                    setMessage(res.data.message)
                    setFlowBillList(res.data.data)
                    setOpen(true)
                    setStatus(true)
                    setColor(true)

                }
            }).catch(err => {
                alert('Oops something went wrong ' + err)
            });
    }, [])

// GET DEDUCTION LIST
        useEffect(() => {
            axios({
                method: methodGet,
                url: getDeduction,
            }).then(res => {
                if (res.data.error) {
                    setMessage(res.data.message)
                    setOpen(true)
                    setStatus(false)
                    setColor(false)
                } else {
                    setMessage(res.data.message)
                    setdeductionTypeOptions(res.data.data)
                    setOpen(true)
                    setStatus(true)
                    setColor(true)

                }
            }).catch(err => {
                alert('Oops something went wrong ' + err)
            });
    }, [])

    const FlowBillOptions = FlowBillList.map((i)=>i.flowOfBill);
    const DeductionOptions = deductionTypeOptions.map((i)=>i.deductionName);

     const StoredSelectedDeduction = () =>{
      const newObject = {siteProjectId:SiteProjectId, deductionType: SelectedDeductionType , deductionAmount: deductedAmount};
       setAllDeduction([...AllDeduction , newObject]);
       setSelectedDeductionType('');
       setDeductedAmount('');
     }


    const serverData = {
    EmployeeId:empID,
    EmployeeName:empName,
    SiteProjectId:SiteProjectId,
    TenderType:selectedTenderType,
    TenderSpecRemarks:tenderSpecRemarkText,
    TenderSpecFile:tenderSpecDocument,
    OpeningDateRemarks:openingDateRemarkText,
    ClosingDateRemarks:closingDateRemarkText,
    ClosingDate:closingDate,
    OpeningDate:openingDate,
    bqrRemarks:BQRRemarkText,
    emdExemptionRemarks:EMDExemptionRemarkText,
    emdExemptionFile: EMDExemptionDocument,
    tenderLost:SelectedTenderLost,
    tenderLostRemarks:TenderLostRemarkText,
    amount:TenderLostAmount,
    opponentCompany:TenderLostCompetitorName,
    billDeductionRemarks:BillDeductionRemarkText,
    billDeductionFile: BillDeductionDocument,
    boqRemarks: BOQRemarkText,
    boqFile:BOQDocument,
    projectDetailsRemarks:ProjectDetailsRemarkText,
    projectDetailsFile: ProjectDetailsDocument,
    workOrderRemarks: LOARemarkText,
    workOrderFile:LOADocument,
    profileDrawing:ProfileDrawing,
    profileDrawingRemarks:ProfileDrawingRemarkText,
    agreementRemarks:AgreementRemarkText,
    agreementFile:AgreementDocument,
    budgetRemarks:SupplyofMaterialRemarkText,
    budgetFile:SupplyofMaterialDocument,
    subcontract:SubContract,
    subcontractName:SubContractName,
    subcontractNameRemarks:SubContractNameRemarkText,
    subcontractWork:SubContractOrder,
    subcontractWorkRemarks:SubContractOrderRemarkText,
    subcontractScopeWork: ScopeOfWork,
    subcontractScopeWorkRemarks:ScopeOfWorkRemarkText,
    ourWork:OurScopeOfWork,
    ourWorkRemarks:OurScopeOfWorkRemarkText,
    machineOrSubcontract:SelectedOwnMachineOrSub,
    machineOrSubcontractRemark:OwnMachineOrSubRemarkText,
    billingRemarks:BillingDetailsRemarkText,
    billingFile:BillingDetailsDocument,
    flowBillsRemarks:FlowOfBillsRemarkText,
    flowBills:SelectedFlowOfBills,
    paymentReceived:PaymentsReceived,
    paymentReceivedRemarks:PaymentsRemarkText,
    HDD:HDD,
    escavatorsSmall:escavatorsSmall,
    hydraSmall:hydraSmall,
    hydraBig:hydraBig,
    Generator:Generator,
    weldingMachine:weldingMachine,
    grindingMachine:grindingMachine,
    Clamp:Clamp,
    rollersSmall:rollersSmall,
    rollersBig:rollersBig,
    Cradels:Cradels,
    drumStands:drumStands,
    winchMachine:winchMachine,
    manPower:manPower,
    emdRetentionDate:EMDRetentionDate,
    emdRetentionRemarks:EMDExemptionRemarkText,
    emdAmount:EMDRetentionAmount,
    sdRetentionDate:SDRetentionDate,
    sdRetentionRemarks:SDRetentionDateRemarkText,
    sdAmount:SDRetentionAmount,
    otherRetentionDate:OtherRetentionDate,
    otherRetentionRemarks:OtherRetentionDateRemarkText,
    otherAmount:OtherRetentionAmount,
    deduction:JSON.stringify(AllDeduction),
    }
    const sendData = appendData(serverData);
    for (let i = 0; i < BQRDocument.length; i++) {
  sendData.append('boqfile[]', BQRDocument[i]);
  }
    const onSubmit = () => {
        if (!navigator.onLine) {
            setMessage('Your internet is in Offline')
            setOpen(true)
            setStatus(false)
            setColor(false)
        } else {
            axios({
                method:'POST',
                url: updateSiteProject,
                data: sendData,
            }).then(res => {
                if (res.data.error) {
                    setMessage(res.data.message)
                    setOpen(true)
                    setStatus(false)
                    setColor(false)
                } else {
                    setMessage(res.data.message)
                    setOpen(true)
                    setStatus(true)
                    setColor(true)
                    navigate(-1);
                }
            }).catch(err => {
                alert('Oops something went wrong ' + err)
            });
        }

    }


  return (
    <Box>
    <Box py={2} px={1}>
    <IconBreadcrumbs 
    previous={'Home'}
    current={'Site Project'}
    link1={`/home`}
    link2={'/home/siteproject'}
    currentSection={'Update Site Project'}
    
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading  title={'Update Site Projects'}/>
      </Box>
    </Container>
       <Box p={2} sx={{ height:'90%'}} display="flex" alignItems="center" justifyContent='center'>     
       <SnackBar open={open} message={message} setOpen={setOpen} status={status} color={color} />    
                                    
          <Box py={3} sx={{ px: 7, backgroundColor: '#EDF4F4', borderRadius: '10px',mx:2, my: 4, boxShadow: 11 }}>
          <Grid container justifyContent='center' display='flex' alignContent='center' spacing={4} textAlign='justify' >
          <Grid item lg={12} xl={12} md={12} xs={12} sm={12}>


{/* Project Code Creation */}
  <Box p={2} sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}} display='flex' flexDirection='column' gap={3}>
            <Grid container>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>PROJECT CODE</Typography>
            </Grid>
            </Grid>

            <Grid container display='flex' gap={2} justifyContent='center'>
            <Grid item lg={2} sm={2} xl={2} xs={2} md={2}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Client" 
            variant="outlined" 
            size='small'
            color='secondary'
            disabled
            InputLabelProps={{shrink:true}}
            value={currentProjectData.clientName}
            />
            </Grid>
            <Grid item lg={2} sm={2} xl={2} xs={2} md={2}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="SUB OR OWN" 
            variant="outlined" 
            size='small'
             disabled
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={currentProjectData.projectType}
            />
            </Grid>
            <Grid item lg={2} sm={2} xl={2} xs={2} md={2}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Month&Year" 
            variant="outlined" 
            size='small'
             disabled
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={currentProjectData.monthYear}
            />
            </Grid>
            <Grid item lg={2} sm={2} xl={2} xs={2} md={2}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Serial Num" 
            variant="outlined" 
            size='small'
             disabled
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={currentProjectData.serialNum}
            />
            </Grid>
             <Grid item lg={2} sm={2} xl={2} xs={2} md={2}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="State" 
             disabled
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={currentProjectData.projectState}
            />
            </Grid>
            <Grid item lg={2} sm={2} xl={2} xs={2} md={2}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="District" 
            variant="outlined" 
            size='small'
             disabled
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={currentProjectData.projectDistrict}
            />
            </Grid>
            <Grid item lg={2} sm={2} xl={2} xs={2} md={2}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Area" 
             disabled
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={currentProjectData.projectArea}
            />
            </Grid>
             </Grid>
             <Grid container display='flex' alignItems='center'>
            <Grid item lg={9} sm={12} xl={12} xs={12} md={9} justifyContent='start' >
            <Typography fontWeight={500} variant='subtitle1' color='#060606' ><Typography  color='#616e80' variant='subtitle1' fontWeight='bold' component='span'>PROJECT CODE : </Typography> {ProjectCode} </Typography>
            </Grid>
            </Grid>
            </Box>

{/* LAST UPDATED */}
            <Box p={2} sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={3} justifyContent='space-evenly'>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>Last Update</Typography>
            </Grid>
            <Grid item lg={2} sm={2} xl={2} xs={2} md={2}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Employee Name" 
             disabled
            variant="outlined" 
            size='small'
            color='secondary'
            value={lastUpdatedEmployeeName}
            InputLabelProps={{shrink:true}}
            />
            </Grid>
            <Grid item lg={2} sm={2} xl={2} xs={2} md={2}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Employee ID" 
             disabled
            variant="outlined" 
            size='small'
            color='secondary'
            value={lastUpdatedEmployeeID}
            InputLabelProps={{shrink:true}}
            />
            </Grid>
            <Grid item lg={2} sm={2} xl={2} xs={2} md={2}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Last Updated Date" 
             disabled
            variant="outlined" 
            size='small'
            value={lastUpdatedDate}
            color='secondary'
            InputLabelProps={{shrink:true}}
            />
            </Grid>
            </Grid>
            </Box>

{/* Tender Type */}

           <Box p={2} sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={3} justifyContent='space-evenly'>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>TENDER TYPE</Typography>
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Autocomplete
            disablePortal
            freeSolo
            id="combo-box-demo"
            value={selectedTenderType}
            options={['OPEN', 'CLOSE']}
            onChange={(event, value)=>setSelectedTenderType(value)}
            renderInput={(params) => <TextField 
            {...params} label="Choose Tender Type" 
            sx={{ width: '100%' }}
            variant="outlined" size='small'color='secondary'
            />}
            />
            </Grid>
            </Grid>
            </Box>


{/* TextField 1 - TENDER SPEC /ENQUIRY SPEC*/}

             <Box p={2} sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>TENDER SPEC /ENQUIRY SPEC</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
                fullWidth 
                id="TenderSpecText" 
                label="Remark Text" 
                variant="outlined" 
                name='tenderSpecRemarkText'
                size='small'
                color='secondary'
                InputLabelProps={{shrink:true}}
                value={tenderSpecRemarkText}
                onChange={(e) => setTenderSpecRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="TenderSpecdocument" 
            label="Documents" 
            variant="outlined" 
            size='small'
            color='secondary'
            type="file"
            className='file-input'
            InputProps={{
                defaultValue: '',
                style: { color: 'transparent' },
                inputProps: { 'aria-label': 'File Upload'}
            }}
            onChange={(e) => setTenderSpecDocument(e.target.files[0])}
                InputLabelProps={{
                    shrink: true,
                }}
             />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }} textAlign='center'>
            <Typography fontWeight={600}>{typeof(tenderSpecDocument) === 'object' ? tenderSpecDocument.name : tenderSpecDocument}</Typography>
            </Grid>
            </Grid>
            </Box> 

{/* TextField 2 - OPENING DATE*/}
             <Box p={2}  sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>OPENING DATE</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={openingDateRemarkText}
            onChange={(e) => setOpeningDateRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Opening Date" 
            variant="outlined" 
            size='small'
            type='date'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={openingDate}
            onChange={(e) => setOpeningDate(e.target.value)}
            />
            </Grid>
            </Grid>
            </Box>

{/* TextField 3 - CLOSING DATE*/}
             <Box p={2}  sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>CLOSING DATE</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
           value={closingDateRemarkText}
            onChange={(e) => setClosingDateRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Closing Date" 
            variant="outlined" 
            size='small'
            type='date'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={closingDate}
            onChange={(e) => setClosingDate(e.target.value)}
            />
            </Grid>
            </Grid>
            </Box>

{/* Newly Added Field - BQR */}

             <Box p={2} sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>BQR</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
             InputLabelProps={{shrink:true}}
            value={BQRRemarkText}
            onChange={(e) => setBQRRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="BQQdocument" 
            label="Documents" 
            variant="outlined" 
            size='small'
            color='secondary'
            type="file"
             InputProps={{
                defaultValue: '',
                style: { color: 'transparent' },
                inputProps: { 'aria-label': 'File Upload' }
            }}
            onChange={(e) => setBQRDocument(e.target.files[0])}
            InputLabelProps={{
                shrink: true,
            }}
             />
            </Grid>
             <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }} textAlign='center'>
            <Typography fontWeight={600}>{typeof(BQRDocument) === 'object' ? BQRDocument.name : BQRDocument}</Typography>
            </Grid>
            </Grid>
            </Box>


{/* TextField 4 -EMD/EMD EXEMPTION*/}

             <Box p={2} sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>EMD/EMD EXEMPTION</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={EMDExemptionRemarkText}
            onChange={(e) => setEMDExemptionRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="EMDExemptiondocument" 
            label="Documents" 
            variant="outlined" 
            size='small'
            color='secondary'
            type="file"
            InputProps={{
                defaultValue: '',
                style: { color: 'transparent' },
                inputProps: { 'aria-label': 'File Upload' }
            }}
            onChange={(e) => setEMDExemptionDocument(e.target.files[0])}
            InputLabelProps={{
                shrink: true,
            }}
             />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }} textAlign='center'>
            <Typography fontWeight={600}>{typeof(EMDExemptionDocument) === 'object' ? EMDExemptionDocument.name : EMDExemptionDocument}</Typography>
            </Grid>
            </Grid>
            </Box>


{/* TextField 5 - TENDER LOST*/}
             <Box p={2}  sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>TENDER LOST</Typography>
            </Grid>
            <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 1  }}>
            <TextField 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
             InputLabelProps={{shrink:true}}
            value={TenderLostRemarkText}
            onChange={(e) => setTenderLostRemarkText(e.target.value)}
            />
            </Grid>
           <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 1  }}>
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={SelectedTenderLost}
            options={['Finance', 'Remarks']}
            onChange={(event, value)=>setSelectedTenderLost(value)}
            renderInput={(params) => <TextField 
            {...params} label="Tender Lost" 
            sx={{width:230}}
            variant="outlined" size='small'color='secondary'
            />}
            />
            </Grid>
           <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 1  }}>
            <TextField 
            id="TenderSpecText" 
            label="Competitor Name" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={TenderLostCompetitorName}
            onChange={(e) => setTenderLostCompetitorName(e.target.value)}
            />
            </Grid>
           <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 1  }}>
            <TextField 
            id="TenderSpecText" 
            label="Quote Amount" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={TenderLostAmount}
            onChange={(e) => setTenderLostAmount(e.target.value)}
            />
            </Grid>
            </Grid>
            </Box>

{/* TextFiled 6 -SD DATE WITH AMOUNT/ BANK GUARANTEE/ BILL DEDUCTION */}
             <Box p={2} sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>SD DATE WITH AMOUNT/ BANK GUARANTEE/ BILL DEDUCTION</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={BillDeductionRemarkText}
            onChange={(e) => setBillDeductionRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="BillDeductiondocument" 
            label="Documents" 
            variant="outlined" 
            size='small'
            color='secondary'
            type="file"
            InputProps={{
                defaultValue: '',
                style: { color: 'transparent' },
                inputProps: { 'aria-label': 'File Upload' }
            }}
            onChange={(e) => setBillDeductionDocument(e.target.files[0])}
            InputLabelProps={{
                shrink: true,
            }}
             />
            </Grid>
             <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }} textAlign='center'>
            <Typography fontWeight={600}>{typeof(BillDeductionDocument) === 'object' ? BillDeductionDocument.name : BillDeductionDocument}</Typography>
            </Grid>
            </Grid>
            </Box> 


{/* TextFiled 7 -BOQ */}
             <Box p={2} sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>BOQ</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={BOQRemarkText}
            onChange={(e) => setBOQRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="BOQdocument" 
            label="Documents" 
            variant="outlined" 
            size='small'
            color='secondary'
            multiple
            type="file"
            InputProps={{
                defaultValue: '',
                style: { color: 'transparent' },
                inputProps: { 'aria-label': 'File Upload' },
            }}
            onChange={(e) => setBOQDocument(e.target.files[0])}
            InputLabelProps={{
                shrink: true,
            }}
                       inputProps={{
          multiple: true
        }}
             />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }} textAlign='center'>
            <Typography fontWeight={600}>{typeof(BOQDocument) === 'object' ? BOQDocument.name : BOQDocument}</Typography>
            </Grid>
            </Grid>
            </Box>

{/* TextFiled 8 -PROJECT DETAILS */}
             <Box p={2} sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>PROJECT DETAILS</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={ProjectDetailsRemarkText}
            onChange={(e) => setProjectDetailsRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="projectDetailsdocument" 
            label="Documents" 
            variant="outlined" 
            size='small'
            color='secondary'
            type="file"
            InputProps={{
                defaultValue: '',
                style: { color: 'transparent' },
                inputProps: { 'aria-label': 'File Upload' }
            }}
            onChange={(e) => setProjectDetailsDocument(e.target.files[0])}
            InputLabelProps={{
                shrink: true,
            }}
             />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }} textAlign='center'>
            <Typography fontWeight={600}>{typeof(ProjectDetailsDocument) === 'object' ? ProjectDetailsDocument.name : ProjectDetailsDocument}</Typography>
            </Grid>
            </Grid>
            </Box>

{/* TextFiled 10 -WORK ORDER/LOA*/}
             <Box p={2} sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>WORK ORDER/LOA</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={LOARemarkText}
            onChange={(e) => setLOARemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="LOAdocument" 
            label="Documents" 
            variant="outlined" 
            size='small'
            color='secondary'
            type="file"
            InputProps={{
                defaultValue: '',
                style: { color: 'transparent' },
                inputProps: { 'aria-label': 'File Upload' }
            }}
            onChange={(e) => setLOADocument(e.target.files[0])}
            InputLabelProps={{
                shrink: true,
            }}
             />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }} textAlign='center'>
            <Typography fontWeight={600}>{typeof(LOADocument) === 'object' ? LOADocument.name : LOADocument}</Typography>
            </Grid>
            </Grid>
            </Box>

{/* TextField 11 -PROFILE DRAWING*/}
             <Box p={2}  sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>PROFILE DRAWING</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={ProfileDrawingRemarkText}
            onChange={(e) => setProfileDrawingRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Profile Drawing" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={ProfileDrawing}
            onChange={(e) => setProfileDrawing(e.target.value)}
            />
            </Grid>
            </Grid>
            </Box>

{/* TextFiled 12 -AGREEMENT*/}
             <Box p={2} sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>AGREEMENT</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={AgreementRemarkText}
            onChange={(e) => setAgreementRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="Agreementdocument" 
            label="Documents" 
            variant="outlined" 
            size='small'
            color='secondary'
            type="file"
            InputProps={{
                defaultValue: '',
                style: { color: 'transparent' },
                inputProps: { 'aria-label': 'File Upload' }
            }}
            onChange={(e) => setAgreementDocument(e.target.files[0])}
            InputLabelProps={{
                shrink: true,
            }}
             />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }} textAlign='center'>
            <Typography fontWeight={600}>{typeof(AgreementDocument) === 'object' ? AgreementDocument.name : AgreementDocument}</Typography>
            </Grid>
            </Grid>
            </Box>

{/* TextFiled 13 -SUPPLY OF MATERIALS WITH BUDGET*/}
             <Box p={2} sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>SUPPLY OF MATERIALS WITH BUDGET</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={SupplyofMaterialRemarkText}
            onChange={(e) => setSupplyofMaterialRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="SupplyofMaterialdocument" 
            label="Documents" 
            variant="outlined" 
            size='small'
            color='secondary'
            type="file"
            InputProps={{
                defaultValue: '',
                style: { color: 'transparent' },
                inputProps: { 'aria-label': 'File Upload' }
            }}
            onChange={(e) => setSupplyofMaterialDocument(e.target.files[0])}
            InputLabelProps={{
                shrink: true,
            }}
             />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2  }} textAlign='center'>
            <Typography fontWeight={600}>{typeof(SupplyofMaterialDocument) === 'object' ? SupplyofMaterialDocument.name : SupplyofMaterialDocument}</Typography>
            </Grid>
            </Grid>
            </Box>

{/* Newly Added Field - Sub YES/NO */}
             <Box p={2}  sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>SUB CONTRACT</Typography>
            </Grid>
            <Grid item lg={2} sm={2} xl={2} xs={2} md={2}>
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={['Yes', 'No']}
            value={SubContract}
             onChange={(event, value) => setSubContract(value)}
            renderInput={(params) => <TextField 
            {...params} label="Sub Contract" 
            sx={{ width: '100%' }}
            variant="outlined" size='small'color='secondary'
            />}
            />
            </Grid>
            </Grid>
            </Box>


                {
                    SubContract === 'Yes' && <>

{/* TextField 14 -SUB CONTRACT NAME*/}
            <Box p={2}  sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>SUB CONTRACT NAME</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={SubContractNameRemarkText}
            onChange={(e) => setSubContractNameRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Sub Contract Name" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={SubContractName}
            onChange={(e) => setSubContractName(e.target.value)}
            />
            </Grid>
            </Grid>
            </Box>

{/* TextField 15 - SUB CONTRACT ORDER*/}
             <Box p={2}  sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>SUB CONTRACT ORDER</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={SubContractOrderRemarkText}
            onChange={(e) => setSubContractOrderRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Sub Contract Order" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={SubContractOrder}
            onChange={(e) => setSubContractOrder(e.target.value)}
            />
            </Grid>
            </Grid>
            </Box>

{/* TextField 16 -SCOPE OF WORK IN CASE OF SUBCONTRACT*/}
             <Box p={2}  sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>SCOPE OF WORK IN CASE OF SUBCONTRACT</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={ScopeOfWorkRemarkText}
            onChange={(e) => setScopeOfWorkRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Scope of work When Sub Contract" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={ScopeOfWork}
            onChange={(e) => setScopeOfWork(e.target.value)}
            />
            </Grid>
            </Grid>
            </Box>

</>
                }

{/* TextField 17 -OUR SCOPE OF WORK*/}
             <Box p={2}  sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>OUR SCOPE OF WORK</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={OurScopeOfWorkRemarkText}
            onChange={(e) => setOurScopeOfWorkRemarkText(e.target.value)}
            />
            </Grid>
      <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 1  }} display='flex' flexDirection='row' gap={2}>
        <FormControlLabel control={<Checkbox checked={HDD === 'hdd' ? true : false} onChange={(e)=>{if(e.target.checked){setHDD(e.target.name)} else{setHDD('')}}} name='hdd'/>}label="HDD" />
       <FormControlLabel control={<Checkbox checked={escavatorsSmall === 'escavatorsSmall'? true : false} onChange={(e)=>{if(e.target.checked){setescavatorsSmall(e.target.name)} else{setescavatorsSmall('')}}}  name='escavatorsSmall'/>} label="EscavatorsSmall" />
       <FormControlLabel control={<Checkbox checked={hydraSmall === 'hydraSmall'? true : false} onChange={(e)=>{if(e.target.checked){sethydraSmall(e.target.name)} else{sethydraSmall('')}}}  name='hydraSmall'/>} label="HydraSmall" />
       <FormControlLabel control={<Checkbox checked={manPower === 'manPower'? true : false} onChange={(e)=>{if(e.target.checked){setmanPower (e.target.name)} else{setmanPower ('')}}}  name='manPower '/>} label="ManPower" />
       <FormControlLabel control={<Checkbox checked={hydraBig === 'hydraBig'? true : false} onChange={(e)=>{if(e.target.checked){sethydraBig(e.target.name)} else{sethydraBig('')}}}  name='hydraBig'/>} label="HydraBig" />
       <FormControlLabel control={<Checkbox checked={Generator === 'generator'? true : false}  onChange={(e)=>{if(e.target.checked){setGenerator(e.target.name)} else{setGenerator('')}}}  name='generator'/>} label="Generator" />
       <FormControlLabel control={<Checkbox checked={weldingMachine === 'weldingMachine'? true : false} onChange={(e)=>{if(e.target.checked){setweldingMachine(e.target.name)} else{setweldingMachine('')}}}  name='weldingMachine'/>} label="WeldingMachine" />
       </Grid>
       <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 1  }} display='flex' flexDirection='row' gap={2}>
       <FormControlLabel control={<Checkbox checked={grindingMachine === 'grindingMachine'? true : false} onChange={(e)=>{if(e.target.checked){setgrindingMachine(e.target.name)} else{setgrindingMachine('')}}}  name='grindingMachine'/>} label="GrindingMachine" />
       <FormControlLabel control={<Checkbox checked={Clamp === 'clamp' ? true : false} onChange={(e)=>{if(e.target.checked){setClamp (e.target.name)} else{setClamp ('')}}}  name='clamp '/>} label="Clamp " />
       <FormControlLabel control={<Checkbox checked={rollersSmall === 'rollersSmall'? true : false} onChange={(e)=>{if(e.target.checked){setrollersSmall (e.target.name)} else{setrollersSmall ('')}}}  name='rollersSmall '/>} label="RollersSmall " />
       <FormControlLabel control={<Checkbox checked={rollersBig === 'rollersBig'? true : false} onChange={(e)=>{if(e.target.checked){setrollersBig(e.target.name)} else{setrollersBig('')}}}  name='rollersBig'/>} label="RollersBig" />
       <FormControlLabel control={<Checkbox checked={Cradels === 'cradels'? true : false} onChange={(e)=>{if(e.target.checked){setCradels(e.target.name)} else{setCradels('')}}}  name='cradels'/>} label="Cradels" />
       <FormControlLabel control={<Checkbox checked={drumStands === 'drumStands'? true : false} onChange={(e)=>{if(e.target.checked){setdrumStands(e.target.name)} else{setdrumStands('')}}}  name='drumStands'/>} label="DrumStands" />
       <FormControlLabel control={<Checkbox checked={winchMachine === 'winchMachine'? true : false} onChange={(e)=>{if(e.target.checked){setwinchMachine(e.target.name)} else{setwinchMachine('')}}}  name='winchMachine'/>} label="WinchMachine" />
      </Grid>
            </Grid>
            </Box>

{/* TextField 18 -OWN MACHINE OR SUBCONTRACT*/}
             <Box p={2}  sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>OWN MACHINE OR SUBCONTRACT</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={OwnMachineOrSubRemarkText}
            onChange={(e) => setOwnMachineOrSubRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={['Own Machine', 'Sub contract']}
            value={SelectedOwnMachineOrSub}
            onChange={(event, value) => setSelectedOwnMachineOrSub(value)}
            renderInput={(params) => <TextField 
            {...params} label="Own Machine or Sub Contract" 
            sx={{ width: '100%' }}
            variant="outlined" 
            size='small'
            color='secondary'
            />}
            />
            </Grid>
            </Grid>
            </Box>

{/* TextFiled 19 -BILLING DETAILS*/}
             <Box p={2} sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2} justifyContent='center'>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>BILLING DETAILS</Typography>
            </Grid>
            <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={BillingDetailsRemarkText}
            onChange={(e) => setBillingDetailsRemarkText(e.target.value)}
            />
            </Grid>
              <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="BillingDetailsdocument" 
            label="Documents" 
            variant="outlined" 
            size='small'
            color='secondary'
            type="file"
            InputProps={{
                defaultValue: '',
                style: { color: 'transparent' },
                inputProps: { 'aria-label': 'File Upload' }
            }}
            onChange={(e) => setBillingDetailsDocument(e.target.files[0])}
            InputLabelProps={{
                shrink: true,
            }}
             />
            </Grid>
           <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }} textAlign='center'>
            <Typography fontWeight={600}>{typeof(BillingDetailsDocument) === 'object' ? BillingDetailsDocument.name : BillingDetailsDocument}</Typography>
            </Grid>
            <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}>
            <SiteProjectBillChatDialog />
            </Grid>
            </Grid>
            </Box>

{/* TextField 20 -FLOW OF BILLS*/}
             <Box p={2}  sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>FLOW OF BILLS</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={FlowOfBillsRemarkText}
            onChange={(e) => setFlowOfBillsRemarkText(e.target.value)}
            />
            </Grid>
             <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
             <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[...FlowBillOptions]}
            value={SelectedFlowOfBills}
            onChange={(event, value) => setSelectedFlowOfBills(value)}
            renderInput={(params) => <TextField 
            {...params} label="Flow Of Bills" 
            sx={{ width: '100%' }}
            variant="outlined" size='small'color='secondary'
            />}
            />
            </Grid>
            </Grid>
            </Box>

{/* TextField 21 -PAYMENT RECEIVED*/}
             <Box p={2}  sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2} justifyContent='space-evenly'>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>PAYMENT RECEIVED</Typography>
            </Grid>
           <Grid item lg={6} sm={4} xl={6} xs={4} md={6} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={PaymentsRemarkText}
            onChange={(e) => setPaymentsRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={6} sm={4} xl={6} xs={4} md={6} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Payment Received"
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={PaymentsReceived}
            onChange={(e) => setPaymentsReceived(e.target.value)}
            />
            </Grid>
           <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 1  }}>
             <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[...DeductionOptions]}
            value={SelectedDeductionType}
            onChange={(event, value) => setSelectedDeductionType(value)}
            renderInput={(params) => <TextField 
            {...params} label="Deduction Type" 
            sx={{ width: '100%' }}
            variant="outlined" size='small'color='secondary'
            />}
            />
            </Grid>
        <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Deducted Amount"
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={deductedAmount}
            onChange={(e) => setDeductedAmount(e.target.value)}
            />
            </Grid>

             <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 1  }}>
                <Button fullWidth variant='contained' onClick={StoredSelectedDeduction}>Add +</Button>
            </Grid>

            <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 1  }} textAlign='center' display='flex' justifyContent='center' flexDirection='column'>
            {
                AllDeduction.map((i)=>{
                    return (
                         <Typography sx={{marginBottom:1}}>{i.deductionType} - ₹{i.deductionAmount} <CloseIcon sx={{verticalAlign:'middle'}} fontSize='small'  onClick={()=>removeDeduction(i.deductionType)}/> </Typography>
                    )
                })
              
            }
            </Grid>
            </Grid>
            </Box>

{/* TextField 22 -EMD  RETENTION RECEIVABLE DATE*/}
             <Box p={2}  sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 1px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>EMD RETENTION RECEIVABLE DATE</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={EMDRetentionDateRemarkText}
            onChange={(e) => setEMDRetentionDateRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={EMDRetentionAmount}
            onChange={(e) => setEMDRetentionAmount(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="EMD /SD Rentention Receivable Date"
            variant="outlined" 
            size='small'
            type='date'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={EMDRetentionDate}
            onChange={(e) => setEMDRetentionDate(e.target.value)}
            />
            </Grid>
            </Grid>
            </Box>

 {/* TextField 23 -SD  RETENTION RECEIVABLE DATE*/}
             <Box p={2}  sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 1px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>SD RETENTION RECEIVABLE DATE</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={SDRetentionDateRemarkText}
            onChange={(e) => setSDRetentionDateRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={SDRetentionAmount}
            onChange={(e) => setSDRetentionAmount(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="EMD /SD Rentention Receivable Date"
            variant="outlined" 
            size='small'
            type='date'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={SDRetentionDate}
            onChange={(e) => setSDRetentionDate(e.target.value)}
            />
            </Grid>
            </Grid>
            </Box>

{/* TextField 24 -OTHER  RETENTION RECEIVABLE DATE*/}
             <Box p={2}  sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 1px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>OTHER RETENTION RECEIVABLE DATE</Typography>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={OtherRetentionDateRemarkText}
            onChange={(e) => setOtherRetentionDateRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={OtherRetentionAmount}
            onChange={(e) => setOtherRetentionAmount(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="EMD /SD Rentention Receivable Date"
            variant="outlined" 
            size='small'
            type='date'
            color='secondary'
            InputLabelProps={{shrink:true}}
            value={OtherRetentionDate}
            onChange={(e) => setOtherRetentionDate(e.target.value)}
            />
            </Grid>
            </Grid>
            </Box>

            <Box p={2} mb={2}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Button fullWidth
            onClick={onSubmit}
             variant='contained' 
             sx={{bgcolor:'secondary.main'}}>
            <Typography 
            sx={{letterSpacing:2 , fontWeight:'bold', color:'#ffff'}}>
             UPDATE SITE PROJECT {SiteProjectId}
            </Typography>
             </Button>
            </Grid>
            </Grid>
            </Box>








       </Grid>
       </Grid>
       </Box >
       </Box >
       </Box>
  )
}
