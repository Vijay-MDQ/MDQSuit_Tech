import React, { useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Autocomplete} from "@mui/material";
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import { add_factory_project, methodPost } from '../../API_Service/API_Links';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { appendData } from '../../Variables/Variables';
import SnackBar from '../SnackBar';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import IconBreadcrumbs from '../Breadcrumbs';
import Heading from '../Heading';

export default function TaskViewForm() {


    const options = ['Project Task', 'Non_Project Task'];

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
    const navigate = useNavigate();

    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
      ]);
    
      const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
      };

      const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
      }));

    const serverData = {
        CustomerName: CustomerName,
        MobileNum: MobileNum,
        Email: Email,
        CompanyName: CompanyName,
        CompanyAddress: CompanyAddress,
        GstNum: GstNum,
        Services: Services,
        ProjectName: ProjectName,
        ProjectDescp: ProjectDescp,
        ExpectDate: ExpectDate,
        ProjectBudget: ProjectBudget,
        ProjectStart: ProjectStart,
        ProjectDoc: projectdocument

    }
    const sendData = appendData(serverData);
    const onSubmit = () => {
        // const serverData = new FormData()
        // for (var key in data) {
        //   serverData.append(key, data[key]);
        // }
        if (!navigator.onLine) {
            setMessage('Your internet is in Offline')
            setOpen(true)
            setStatus(false)
            setColor(false)
        } else {
            axios({
                method: methodPost,
                url: add_factory_project,
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

                }
            }).catch(err => {
                alert('Oops something went wrong ' + err)
            });
        }

    }

     const cancelClick = () =>{
      navigate(-1);
     }

  return (
    <Box p={3}>


   <Box py={2} px={1}>
    <IconBreadcrumbs 
    previous={'Home'}
    current={'Task'}
    link1={`/home`}
    link2={'/home/task'}
    currentSection={'View Task'}
    
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading  title={'View Task'}/>
      </Box> 
    </Container>


       <Box sx={{ height:'90%'}} display="flex" alignItems="center">     
       <SnackBar open={open} message={message} setOpen={setOpen} status={status} color={color} />    
                                      
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Box p={2} sx={{ px: 5, backgroundColor: '#EDF4F4', borderRadius: '10px',mx:4, my: 6, boxShadow: 11 }}>

             <Grid container justifyContent='center' sx={{ textAlign: 'center' }}  spacing={4}  >
                <Grid item lg={12} xl={12} >
                  
               <Box  sx={{ border:"1px solid black" , px:4 , pb:5 ,pt:4 ,borderColor:'#d2cbcb;' , borderRadius:'4px',':hover': {  boxShadow:2},mt:5  }}>
               <Box sx={{ pb: 3 ,textAlign:'left' }}>
                   <h5>TASK ASSIGNMENT</h5>
               </Box>
                    <Grid container justifyContent='space-evenly' spacing={2}  >
                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField fullWidth id="ProjectName" label="Task Name" variant="outlined" size='small'color='secondary'
                                error={errors.ProjectName ? true : false}
                                helperText={(errors.ProjectName && errors.ProjectName.type === "required") ? " Project Name is required" : ""}
                                onChange={(e) => setProjectName(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                        <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={options}
                                renderInput={(params) => <TextField 
                                {...params} label="Task Type" 
                                sx={{ width: '100%' }}
                                variant="outlined" size='small'color='secondary'
                                error={errors.ExpectDate ? true : false}
                                helperText={(errors.ExpectDate && errors.ExpectDate.type === "required") ? "Expected date is required" : ""}
                                onChange={(e) => setExpectDate(e.target.value)}
                                />}
                        />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField fullWidth id="ProjectName" label="Task Code" variant="outlined" size='small'color='secondary'
                                error={errors.ProjectName ? true : false}
                                helperText={(errors.ProjectName && errors.ProjectName.type === "required") ? " Project Name is required" : ""}
                                onChange={(e) => setProjectName(e.target.value)}
                            />
                        </Grid>


                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                            <TextField fullWidth id="ProjectBudget" label="Department" variant="outlined" size='small'color='secondary'
                                error={errors.ProjectBudget ? true : false}
                                helperText={(errors.ProjectBudget && errors.ProjectBudget.type === "required") ? " Approx Budget is required" : ""}
                                onChange={(e) => setProjectBudget(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                            <TextField fullWidth id="ProjectBudget" label="Resources" variant="outlined" size='small'color='secondary'
                                error={errors.ProjectBudget ? true : false}
                                helperText={(errors.ProjectBudget && errors.ProjectBudget.type === "required") ? " Approx Budget is required" : ""}
                                onChange={(e) => setProjectBudget(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                            <TextField sx={{ width: '100%' }} id="ProjectStart" label="Project Start Date" variant="outlined" size='small'color='secondary' type="date" InputLabelProps={{ shrink: true, }}
                                error={errors.ProjectStart ? true : false}
                                helperText={(errors.ProjectStart && errors.ProjectStart.type === "required") ? "Date of project is required" : ""}
                                onChange={(e) => setProjectStart(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                            <TextField sx={{ width: '100%' }} id="ExpectDate" label="Expected Completion Date" type="date" InputLabelProps={{ shrink: true, }} variant="outlined" size='small'color='secondary'
                                error={errors.ExpectDate ? true : false}
                                helperText={(errors.ExpectDate && errors.ExpectDate.type === "required") ? "Expected date is required" : ""}
                                onChange={(e) => setExpectDate(e.target.value)}
                            />

                        </Grid>


                       
                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                            <TextField sx={{ width: '100%' }} id="ExpectDate" label="Deadline" type="date" InputLabelProps={{ shrink: true, }} variant="outlined" size='small'color='secondary'
                                error={errors.ExpectDate ? true : false}
                                helperText={(errors.ExpectDate && errors.ExpectDate.type === "required") ? "Expected date is required" : ""}
                                onChange={(e) => setExpectDate(e.target.value)}
                            />

                        </Grid>


                        <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 3 }}  >
                            <TextField fullWidth id="ProjectDescp" rows={4} label="Project Description" color='secondary' variant="outlined" multiline
                                error={errors.ProjectDescp ? true : false}
                                helperText={(errors.ProjectDescp && errors.ProjectDescp.type === "required") ? "Project Description is required" : ""}
                                onChange={(e) => setProjectDescp(e.target.value)}
                            />

                        </Grid>


                    </Grid>
                    </Box>
                   
                   
                </Grid >
                </Grid>      

                                                           {/* {buttons}  */} 

                <Grid container justifyContent='center' sx={{ textAlign: 'center' ,mt:3 }}>
                        <Grid item lg={6} xl={6} xs={12} >
                            <Grid container justifyContent='space-evenly' alignItems='center'>
                                <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2 }} >
                                    <Stack spacing={2} direction="row" >
                                        <Button fullWidth variant="outlined"
                                            type='submit' sx={{ color: 'white', backgroundColor: '#7bc54c', borderColor: '#7bc54c', ':hover': {  borderColor: '#7bc54c', color: '#000000' } }}>Submit</Button>
                                    </Stack>

                                </Grid>

                                <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2 }}>
                                    <Stack spacing={2} direction="row">

                                        <Button fullWidth variant="outlined" onClick={cancelClick}
                                            type='cancel'sx={{ color: 'white', backgroundColor: '#c62828', borderColor: '#c62828' , ':hover': {  borderColor: '#c62828', color: '#000000' } }}>Cancel</Button>
                                            

                                    </Stack>

                                </Grid>

                            </Grid>


                        </Grid>

                    </Grid>

            </Box >
           
            </Form>
            </Box >


            </Box>
  )
}
