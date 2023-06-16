import {Box,Button,Card,Grid,TextField,Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import React from 'react'
import Heading from '../../Heading';
import Breadcrumbs from '../../Breadcrumbs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import DownloadIcon from '@mui/icons-material/Download';
import { allComplaintsTable, appendData, LeaveApprovaltable, paysliptable } from '../../../Variables/Variables';
import Autocomplete from '@mui/material/Autocomplete';
import Filter from '../../FilterData/Filter';
import {FilterData} from '../../FilterData/FilterData';
import IconBreadcrumbs from '../../Breadcrumbs';
import axios from 'axios';
import { addincentives, get_all_escalation, get_department, get_employee_name, get_factory_employees, methodGet, methodPost } from '../../../API_Service/API_Links';
import { useState } from "react";
import { useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";


export default function CreateIncentive({setValue,isAddedCartSnackbarOpen, setIsAddedCartSnackbarOpen, setNotification}) {

  const [EmployeeNameList, setEmployeeNameList] = useState("");
   const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");
  const [employeeList , setEmployeeList] = useState([]);
  const [Amount, setAmount] = useState('');
  const [Remarks, setRemarks] = useState('');
  const [Type , setType] = useState([]);
  const options = ['OT', 'BONUS', 'OTHER'];
  const [Dept , setDept] = useState([]);
  const [ selectedDept , setSelectedDept] = useState('');
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [color, setColor] = useState(false);
  const [message, setMessage] = useState("");
  const [allIncentive, setAllIncentive] = useState([]);

  
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
           setDept(res.data.data);
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
    if(selectedDept !== ''){
    const sendData = new FormData();
    sendData.append("DepartmentId", selectedDept);

    axios({
      method: methodPost,
      url: get_factory_employees,
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
          setEmployeeList(res.data.data);
          setOpen(true);
          setStatus(true);
          setColor(true);
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
    }
    else{
      setEmployeeList([]);
    }
  }, [selectedDept]);


    useEffect(()=>{
    const sendData = new FormData()
    sendData.append('EmployeeId', EmployeeId)
      axios({
          method:'POST',
          url: get_employee_name,
          data:sendData
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
              setEmployeeNameList(res.data.data[0]);
          }
      }).catch(err => {
          alert('Oops something went wrong ' + err)
      });
  },[EmployeeId])


       const StoredSelectedIncentive = () =>{
       const newObject = {incentiveType:Type , incentiveAmount: Amount};
       setAllIncentive([...allIncentive , newObject]);
       setType([]);
       setAmount('');
     }

     

     
        const obj = {
         'incentive' : JSON.stringify(allIncentive),
        }

    const sendData = appendData(obj);
    sendData.append('employeeId', EmployeeId);
    sendData.append('remarks', Remarks);
     const onSubmit = () => {
        if (!navigator.onLine) {
            setMessage('Your internet is in Offline')
            setOpen(true)
            setStatus(false)
            setColor(false)
        } 
        if(selectedDept !== '' && allIncentive.length !== 0)
         {
            axios({
              method: methodPost,
              url: addincentives,
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
                 setType([]);
                 setAmount('');
                 setAllIncentive([]);
                 setEmployeeList([]);
                 setSelectedDept('');
                 setEmployeeId('');
                 setEmployeeName('');
                 setDept([]);
                 setRemarks('');
                setIsAddedCartSnackbarOpen(true);
                setNotification('Incentive Successfully Created ');
                setValue('2') 
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

  return (
    <Box>
    <Container>
   <Box component={Card} p={4}>


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
      <Grid container rowSpacing={2}>

      <Grid item xs={12} sm={12} md={4} lg={4}>
      <Box mb={3}>
      <Box>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Department</Typography>
      </Box>
        <Box mt={1}>
        <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={selectedDept}
      options={Dept.map((i)=>i.Department)}
      onChange={(event, value) => setSelectedDept(value)}
      size='small' 
      sx={{width:250}}
      renderInput={(params) => <TextField  color='secondary' {...params} label="Department" />}
        />
        </Box>
        </Box>
         </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4}>
        <Box mb={3}>
        <Box>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Employee ID</Typography>
      </Box>
        <Box mt={1}>
        <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={employeeList.map((i)=>i.EmployeeId)}
      onChange={(event, value)=>setEmployeeId(value)}
      size='small' 
      value={EmployeeId}
      sx={{width:250}}
      renderInput={(params) => <TextField  color='secondary' {...params} label="Employee ID" />}
        />
        </Box>
        </Box>
        </Grid>

     <Grid item xs={12} sm={12} md={4} lg={4}>
        <Box mb={3}>
        <Box>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Employee Name</Typography>
      </Box>
        <Box mt={1}>
        <TextField   
        id="EmployeeName" 
        label="Employee Name" variant="outlined" 
        required size='small'  
        color='secondary'
          sx={{width:250}}
          InputLabelProps={{
            shrink:true
          }}
        value={EmployeeNameList.EmployeeName}        
      />
        </Box>
        </Box>
        </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
      <Box mb={3}>
      <Box>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Incentive Type</Typography>
      </Box>
        <Box mt={1}>
        <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      value={Type}
      onChange={(event, value)=>setType(value)}
      size='small' 
      sx={{width:250}}
      renderInput={(params) => <TextField  color='secondary' {...params} label="Incentive Type" />}
        />
        </Box>
        </Box>
         </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
        <Box mb={3}>
        <Box>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Amount</Typography>
      </Box>
        <Box mt={1}>
        <TextField   
        id="amount" 
        label="Amount" variant="outlined" 
        required size='small'  
        color='secondary'
        sx={{width:250}}
        value={Amount}
        onChange={(e) => setAmount(e.target.value)}        
      />
        </Box>
        </Box>
        </Grid>

       <Grid item xs={12} sm={12} md={4} lg={4}>
        <Box mb={3}>
        <Box>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Add Incentive</Typography>
      </Box>
        <Box mt={1}>
        <Button variant='contained' fullWidth onClick={StoredSelectedIncentive}>Add +</Button>
        </Box>
        </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={8} lg={8}>
        <Box mb={3}>
        <Box>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Remarks</Typography>
      </Box>
        <Box mt={1}>
        <TextField   
        id="remarks" 
        rows={2}
        multiline
        value={Remarks}
        label="Remarks" variant="outlined" 
        size='small'  
        color='secondary'
         fullWidth
       onChange={(e) => setRemarks(e.target.value)}      
      />
        </Box>
        </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} display='flex' justifyContent='center' >
        <Box mb={3}>
        <Box>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Incentives</Typography>
      </Box>
        <Box mt={1}>
            {
                allIncentive.map((i)=>{
                    return(
                        <Typography>{i.incentiveType} : ₹{i.incentiveAmount} </Typography>
                    )
                })
            }
        </Box>
        </Box>
        </Grid>

        </Grid>
        </Box>
 
      <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12}>
      <Box display='flex' justifyContent='center' py={2}>
        <Button variant='contained' color='secondary' onClick={onSubmit}  fullWidth>Create Incentive</Button>
      </Box>
      </Grid>
      </Grid>

      </Box>
    </Container>
    </Box>
  )
}
