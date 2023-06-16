import React, { useEffect, useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Autocomplete} from "@mui/material";
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import { add_factory_project,getParticularTask,update_task_details ,getAllEmployeeName, get_department, insertTask, methodPost } from "../../API_Service/API_Links";
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { appendData } from '../../Variables/Variables';
import SnackBar from '../SnackBar';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import IconBreadcrumbs from '../Breadcrumbs';
import Heading from '../Heading';

export default function TaskEditForm() {


    const options = ['Project Task', 'Non_Project Task'];

    const { formState: { errors }, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [TaskName, setTaskName] = useState("");
    const [TaskType , setTaskType] = useState('');
    const [TaskCode, setTaskCode] = useState('');
    const [Department , setDepartment] = useState('');
    const [Resource, setResource] = useState('')
    const [DepartmentId , setDepartmentId] = useState('');
    const [ResourceId, setResourceId] = useState('')
    const [StartDate , setStartDate] = useState('')
    const [ExpectedDate, setExpectedDate] = useState('')
    const [Deadline, setDeadLine] = useState('')
    const [ProjectDesc, setProjectDesc] = useState('');
    const [departmentList , setDepartmentList] = useState([]);
    const [allEmployeeName, setAllEmployeeName] = useState([]);
    const [allTask , setAllTask] = useState([]);


    useEffect(()=>{
      axios({
          method:'GET',
          url: get_department,
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
              setDepartmentList(res.data.data);
          }
      }).catch(err => {
          alert('Oops something went wrong ' + err)
      });
    }
    ,[])


    useEffect(()=>{
      axios({
          method:'GET',
          url: getAllEmployeeName,
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
              setAllEmployeeName(res.data.data);
          }
      }).catch(err => {
          alert('Oops something went wrong ' + err)
      });
    }
    ,[])


    const getOneParticularTask = () =>{
    const serverData = new FormData();
    serverData.append('id', location.state.id)
         axios({
          method:'POST',
          url: getParticularTask,
          data:serverData
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
              setTaskName(res.data.data.taskName)
              setTaskType(res.data.data.taskType)
              setTaskCode(res.data.data.taskCode)
              setDepartment(res.data.data.department)
              setDepartmentId(res.data.data.departmentId)
              setResource(res.data.data.Members)
              setResourceId(res.data.data.employeeId)
              setStartDate(res.data.data.startdate)
              setExpectedDate(res.data.data.expected_completion_date)
              setDeadLine(res.data.data.enddate)
              setProjectDesc(res.data.data.descriptions)
          }
      }).catch(err => {
          alert('Oops something went wrong ' + err)
      });
    }

    useEffect(() => {
     getOneParticularTask();
    }, [])
    

    const serverData = {
        Name:TaskName,
        Type:TaskType,
        code:TaskCode,
        departmentId:DepartmentId,
        employeeId:ResourceId,
        startDate:StartDate,
        endDate:Deadline,
        expectedCompletionDate:ExpectedDate,
        descriptions:ProjectDesc,
        taskId:location.state.id
    }
    const sendData = appendData(serverData);
    const onSubmit = () => {
        if (!navigator.onLine) {
            setMessage('Your internet is in Offline')
            setOpen(true)
            setStatus(false)
            setColor(false)
        } else {
            axios({
                method: methodPost,
                url: update_task_details,
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
    currentSection={'Edit Tasks'}
    
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading  title={'Edit Task'}/>
      </Box> 
    </Container>

       <Box  sx={{ height:'90%'}} display="flex" alignItems="center">     
       <SnackBar open={open} message={message} setOpen={setOpen} status={status} color={color} />    
                                      
         <Box py={4} sx={{ px: 5, backgroundColor: '#EDF4F4', borderRadius: '10px',mx:2, my: 4, boxShadow: 11 }}>

             <Grid container justifyContent='center' sx={{ textAlign: 'center' }}  spacing={4}  >
                <Grid item lg={12} xl={12} >
                  
               <Box  sx={{ border:"1px solid black" , px:4 , pb:5 ,pt:4 ,borderColor:'#d2cbcb;' , borderRadius:'4px',':hover': {  boxShadow:2},mt:5  }}>
               <Box sx={{ pb: 3 ,textAlign:'left' }}>
                   <h5>TASK ASSIGNMENT</h5>
               </Box>
                    <Grid container justifyContent='space-evenly' spacing={2}  >
                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Task Name" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                            value={TaskName}
                               InputLabelProps={{ shrink: true }}
                             onChange={(e) => setTaskName(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                        <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={options}
                                value={TaskType}
                                onChange={(event, value)=>setTaskType(value)}
                                renderInput={(params) => <TextField 
                                {...params} label="Task Type" 
                                sx={{ width: '100%' }}
                                variant="outlined" 
                                size='small'
                                color='secondary'
                                />}
                        />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Task Code" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                            value={TaskCode}
                               InputLabelProps={{ shrink: true }}
                            onChange={(e) => setTaskCode(e.target.value)}
                            />
                        </Grid>


                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                         <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={departmentList}
                            getOptionLabel={(option) => option.Department}
                                value={
                                    departmentList.find((option) => option.DepartmentId === DepartmentId) ||
                                    null
                                }
                                onChange={(event, value) => {
                                    if (value) {
                                    setDepartment(value.Department);
                                    setDepartmentId(value.DepartmentId);
                                    }
                                }}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                label="Department"
                                sx={{ width: "100%" }}
                                variant="outlined"
                                size="small"
                                color="secondary"
                                />
                            )}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                           <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={allEmployeeName}
                        value={allEmployeeName.find((option) => option.EmployeeId === ResourceId) || null}
                        getOptionLabel={(option) => `${option.EmployeeName} (${option.EmployeeId})`}
                        onChange={(event, value)=>{
                        if (value) {
                        setResource(`${value.EmployeeName} (${value.EmployeeId})`)
                        setResourceId(value.EmployeeId)
                      }
                      }}
                        renderInput={(params) => ( <TextField {...params} 
                        label="Resources"
                        sx={{ width: "100%" }} variant="outlined"
                        size="small" color="secondary"
                          />
                        )}
                      />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                            <TextField 
                            sx={{ width: '100%' }} 
                            id="ProjectStart" 
                            label="Project Start Date" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                             type="date" 
                             value={StartDate}
                             InputLabelProps={{ shrink: true, }}
                            onChange={(e) => setStartDate(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                            <TextField 
                            sx={{ width: '100%' }}
                             id="ExpectDate"
                              label="Expected Completion Date"
                               type="date"
                                InputLabelProps={{ shrink: true, }} 
                                variant="outlined"
                                 size='small'
                                 color='secondary'
                                 value={ExpectedDate}
                                onChange={(e) => setExpectedDate(e.target.value)}
                            />

                        </Grid>


                       
                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                            <TextField 
                            sx={{ width: '100%' }}
                             id="ExpectDate" 
                             label="Deadline" 
                             type="date"
                              InputLabelProps={{ shrink: true, }} 
                              variant="outlined"
                               size='small'
                               color='secondary'
                               value={Deadline}
                                onChange={(e) => setDeadLine(e.target.value)}
                            />

                        </Grid>


                        <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 3 }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectDescp" 
                            rows={4} 
                            label="Project Description"
                            color='secondary'
                            variant="outlined"
                            multiline
                            value={ProjectDesc}
                             onChange={(e) => setProjectDesc(e.target.value)}
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
                                        <Button onClick={onSubmit} fullWidth variant="outlined"
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
            </Box >


            </Box>
  )
}
