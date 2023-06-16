import React, { useEffect, useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Autocomplete} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import { add_announcement, add_factory_project, getAllEmployeeName, get_all_emp, get_department, methodGet, methodPost } from '../../../API_Service/API_Links';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { appendData } from '../../../Variables/Variables';
import SnackBar from '../../SnackBar';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function CreateEvent() {


    // const options = ['Project Task', 'Non_Project Task'];

    const { formState: { errors }, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState("");
    const [Announcement, setAnnouncement] = useState("");
    const [Department, setDepartment] = useState("");
    const [Emp_Name, setEmp_name] = useState("");
    const [EmpId, setEmpId] = useState("");
    const [audiofile, setAudiofile] = useState("");
    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    const [startTime, setstartTime] = useState("");
    const [EndTime, setEndTime] = useState("");
    const [Desc, setDesc] = useState("");
    const [Document, setDocument] = useState("");
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);
    const [empname, setEmpname] = useState([]);
    const [isHidden, setIsHidden] = React.useState(false);

    const handleHide = () => {
      setIsHidden(true);
    }
  


    useEffect(() => {
        axios({
          method: methodGet,
          url: getAllEmployeeName,
        })
          .then((res) => {
            if (res.data.error) {
              setMessage(res.data.message);
              setOpen(true);
              setStatus(false);
              setColor(false);
            } else {
              setMessage(res.data.message);
              setEmpname(res.data.data);
              setOpen(true);
              setStatus(true);
              setColor(true);
            }
          })
          .catch((err) => {
            alert("Oops something went wrong " + err);
            console.log("chip1",err);
          });
    }, []);


 useEffect(() => {
     axios({
       method: methodGet,
       url: get_department,
     })
       .then((res) => {
         if (res.data.error) {
           setMessage(res.data.message);
           setOpen(true);
           setStatus(false);
           setColor(false);
         } else {
           setMessage(res.data.message);
           setOptions(res.data.data);
           setOpen(true);
           setStatus(true);
           setColor(true);
         }
       })
       .catch((err) => {
         alert("Oops something went wrong " + err);
         console.log("chip1",err);
       });
 }, []);

    const serverData = {
        title:Announcement,
        departmentId:Department,
        descriptions:Desc,
        startdate:StartDate,
        enddate:EndDate,
        start_time:startTime,
        end_time:EndTime,
        EmployeeId:EmpId,
        employeeName:"",
        AudioFile:audiofile,
        Images:Document,

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
                url: add_announcement,
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
      navigate('/home')
     }

  return (
    <Box>
       <Box sx={{ height:'90%'}} display="flex" alignItems="center">     
       <SnackBar open={open} message={message} setOpen={setOpen} status={status} color={color} />    
                                      
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ px: 5, backgroundColor: '#EDF4F4', borderRadius: '10px',mx:2, my: 4, boxShadow: 11 }}>

             <Grid container justifyContent='center' sx={{ textAlign: 'center' }}  spacing={4}  >
                <Grid item lg={12} xl={12} >
                  
               <Box  
               sx={{ border:"1px solid black" , px:4 , pb:5 ,pt:4 ,borderColor:'#d2cbcb;' , borderRadius:'4px',':hover': {  boxShadow:4},mt:5  }}>
               <Box sx={{ pb: 3 ,textAlign:'left' }}>
                   <h5>CREATE NEW ANNOUNCEMENT / EVENT</h5>
               </Box>
                    <Grid container justifyContent='space-evenly' spacing={2}  >
                        <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}>
                            <TextField fullWidth id="ProjectName" label="Event/Announcement Name" variant="outlined" size='small' color='secondary'
                                error={errors.Announcement ? true : false}
           
                                helperText={(errors.Announcement && errors.Announcement.type === "required") ? " Announcement Name is required" : ""}
                                onChange={(e) => setAnnouncement(e.target.value)}
                            />
                        </Grid>

                       <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}>
                       <FormControl fullWidth size="small" color='secondary'>
                                <InputLabel id="demo-select-small">Department</InputLabel>
                                <Select
                                 onChange={(e) => setDepartment(e.target.value)}
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    label="Department" >
                                    {options.map(option => (
                                    <MenuItem key={option.id} value={option.DepartmentId}>
                                    {option.Department}
                                    </MenuItem>
                                         ))}
                                </Select>
                                </FormControl>
                             
                        </Grid>
                        <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}>
                        <FormControl fullWidth size="small" color='secondary'>
                                <InputLabel id="demo-select-small">Employee Name</InputLabel>
                                <Select
                                 onChange={(e) => setEmpId(e.target.value)}
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    label="Employee Name" >
                                    {empname.map(option => (
                                    <MenuItem key={option.id} value={option.EmployeeId}>
                                    {option.EmployeeName}
                                    </MenuItem>
                                         ))}
                                </Select>
                                </FormControl>
                          
                        </Grid>
                      
                          <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}>
                            <TextField sx={{ width: '100%' }} id="StartDate" label="Event Start Date" type="date" InputLabelProps={{ shrink: true, }} variant="outlined" size='small'color='secondary'
                                error={errors.StartDate ? true : false}
                                helperText={(errors.StartDate && errors.StartDate.type === "required") ? "Start date is required" : ""}
                                onChange={(e) => setStartDate(e.target.value)}
                            />

                        </Grid>

                         <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}>
                            <TextField sx={{ width: '100%' }} id="EndDate" label="Event End Date" type="date" InputLabelProps={{ shrink: true, }} variant="outlined" size='small'color='secondary'
                                error={errors.EndDate ? true : false}
                                helperText={(errors.EndDate && errors.EndDate.type === "required") ? "End date is required" : ""}
                                onChange={(e) => setEndDate(e.target.value)}
                            />

                        </Grid>

                               <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}>
                            <TextField sx={{ width: '100%' }} id="startTime" label="Event Start Time" type="time" InputLabelProps={{ shrink: true, }} variant="outlined" size='small'color='secondary'
                                error={errors.startTime ? true : false}
                                helperText={(errors.startTime && errors.startTime.type === "required") ? "Start time is required" : ""}
                                onChange={(e) => setstartTime(e.target.value)}
                            />

                        </Grid>

                         <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}>
                            <TextField sx={{ width: '100%' }} id="EndTime" label="Event End Time" type="time" InputLabelProps={{ shrink: true, }} variant="outlined" size='small'color='secondary'
                                error={errors.EndTime ? true : false}
                                helperText={(errors.EndTime && errors.EndTime.type === "required") ? "End Time is required" : ""}
                                onChange={(e) => setEndTime(e.target.value)}
                            />

                        </Grid>

                            <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}>
                            <TextField 
                            fullWidth 
                            id="Document" 
                            label="Event Images" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                            error={errors.Document ? true : false}
                            helperText={(errors.Document && errors.Document.type === "required") ? "Document is required" : ""}
                            type="file"
                            onChange={(e) => setDocument(e.target.files[0])}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </Grid>
                        {isHidden &&
                         <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}>
                            <TextField 
                            fullWidth 
                            id="audiofile" 
                            label="Voice Note" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                            type="file"
                            onChange={(e) => setAudiofile(e.target.files[0])}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </Grid>
}

                        <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 3 }}  >
                            <TextField fullWidth id="Desc" rows={4} label="Event Description" color='secondary' variant="outlined" multiline
                                error={errors.Desc ? true : false}
                                helperText={(errors.Desc && errors.Desc.type === "required") ? "Announcement Description is required" : ""}
                                onChange={(e) => setDesc(e.target.value)}
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