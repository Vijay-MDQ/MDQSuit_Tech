import React, {useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Autocomplete} from "@mui/material";
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import { add_factory_project, methodPost } from "../../API_Service/API_Links";
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { appendData } from '../../Variables/Variables';
import SnackBar from '../SnackBar';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ChipInputTable1 from '../ChipInputTable/ChipInputTable1';
import ChipInputTable2 from '../ChipInputTable/ChipInputTable2';
import TeamChipInput from '../ChipInputTable/TeamChipInput';
import ProjectManagerChip from '../ChipInputTable/ProjectManagerChip';

export default function FactoryProjectAssignTab({setValue}) {


    const options = ['Factory', 'Field'];

    const { formState: { errors }, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState("");
    const [projectdocument, setProjectDocument] = useState("");
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
    const [ProjectStart, setProjectStart] = useState("");
    const [ProjectEnd, setProjectEnd] = useState("");
    const [projectType, setProjectType] = useState([]);
    const [projectCode, setProjectCode] = useState("");
    const[deadLine, setDeadLine] = useState('');
    const [input, setInput] = useState(false);
    const [teamMember , setTeamMember] = useState('');
    const [staffMember, setStaffMember] = useState('');
    const navigate = useNavigate();



   const serverData = {
        CustomerName: CustomerName,
        MobileNum: MobileNum,
        Email: Email,
        CompanyName: CompanyName,
        CompanyAddress: CompanyAddress,
        GstNum: GstNum,
        Services: Services,
        ProjectName: ProjectName,
        ProjectType:projectType,
        ProjectCode:projectCode,
        ProjectDescp: ProjectDescp,
        ProjectBudget: ProjectBudget,
        ProjectDoc:projectdocument,
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
        if(CustomerName !== '' && ProjectName !== '' && projectCode !== '' && staffMember !=='')
         {
            axios({
              method: methodPost,
              url: add_factory_project,
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
                  document.getElementById("projectdocument").value = "";
                  setTeamMember('');
                  setStaffMember('');
                  setProjectType([]);
                  setValue('1');
                }
              })
              .catch((err) => {
                alert("Oops something went wrong " + err);
              });
        }
        else{
            setMessage('Please Fill All the Details')
        }    
    }

     const cancelClick = () =>{  
      setValue('1');
     }




  return (
    <Box>
      <Box sx={{ height: "90%" }} display="flex" alignItems="center">
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
              backgroundColor: "#F5F7F7",
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
                        value={CustomerName}
                        size="small"
                        color="secondary"
                        error={errors.CustomerName ? true : false}
                        helperText={
                          errors.CustomerName &&
                          errors.CustomerName.type === "required"
                            ? "Customer Name is required"
                            : ""
                        }
                        onChange={(e) => setCustomerName(e.target.value)}
                        {...("CustomerName", { required: true })}
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
                        value={MobileNum}
                        variant="outlined"
                        size="small"
                        color="secondary"
                        error={errors.MobileNum ? true : false}
                        helperText={
                          errors.MobileNum &&
                          errors.MobileNum.type === "required"
                            ? "Mobile Number is required"
                            : ""
                        }
                        inputProps={{
                          maxLength: 10,
                        }}
                        onChange={(e) => setMobileNum(e.target.value)}
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
                        value={Email}
                        color="secondary"
                        error={errors.Email ? true : false}
                        helperText={
                          errors.Email && errors.Email.type === "required"
                            ? "Email is required"
                            : ""
                        }
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
                        value={CompanyName}
                        size="small"
                        color="secondary"
                        error={errors.CompanyName ? true : false}
                        helperText={
                          errors.CompanyName &&
                          errors.CompanyName.type === "required"
                            ? "Company Name is required"
                            : ""
                        }
                        onChange={(e) => setCompanyName(e.target.value)}
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
                        value={CompanyAddress}
                        size="small"
                        color="secondary"
                        error={errors.CompanyAddress ? true : false}
                        helperText={
                          errors.CompanyAddress &&
                          errors.CompanyAddress.type === "required"
                            ? "Company Address is required"
                            : ""
                        }
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
                        value={GstNum}
                        size="small"
                        color="secondary"
                        error={errors.GstNum ? true : false}
                        helperText={
                          errors.GstNum && errors.GstNum.type === "required"
                            ? " Gst Number is required"
                            : ""
                        }
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
                        value={Services}
                        size="small"
                        color="secondary"
                        error={errors.Services ? true : false}
                        helperText={
                          errors.Services && errors.Services.type === "required"
                            ? " Services is required"
                            : ""
                        }
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
                        value={ProjectBudget}
                        size="small"
                        color="secondary"
                        error={errors.ProjectBudget ? true : false}
                        helperText={
                          errors.ProjectBudget &&
                          errors.ProjectBudget.type === "required"
                            ? " Approx Budget is required"
                            : ""
                        }
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
                        value={ProjectName}
                        color="secondary"
                        error={errors.ProjectName ? true : false}
                        helperText={
                          errors.ProjectName &&
                          errors.ProjectName.type === "required"
                            ? " Project Name is required"
                            : ""
                        }
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
                        options={options}
                        defaultValue=""
                        value={projectType}
                        onChange={(event, value) => setProjectType(value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Project Type"
                            sx={{ width: "100%" }}
                            variant="outlined"
                            size="small"
                            color="secondary"
                            error={errors.ExpectDate ? true : false}
                            helperText={
                              errors.ExpectDate &&
                              errors.ExpectDate.type === "required"
                                ? "Expected date is required"
                                : ""
                            }
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
                        value={projectCode}
                        size="small"
                        color="secondary"
                        error={errors.ProjectCode ? true : false}
                        helperText={
                          errors.ProjectCode &&
                          errors.ProjectCode.type === "required"
                            ? " Project Code is required"
                            : ""
                        }
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
                        error={errors.ProjectDoc ? true : false}
                        helperText={
                          errors.ProjectDoc &&
                          errors.ProjectDoc.type === "required"
                            ? " Project Document is required"
                            : ""
                        }
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
                        value={ProjectDescp}
                        variant="outlined"
                        size="small"
                        multiline
                        error={errors.ProjectDescp ? true : false}
                        helperText={
                          errors.ProjectDescp &&
                          errors.ProjectDescp.type === "required"
                            ? "Project Description is required"
                            : ""
                        }
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

                     <Grid container display='flex' justifyContent='space-evenly' flexDirection='row' gap={1}> 
                    <Grid
                      item
                      lg={2}
                      sm={4}
                      xl={2}
                      xs={6}
                      md={6}
                      sx={{ py: 2}}
                    >
                      <TeamChipInput setTeamMember={setTeamMember} teamMember={teamMember} />
                    </Grid>

                      <Grid
                      item
                    lg={2}
                    sm={4}
                    xl={2}
                    xs={6}
                    md={6}
                      sx={{ py: 2}}
                    >
                      <ProjectManagerChip setStaffMember={setStaffMember} staffMember={staffMember} RoleId={teamMember} />
                    </Grid>

                      <Grid
                      item
                    lg={2}
                    sm={4}
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
                        value={ProjectStart}
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
                    sm={4}
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
                        value={ProjectEnd}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        color="secondary"
                        onChange={(e) => setProjectEnd(e.target.value)}
                        InputProps={{ inputProps: { min: ProjectStart } }}
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
