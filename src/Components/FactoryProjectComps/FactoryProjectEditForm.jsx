import React, {useState } from 'react'
import {Box,Button,Grid,TextField,Typography, Container, Autocomplete} from "@mui/material";
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import {get_factory_project, methodPost, update_factory_project } from "../../API_Service/API_Links";
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { appendData } from '../../Variables/Variables';
import SnackBar from '../SnackBar';
import { useLocation, useNavigate } from 'react-router-dom';
import ChipInputTable1 from '../ChipInputTable/ChipInputTable1';
import ChipInputTable2 from '../ChipInputTable/ChipInputTable2';
import IconBreadcrumbs from '../Breadcrumbs';
import Heading from '../Heading';
import { useEffect } from 'react';
import TeamChipInput from '../ChipInputTable/TeamChipInput';
import ProjectManagerChip from '../ChipInputTable/ProjectManagerChip';

export default function FactoryProjectEditForm() {



    const { formState: { errors }, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState("");
    const [CustomerName, setCustomerName] = useState("");
    const [MobileNum, setMobileNum] = useState("");
    const [Email, setEmail] = useState("");
    const [CompanyName, setCompanyName] = useState("");
    const [CompanyAddress, setCompanyAddress] = useState("");
    const [GstNum, setGstNum] = useState("");
    const [Services, setServices] = useState("");
    const [ProjectName, setProjectName] = useState("");
    const [ProjectDescp, setProjectDescp] = useState("");
    const [ExpectDate, setExpectDate] = useState("");
    const [ProjectBudget, setProjectBudget] = useState("");
    const [projectType, setProjectType] = useState([]);
    const [projectCode, setProjectCode] = useState("");
    const[deadLine, setDeadLine] = useState('');
    const [ProjectStart, setProjectStart] = useState("");
    const [ProjectEnd, setProjectEnd] = useState("");
    const [input, setInput] = useState(false);
    const [projectdocument, setProjectDocument] = useState('');
    const [teamMember , setTeamMember] = useState([]);
    const [staffMember, setStaffMember] = useState([]);
    const [teamName , setTeamName] = useState([]);
    const [staffName, setStaffName] = useState([]);
    const [currentTeam , setCurrentTeam] = useState('');
    const navigate = useNavigate();
    const [project, setcurrentProjectData] = useState([]);


    const location = useLocation();
    
    const projectId = location.state.id;    


        // GET Current Project
           useEffect(() => {
            const serverData = new FormData()
            serverData.append('ProjectId', projectId);
            axios({
                method: 'POST',
                url: get_factory_project,
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
                    setProjectType(res.data.data.ProjectType)             
                    setOpen(true)
                    setStatus(true)
                    setColor(true)
                }
            }).catch(err => {
                alert('Oops something went wrong ' + err)
            });
    }, [])    


    const serverData = {
      CustomerName: CustomerName,
      MobileNum: MobileNum,
      Email: Email,
      CompanyName: CompanyName,
      CompanyAddress: CompanyAddress,
      GstNum: GstNum,
      Services: Services,
      ProjectName: ProjectName,
      ProjectType: projectType,
      ProjectCode: projectCode,
      ProjectDescp: ProjectDescp,
      ProjectBudget: ProjectBudget,
      ProjectDoc: projectdocument,
      EmployeeId: staffMember,
      DepartmentId: teamMember,
      StartDate: ProjectStart,
      EndDate: ProjectEnd,

    }
    const sendData = appendData(serverData);
    const onSubmit = () => {
        if (!navigator.onLine) {
            setMessage('Your internet is in Offline')
            setOpen(true)
            setStatus(false)
            setColor(false)
        } 
        else{
            axios({
              method: methodPost,
              url: update_factory_project,
              data: sendData,
            })
              .then((res) => {
                if (res.data.error) {
                  setMessage(res.data.message);
                  setOpen(true);
                  setStatus(false);
                  setColor(false);
                } else {
                   setMessage(res.data.message);
                  setOpen(true);
                  setStatus(true);
                  setColor(true);


                  setCompanyAddress("");
                  setCompanyName("");
                  setCustomerName("");
                  setDeadLine("");
                  setEmail("");
                  setExpectDate("");
                  setGstNum("");
                  setMessage("");
                  setMobileNum("");
                  setProjectCode("");
                  setProjectBudget("");
                  setProjectDescp("");
                  setDeadLine("");
                  setProjectStart("");
                  setProjectEnd("");
                  setServices("");
                  setInput(true);
                  setProjectName("");
                  setTeamMember("");
                  setStaffMember("");
                  setProjectType([]);
                }
              })
              .catch((err) => {
                alert("Oops something went wrong " + err);
              }).finally(()=>{
                navigate(-1);
              })
        }    
    }

     const cancelClick = () =>{  
      navigate('/home/project');
     }


  return (
    <Box>
    <Box py={2} px={1}>
    <IconBreadcrumbs
    previous={'Home'}
    current={'Factory Project'}
    link1={`/home`}
    link2={'/home/project'}
    currentSection={'Edit Factory Project'}
    
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading title={'Update Factory Project'}/>
      </Box>
    </Container>
      <Box p={3} sx={{ height: "90%" }} display="flex" alignItems="center">
        <SnackBar
          open={open}
          message={message}
          setOpen={setOpen}
          status={status}
          color={color}
        />


        <Form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              px: 5,
              backgroundColor: "#EDF4F4",
              borderRadius: "10px",
              mx: 2,
              my: 4,
              boxShadow: 11,
            }}
          >

            <Grid
              container
              justifyContent="center"
              sx={{ textAlign: "center" }}
              spacing={4}
            >
              <Grid item lg={6} xl={6}>
                <Box
                  sx={{
                    border: "1px solid black",
                    p: 4,
                    borderColor: "#d2cbcb;",
                    borderRadius: "4px",
                    ":hover": { boxShadow: 2 },
                    mt: 5,
                  }}
                >
                  <Box sx={{ pb: 3, textAlign: "left" }}>
                    <h5>CUSTOMER DETAILS</h5>
                  </Box>
                  <Grid container justifyContent="space-evenly" spacing={2}>
                    <Grid
                      item
                      lg={6}
                      sm={4}
                      xl={4}
                      xs={14}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <TextField
                        fullWidth
                        id="CustomerName"
                        label="Customer Name"
                        variant="outlined"
                        required
                        value={project.CustomerName}
                        size="small"
                        color="secondary"
                        onChange={(e) => setCustomerName(e.target.value)}
                        InputLabelProps={{shrink:true}}
                      />
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      sm={4}
                      xl={4}
                      xs={14}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <TextField
                        fullWidth
                        id="MobileNum"
                        label="Mobile number"
                        required
                        value={project.MobileNum}
                        variant="outlined"
                        size="small"
                        color="secondary"
                        inputProps={{
                          maxLength: 10,
                        }}
                        onChange={(e) => setMobileNum(e.target.value)}
                        InputLabelProps={{shrink:true}}
                      />
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      sm={4}
                      xl={4}
                      xs={14}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <TextField
                        fullWidth
                        id="Email"
                        label="Email id"
                        variant="outlined"
                        size="small"
                        type='email'
                        autoComplete='off'
                        value={project.Email}
                        color="secondary"
                        InputLabelProps={{shrink:true}}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      sm={4}
                      xl={4}
                      xs={14}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <TextField
                        fullWidth
                        id="CompanyName"
                        label="Company Name"
                        variant="outlined"
                        value={project.CompanyName}
                        size="small"
                        color="secondary"
                        onChange={(e) => setCompanyName(e.target.value)}
                        InputLabelProps={{shrink:true}}
                      />
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      sm={4}
                      xl={4}
                      xs={14}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <TextField
                        fullWidth
                        id="CompanyAddress"
                        label="Company address"
                        variant="outlined"
                        value={project.CompanyAddress}
                        size="small"
                        color="secondary"
                        InputLabelProps={{shrink:true}}
                        onChange={(e) => setCompanyAddress(e.target.value)}
                      />
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      sm={4}
                      xl={4}
                      xs={141}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <TextField
                        fullWidth
                        id="GstNum"
                        label="Gst"
                        variant="outlined"
                        value={project.GST}
                        size="small"
                        color="secondary"
                        InputLabelProps={{shrink:true}}
                        onChange={(e) => setGstNum(e.target.value)}
                      />
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      sm={4}
                      xl={4}
                      xs={14}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <TextField
                        fullWidth
                        id="Services"
                        label="Service Domain"
                        variant="outlined"
                        value={project.Services}
                        size="small"
                        color="secondary"
                        InputLabelProps={{shrink:true}}
                        onChange={(e) => setServices(e.target.value)}
                      />
                    </Grid>

                       <Grid
                      item
                      lg={6}
                      sm={4}
                      xl={4}
                      xs={14}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <TextField
                        fullWidth
                        id="ProjectBudget"
                        label="Approx Budget"
                        variant="outlined"
                        value={project.ProjectBudget}
                        size="small"
                        color="secondary"
                        InputLabelProps={{shrink:true}}
                        onChange={(e) => setProjectBudget(e.target.value)}
                      />
                    </Grid>

                 
                  </Grid>

                </Box>
              </Grid>


              {/* (project Enquiries) */}

              <Grid item lg={6} xl={6}>
                <Box
                  sx={{
                    border: "1px solid black",
                    px: 4,
                    pb: 5,
                    pt: 4,
                    borderColor: "#d2cbcb;",
                    borderRadius: "4px",
                    ":hover": { boxShadow: 2 },
                    mt: 5,
                  }}
                >
                  <Box sx={{ pb: 2, textAlign: "left" }}>
                    <h5>PROJECT DETAILS</h5>
                  </Box>
                  <Grid container justifyContent="space-evenly" spacing={2}>
                    <Grid
                      item
                      lg={6}
                      sm={4}
                      xl={4}
                      xs={14}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <TextField
                        fullWidth
                        id="ProjectName"
                        label="Project name"
                        variant="outlined"
                        size="small"
                        value={project.ProjectName}
                        color="secondary"
                        InputLabelProps={{shrink:true}}
                        onChange={(e) => setProjectName(e.target.value)}
                      />
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      sm={4}
                      xl={4}
                      xs={14}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={['Factory', 'Field']}
                        value={projectType}
                        onChange={(event, newValue) => setProjectType(newValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Project Type"
                            sx={{ width: "100%" }}
                            variant="outlined"
                            size="small"
                            color="secondary"
                          />
                        )}
                      />
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      sm={4}
                      xl={4}
                      xs={14}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <TextField
                        fullWidth
                        id="ProjectCode"
                        label="Project Code"
                        variant="outlined"
                        value={project.ProjectCode}
                        size="small"
                        color="secondary"
                           InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => setProjectCode(e.target.value)}
                      />
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      sm={4}
                      xl={4}
                      xs={14}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <TextField
                        fullWidth
                        id="projectdocument"
                        label="Documents"
                        variant="outlined"
                        size="small"
                        color="secondary"
                        type="file"
                        onChange={(e) => setProjectDocument(e.target.files[0])}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>

                    <Grid
                      item
                      lg={12}
                      sm={12}
                      xl={12}
                      xs={12}
                      md={12}
                      sx={{ py: 3 }}
                    >
                      <TextField
                      fullWidth
                        id="ProjectDescp"
                        rows={4}
                        label="Project Description"
                        color="secondary"
                        value={project.ProjectDescp}
                        variant="outlined"
                        size="small"
                        multiline
                        InputLabelProps={{shrink:true}}
                        onChange={(e) => setProjectDescp(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>

              <Grid item lg={12} xl={12} sm={12} md={12} xs={12}>
                <Box
                  sx={{
                    border: "1px solid black",
                    px: 4,
                    pb: 5,
                    pt: 4,
                    borderColor: "#d2cbcb;",
                    borderRadius: "4px",
                    ":hover": { boxShadow: 2 },
                    mt: 5,
                  }}
                >

                    <Grid
                      item
                      lg={12}
                      sm={12}
                      xl={12}
                      xs={12}
                      md={12}
                      sx={{ py: 1 }}
                    >
                      <Box sx={{ textAlign: "left" }}>
                        <h5>ADD TEAM MEMBERS</h5>
                      </Box>
                    </Grid>

                     <Grid container display='flex' justifyContent='space-evenly' flexDirection='row' gap={2}> 
                    <Grid
                      item
                      lg={2}
                      sm={6}
                      xl={2}
                      xs={6}
                      md={6}
                      sx={{ py: 2}}
                    >
                    <TextField
                      fullWidth
                      id="ProjectCode"
                      label="Project Code"
                      variant="outlined"
                      value={project.Department}
                      size="small"
                      color="secondary"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      
                    />
                    </Grid>

                      <Grid
                      item
                    lg={2}
                    sm={6}
                    xl={2}
                    xs={6}
                    md={6}
                      sx={{ py: 2}}
                    >
                    <TextField
                      fullWidth
                      id="ProjectCode"
                      label="Project Code"
                      variant="outlined"
                      value={`${project.ManagerName} (${project.ManagerId})`}
                      size="small"
                      color="secondary"
                      InputLabelProps={{
                        shrink: true,
                      }}

                    />
                    </Grid>

                      <Grid
                      item
                    lg={2}
                    sm={6}
                    xl={2}
                    xs={6}
                    md={6}
                      sx={{ py: 2}}
                    >
                     <TextField
                        fullWidth
                        id="ExpectDate"
                        label="Start Date"
                        type="date"
                        value={project.StartDate}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        color="secondary"
                        onChange={(e) => setProjectStart(e.target.value)}
                      />
                    </Grid>

                      <Grid
                      item
                    lg={2}
                    sm={6}
                    xl={2}
                    xs={6}
                    md={6}
                      sx={{ py: 2}}
                    >
                      <TextField
                        fullWidth
                        id="ExpectDate"
                        label="End Date"
                        type="date"
                      value={project.EndDate}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        color="secondary"
                        onChange={(e) => setProjectEnd(e.target.value)}
                      />
                    </Grid>


                    </Grid>
                    </Box>
                    </Grid>


            {/* {buttons}  */}
            <Grid
              container
              justifyContent="center"
              sx={{ textAlign: "center", mt: 3 }}
            >
              <Grid item lg={6} xl={6} xs={12}>
                <Grid
                  container
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2 }}>
                    <Stack spacing={2} direction="row">
                      <Button
                        fullWidth
                        variant="outlined"
                        type="submit"
                        sx={{
                          color: "white",
                          backgroundColor: "#7bc54c",
                          borderColor: "#7bc54c",
                          ":hover": {
                            borderColor: "#7bc54c",
                            color: "#000000",
                          },
                        }}
                      >
                        Submit
                      </Button>
                    </Stack>
                  </Grid>

                  <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2 }}>
                    <Stack spacing={2} direction="row">
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={cancelClick}
                        type="cancel"
                        sx={{
                          color: "white",
                          backgroundColor: "#c62828",
                          borderColor: "#c62828",
                          ":hover": {
                            borderColor: "#c62828",
                            color: "#000000",
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

          </Box>
        </Form>
      </Box>
    </Box>
  );
}
