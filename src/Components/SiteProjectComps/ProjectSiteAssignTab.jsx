import React, { useEffect, useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Autocomplete, Table, TableContainer, TablePagination, TableCell, TableBody, TableRow, TableHead} from "@mui/material";
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import {
  add_factory_project,
  create_project_code,
  methodGet,
  methodPost,
  siteClient,
  siteDistrict,
  siteState,
  update_tender_details,
} from "../../API_Service/API_Links";
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { appendData } from '../../Variables/Variables';
import SnackBar from '../SnackBar';
import { useNavigate } from 'react-router-dom';

export default function ProjectSiteAssignTab({setValue}) {

    const { formState: { errors }, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [districtList, setDistrictList]= useState([]);
    const [client , setClient] = useState([]);
    const [state, setState] = useState([]);
    const [input , setInput] = useState(false);
    const empID = JSON.parse(localStorage.getItem('EmployeeId'));
    const empName = JSON.parse(localStorage.getItem('user'));
// FILEDVALUE STATE
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [projectType,setSelectedProjectType] = useState(""); 
    const [ProjectCode, setProjectCode] = useState('');
    const [siteProjectId, setsiteProjectId] = useState('');
    const [selectedArea , setSelectedArea] = useState("");

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



//GET  Fetch
    useEffect(() => {
            axios({
                method: methodGet,
                url: siteClient,
            }).then(res => {
                if (res.data.error) {
                    setMessage(res.data.message)
                    setOpen(true)
                    setStatus(false)
                    setColor(false)
                } else {
                    setMessage(res.data.message)
                    setClient(res.data.data)
                    setOpen(true)
                    setStatus(true)
                    setColor(true)

                }
            }).catch(err => {
                alert('Oops something went wrong ' + err)
            });
    }, [])

    useEffect(() => {
            axios({
                method: methodGet,
                url: siteState,
            }).then(res => {
                if (res.data.error) {
                    setMessage(res.data.message)
                    setOpen(true)
                    setStatus(false)
                    setColor(false)
                } else {
                    setMessage(res.data.message)
                    setState(res.data.data)
                    setOpen(true)
                    setStatus(true)
                    setColor(true)

                }
            }).catch(err => {
                alert('Oops something went wrong ' + err)
            });
    }, [])



    const clientList = client.map((i)=>i.ClientName);
    
    

// POST FETCH
    useEffect(() => {
        if(selectedState !== ''){
            const lData = new FormData()
            lData.append('StateName', selectedState);
            axios({
                method: methodPost,
                url: siteDistrict,
                data: lData,
            }).then(res => {
                if (res.data.error) {
                    setMessage(res.data.message)
                    setOpen(true)
                    setStatus(false)
                    setColor(false)
                } else {
                    setMessage(res.data.message)
                    setDistrictList(res.data.data)
                    setOpen(true)
                    setStatus(true)
                    setColor(true)

                }
            }).catch(err => {
                alert('Oops something went wrong ' + err)
            });
        }
        else{
            setMessage('Select a State First');
        }

    }, [selectedState])

       const districtName = districtList.map((i)=>i.DistrictName);
    

// Move to First Tab
 


// Code Creation
 
 const createProjectCode = () =>{
   const serverdata = {
    ClientName:selectedClient,
    ProjectType:projectType,
    ProjectState:selectedState,
    ProjectDistrict:selectedDistrict,
    EmployeeId:empID,
    ProjectArea:selectedArea
   }
   const sendData = appendData(serverdata)
            axios({
                method: methodPost,
                url: create_project_code,
                data: sendData,
            }).then(res => {
                if (res.data.error) {
                    setMessage(res.data.message)
                    setOpen(true)
                    setStatus(false)
                    setColor(false)
                } else {
                    setMessage(res.data.message)
                    setProjectCode(res.data.ProjectCode);
                    setsiteProjectId(res.data.SiteProjectId);
                    setOpen(true)
                    setStatus(true)
                    setColor(true)

                }
            }).catch(err => {
                alert('Oops something went wrong ' + err)
            });
 }


 const createNewSiteProject = () =>{
    const serverdata = {
    EmployeeID:empID,
    EmployeeName:empName,
    TenderType:selectedTenderType,
    TenderSpecRemarks:tenderSpecRemarkText,
    TenderSpecFile:tenderSpecDocument,
    OpeningDateRemarks:openingDateRemarkText,
    ClosingDateRemarks:closingDateRemarkText,
    ClosingDate:closingDate,
    OpeningDate:openingDate,
    bqrRemarks:BQRRemarkText,
    bqrFile:BQRDocument,
    emdExemptionRemarks:EMDExemptionRemarkText,
    emdExemptionFile: EMDExemptionDocument,
    SiteProjectId:siteProjectId
   }
   const sendData = appendData(serverdata)
            axios({
                method: methodPost,
                url: update_tender_details,
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
                    setClosingDateRemarkText('');
                    setOpeningDateRemarkText('');
                    setTenderSpecRemarkText('');
                    setBQRRemarkText('');
                    setOpeningDate('');
                    setClosingDate('');
                    setProjectCode('');
                    setsiteProjectId('');
                    setEMDExemptionRemarkText('');
                    setSelectedArea('');
                    document.getElementById('tenderSpecdocument').value ='';
                    document.getElementById('BQRdocument').value ='';
                    document.getElementById('EMDExemptiondocument').value ='';
                    setInput(true);
                    setValue("1");
                }
            }).catch(err => {
                alert('Oops something went wrong ' + err)
            });
 }


     const cancelClick = () =>{
      navigate('/home')
     }

  return (
    <Box>
       <Box sx={{ height:'90%'}} display="flex" alignItems="center" justifyContent='center'>     
       <SnackBar open={open} message={message} setOpen={setOpen} status={status} color={color} />    
                                      
          <Box py={3} sx={{ px: 7, backgroundColor: 'white', borderRadius: '10px',mx:2, my: 4, boxShadow: 11 }}>
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
            <Grid item lg={2} sm={12} xl={2} xs={12} md={2}>
            <Autocomplete
            key={input}
            disablePortal
            id="combo-box-demo"
            defaultValue=""
            onChange={(event , value) => setSelectedClient(value)}
            options={[...clientList]}
            renderInput={(params) => <TextField 
            {...params} label="Client" 
            sx={{ width: '100%' }}
            variant="outlined" size='small'color='secondary'
            error={errors.ExpectDate ? true : false}
            helperText={(errors.ExpectDate && errors.ExpectDate.type === "required") ? "Expected date is required" : ""}
            />}
            />
            </Grid>
           <Grid item lg={2} sm={12} xl={2} xs={12} md={2}>
            <Autocomplete
            key={input}
            disablePortal
            id="combo-box-demo"
            defaultValue=""
            onChange={(event , value) => setSelectedProjectType(value)}
            options={['SUB', 'OWN']}
            renderInput={(params) => <TextField 
            {...params} label="Sub Or Own" 
            sx={{ width: '100%' }}
            variant="outlined" size='small'color='secondary'
            error={errors.ExpectDate ? true : false}
            helperText={(errors.ExpectDate && errors.ExpectDate.type === "required") ? "Expected date is required" : ""}
          
            />}
            />
            </Grid>
      <Grid item lg={2} sm={12} xl={2} xs={12} md={2}>
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={(event , value) => setSelectedState(value.StateCode)}
            options={state}
            getOptionLabel={(option) => option ? option.StateName : ""}
            renderInput={(params) => <TextField 
            {...params} label="State" 
            sx={{ width: '100%' }}
            variant="outlined" size='small'color='secondary'
            error={errors.ExpectDate ? true : false}
            helperText={(errors.ExpectDate && errors.ExpectDate.type === "required") ? "Expected date is required" : ""}
          
            />}
            />
            </Grid>
          <Grid item lg={2} sm={12} xl={2} xs={12} md={2}>
            <Autocomplete
            key={input}
            disablePortal
            defaultValue=""
            id="combo-box-demo"
            onChange={(event , value) => setSelectedDistrict(value)}
            options={[...districtName]}
            renderInput={(params) => <TextField 
            {...params} label="District" 
            sx={{ width: '100%' }}
            variant="outlined" size='small'color='secondary'
            error={errors.ExpectDate ? true : false}
            helperText={(errors.ExpectDate && errors.ExpectDate.type === "required") ? "Expected date is required" : ""}
           
            />}
            />
            </Grid>
           <Grid item lg={2} sm={12} xl={2} xs={12} md={2}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Area" 
            variant="outlined" 
            size='small'
            color='secondary'
            value={selectedArea}
            error={errors.Area ? true : false}
            helperText={(errors.Area && errors.Area.type === "required") ? " Area is required" : ""}
            onChange={(e) => setSelectedArea(e.target.value)}
            />
            </Grid>
             </Grid>
             <Grid container display='flex' alignItems='center'>
            <Grid item lg={3} sm={12} xl={12} xs={12} md={9} textAlign='center'>
            <Button variant='contained' sx={{bgcolor:'secondary.main'}} onClick={createProjectCode}>CREATE CODE</Button>
            </Grid>
            <Grid item lg={9} sm={12} xl={12} xs={12} md={9} justifyContent='start' py={2} >
            <Typography fontWeight={500} variant='subtitle1' color='#060606' ><Typography  color='#616e80' variant='subtitle1' fontWeight='bold' component='span'>PROJECT CODE : </Typography> {ProjectCode} </Typography>
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
            key={input}
            disablePortal
            id="combo-box-demo"
            options={['OPEN', 'CLOSE']}
            onChange={(event , value) => setSelectedTenderType(value)}
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
            <Grid item lg={4} sm={12} xl={4} xs={12} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            color='secondary'
            value={tenderSpecRemarkText}
            error={errors.ProjectName ? true : false}
            helperText={(errors.ProjectName && errors.ProjectName.type === "required") ? " Project Name is required" : ""}
            onChange={(e) => setTenderSpecRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={12} xl={4} xs={12} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="tenderSpecdocument" 
            label="Documents" 
            variant="outlined" 
            size='small'
            color='secondary'
            error={errors.ProjectDoc ? true : false}
            helperText={(errors.ProjectDoc && errors.ProjectDoc.type === "required") ? " Project Document is required" : ""}
            type="file"
            onChange={(e) => setTenderSpecDocument(e.target.files[0])}
            InputLabelProps={{
                shrink: true,
            }}
             />
            </Grid>
            </Grid>
            </Box>         

{/* TextField 2 - OPENING DATE*/}
             <Box p={2}  sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 0px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>OPENING DATE</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xl={4} xs={12} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            value={openingDateRemarkText}
            color='secondary'
            error={errors.ProjectName ? true : false}
            helperText={(errors.ProjectName && errors.ProjectName.type === "required") ? " Project Name is required" : ""}
            onChange={(e) => setOpeningDateRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={12} xl={4} xs={12} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Opening Date" 
            variant="outlined" 
             type='date'
             InputLabelProps={{shrink:true}}
            size='small'
            color='secondary'
            error={errors.ProjectName ? true : false}
            helperText={(errors.ProjectName && errors.ProjectName.type === "required") ? " Project Name is required" : ""}
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
            <Grid item lg={4} sm={12} xl={4} xs={12} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            value={closingDateRemarkText}
            variant="outlined" 
            size='small'
            color='secondary'
            error={errors.ProjectName ? true : false}
            helperText={(errors.ProjectName && errors.ProjectName.type === "required") ? " Project Name is required" : ""}
            onChange={(e) => setClosingDateRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={12} xl={4} xs={12} md={4} sx={{ py: 1  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Closing Date" 
            variant="outlined"
            InputLabelProps={{shrink:true}}
             type='date' 
            size='small'
            color='secondary'
            error={errors.ProjectName ? true : false}
            helperText={(errors.ProjectName && errors.ProjectName.type === "required") ? " Project Name is required" : ""}
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
            <Grid item lg={4} sm={12} xl={4} xs={12} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            size='small'
            value={BQRRemarkText}
            color='secondary'
            error={errors.ProjectName ? true : false}
            helperText={(errors.ProjectName && errors.ProjectName.type === "required") ? " Project Name is required" : ""}
            onChange={(e) => setBQRRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={12} xl={4} xs={12} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="BQRdocument" 
            label="Documents" 
            variant="outlined" 
            size='small'
            color='secondary'
            error={errors.ProjectDoc ? true : false}
            helperText={(errors.ProjectDoc && errors.ProjectDoc.type === "required") ? " Project Document is required" : ""}
            type="file"
            onChange={(e) => setBQRDocument(e.target.files[0])}
            InputLabelProps={{
                shrink: true,
            }}
             />
            </Grid>
            </Grid>
            </Box>

{/* TextField 4 -EMD/EMD EXEMPTION */}
             <Box p={2} sx={{border:'1px solid #d2cbcb',borderWidth:'1px 1px 1px 1px'}}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Typography variant='subtitle1' fontWeight={600}>EMD/EMD EXEMPTION</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xl={4} xs={12} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="TenderSpecText" 
            label="Remark Text" 
            variant="outlined" 
            value={EMDExemptionRemarkText}
            size='small'
            color='secondary'
            error={errors.ProjectName ? true : false}
            helperText={(errors.ProjectName && errors.ProjectName.type === "required") ? " Project Name is required" : ""}
            onChange={(e) => setEMDExemptionRemarkText(e.target.value)}
            />
            </Grid>
            <Grid item lg={4} sm={12} xl={4} xs={12} md={4} sx={{ py: 2  }}>
            <TextField 
            fullWidth 
            id="EMDExemptiondocument" 
            label="Documents" 
            variant="outlined" 
            size='small'
            color='secondary'
            error={errors.ProjectDoc ? true : false}
            helperText={(errors.ProjectDoc && errors.ProjectDoc.type === "required") ? " Project Document is required" : ""}
            type="file"
            onChange={(e) => setEMDExemptionDocument(e.target.files[0])}
            InputLabelProps={{
                shrink: true,
            }}
             />
            </Grid>
            </Grid>
            </Box>    
                       
            <Box p={2} mb={2}>
            <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
            <Button onClick={createNewSiteProject} fullWidth variant='contained' sx={{bgcolor:'secondary.main'}}>
            <Typography sx={{letterSpacing:2 , fontWeight:'bold', color:'#ffff'}}>
            CREATE NEW SITE PROJECT</Typography></Button>
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
