import React, { useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Autocomplete } from "@mui/material";
import Heading from '../../Heading';
import Breadcrumbs from '../../Breadcrumbs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import DownloadIcon from '@mui/icons-material/Download';
import { appendData, LeaveApprovaltable, paysliptable } from '../../../Variables/Variables';
import Filter from '../../FilterData/Filter';
import {FilterData} from '../../FilterData/FilterData';
import IconBreadcrumbs from '../../Breadcrumbs';
import axios from 'axios';
import { apply_leave, approve_leave, getall_applied_leave, get_all_pending_leaves, get_user_leave, methodGet, methodPost } from '../../../API_Service/API_Links';
import { useEffect } from 'react';
import RejectReasonDialogBox from '../RejectReasonDialogBox';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

export default function LeaveApproval() {
  const role = JSON.parse(localStorage.getItem('role'));
  const [value, setValue] = React.useState('');
  const { formState: { errors }, handleSubmit } = useForm();
  const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [fromDate , setFromDate] = useState('');
  const [toDate , setToDate] = useState('');
  const [explanation , setExplanation] = useState('');
  const [reason , setReason] = useState('');
  const [record , setRecord] = useState('');
  const [userLeaveData , setUserLeaveData] = useState([]);
  const [allLeaveData , setAllLeaveData] = useState([]);
  const[auth , setAuth] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState();
  const [color, setColor] = useState();
  const [openRejectDialog, setopenRejectDialog] = useState(false);
  const [Notification, setNotification] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isAddedCartSnackbarOpen, setIsAddedCartSnackbarOpen] = useState(false);
  const [allPendingLeaves ,setAllPendingLeaves] = useState([]);

  const id = JSON.parse(localStorage.getItem('EmployeeId'));
 
  const serverData = {
          reason:reason,
          explanation:explanation,
          from_date:fromDate,
          to_date:toDate,
          EmployeeId:id,
        }
  const lData = appendData(serverData);


const SubmitApplication =()=>{
  if(fromDate ==='' && toDate === '' && reason === ''){
     setMessage('Please Fill All the Details');
    }
else{
     axios({
      method: methodPost,
      url: apply_leave,
      data:lData
    })
      .then((res) => {
        if (res.data.error) {
          setMessage(res.data.message);
          setStatus(false);
          setColor(false);
        } else {
          setMessage(res.data.message);
          setStatus(true);
          setColor(true);
          setFromDate('')
          setToDate('')
          setReason('')
          setExplanation('')
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
}
}



  useEffect(()=>{
    const sendData = new FormData()
    sendData.append('EmployeeId', id)
      axios({
      method: methodPost,
      url: get_user_leave,
      data:lData
    })
      .then((res) => {
        if (res.data.error) {
          setMessage(res.data.message);
          setStatus(false);
          setColor(false);
        } else {
          setMessage(res.data.message);
          setUserLeaveData(res.data.data);
          setStatus(true);
          setColor(true);
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
  },[])


    useEffect(()=>{
      axios({
      method: methodGet,
      url: getall_applied_leave,
    })
      .then((res) => {
        if (res.data.error) {
          setMessage(res.data.message);
          setStatus(false);
          setColor(false);
        } else {
          setMessage(res.data.message);
          setAllLeaveData(res.data.data);
          setStatus(true);
          setColor(true);
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
  },[])

  const tableData = role !== 'Super Admin' ? userLeaveData : allLeaveData;
 
  const allPendingLeaveList = () =>{
  const sendData = new FormData()
  sendData.append('EmployeeName', EmployeeName)
  sendData.append('EmployeeId', EmployeeId)
  sendData.append('LeaveDate', value)
  axios({
      method: methodPost,
      url: get_all_pending_leaves,
      data:sendData
    })
      .then((res) => {
        if (res.data.error) {
          setMessage(res.data.message);
          setStatus(false);
          setColor(false);
        } else {
          setMessage(res.data.message);
          setStatus(true);
          setColor(true);
          setAllPendingLeaves(res.data.data)
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
  }
 useEffect(()=>{
  allPendingLeaveList();
  },[])

  const getFilteredPendingLeaves =() =>{
  const sendData = new FormData()
  sendData.append('EmployeeName', EmployeeName)
  sendData.append('EmployeeId', EmployeeId)
  sendData.append('LeaveDate', value)
  axios({
      method: methodPost,
      url: get_all_pending_leaves,
      data:sendData
    })
      .then((res) => {
        if (res.data.error) {
          setMessage(res.data.message);
          setStatus(false);
          setColor(false);
        } else {
          setMessage(res.data.message);
          setStatus(true);
          setColor(true);
          setAllPendingLeaves(res.data.data);
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
  }

 const approveLeave = (id) => {
  const sendData = new FormData()
  sendData.append('id', id)
  axios({
      method: methodPost,
      url: approve_leave,
      data:sendData
    })
      .then((res) => {
        if (res.data.error) {
          setMessage(res.data.message);
          setStatus(false);
          setColor(false);
        } else {
          setMessage(res.data.message);
          setStatus(true);
          setColor(true);
          setIsAddedCartSnackbarOpen(true);
          if(EmployeeId !== ''){
          allPendingLeaveList();
          }
          else{
          getFilteredPendingLeaves();
          }
          setNotification('Leave Approved');
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
 }

   const handleCloseAddedCartSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsAddedCartSnackbarOpen(false);
  };

  const handleOpenRejectDialog = () =>{
   setopenRejectDialog(!openRejectDialog);
   setShowRecorder(true);
  }




    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

   const [showRecorder, setShowRecorder] = useState(false);


  return (
    <Box>
   <Container>
   <Box component={Card} p={4}>
        {
      role === 'Super Admin' ?
      <>
    <Box py={3}>
    <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Filter Leaves To Approve</Typography>
    </Box>
      <Grid container display='flex' justifyContent='space-evenly' alignContent='center'>
      <Grid item xs={3} sm={3} md={3} lg={3}>
      <Box>
      <Box py={2}>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Employee Name</Typography>
      </Box>
        <Box mt={1}>
        <TextField   
        id="EmployeeName" 
        label="Employee Name" variant="outlined" 
        required size='small'  
        color='secondary'
        onChange={(e) => setEmployeeName(e.target.value)}      
      />
        </Box>
        </Box>
         </Grid>

      <Grid item xs={3} sm={3} md={3} lg={3}>
        <Box>
        <Box py={2}>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Employee ID</Typography>
      </Box>
        <Box mt={1}>
        <TextField   
        id="EmployeeId" 
        label="Employee ID" variant="outlined" 
        required size='small'  
        color='secondary'
        onChange={(e) => setEmployeeId(e.target.value)}        
      />
        </Box>
        </Box>
        </Grid>
  
        <Grid item xs={3} sm={3} md={3} lg={3}>
      <Box>
      <Box py={2}>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Select Leave Date</Typography>
      </Box>
      <Box mt={1}>
        <TextField   
        id="EmployeeId" 
        label="Employee ID" 
        variant="outlined" 
        type='date'
        required size='small'  
        color='secondary'
        InputLabelProps={{shrink:true}}
        onChange={(e) => setValue(e.target.value)}        
      />
      </Box>
      </Box>
      </Grid>

      <Grid item xs={3} sm={3} md={3} lg={3}>
      <Box display='flex' justifyContent='center' py={4}>
        <Button variant='contained' sx={{bgcolor:'secondary.main'}} onClick={getFilteredPendingLeaves}>FILTER LEAVES</Button>
      </Box>
      </Grid>
      </Grid>
      </>
   :
      <Box>
      <Grid container spacing={3}>
      <Grid item xs={4} sm={4} md={4} lg={4}>
      <Box>
      <Box py={2}>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Leave From</Typography>
      </Box>
      <Box mt={1}>
        <TextField
      onChange={(e)=>setFromDate(e.target.value)}
      required
      sx={{width:250}}
      type='date'
      name='fromDate'
      size="small"
      label="Leave From"
      id="outlined-size-small"
      InputLabelProps={{
        shrink: true,
      }}
        />
      </Box>
      </Box>
      </Grid>
       <Grid item xs={4} sm={4} md={4} lg={4}>
      <Box>
      <Box py={2}>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Leave Till</Typography>
      </Box>
      <Box mt={1}>
        <TextField
       onChange={(e)=>setToDate(e.target.value)}
      required
     sx={{width:250}}
      type='date'
       name='toDate'
      size="small"
      label="Leave Till"
      id="outlined-size-small"
      InputLabelProps={{
        shrink: true,
      }}
        />
      </Box>
      </Box>
      </Grid>
     <Grid item xs={4} sm={4} md={4} lg={4}>
      <Box>
      <Box py={2}>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Select Reason</Typography>
      </Box>
        <Box mt={1}>
          <Autocomplete
            disablePortal
            onChange={(event, value)=>setReason(value)}
            id="combo-box-demo"
            options={['Health Reason', 'Casual', 'On Duty']}
            renderInput={(params) => <TextField 
            {...params} label="Leave Reason" 
            variant="outlined" 
            sx={{width:250}}
            size='small'
            name='reason'
            color='secondary'
           />}
            />
        </Box> 
        </Box>
         </Grid>

       <Grid item xs={9} sm={9} md={9} lg={9}>
        <Box>
        <Box py={2}>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Reason Explanation</Typography>
      </Box>
        <Box mt={1}>
        <TextField   
        id='explanation'
        multiline
        fullWidth
        rows={2}
        name='explanation'
        label="Leave Your Explanation Here..."
         variant="outlined" 
         size='small'  
        color='secondary'
         onChange={(e)=>setExplanation(e.target.value)}
      />
        </Box>
        </Box>
        </Grid>

        {/* <Grid item xs={3} sm={3} md={3} lg={3}>
        <Box>
        <Box py={2}>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Record and Upload</Typography>
      </Box>
        <Box mt={1}>
        <TextField   
        id='Upload'
        fullWidth
        type='file'
        name='record'
         variant="outlined" 
         size='small'  
        color='secondary'
         onChange={(e)=>setRecord(e.target.files[0])}
      />
        </Box>
        </Box>
        </Grid> */}



      <Grid item xs={12} sm={12} md={12} lg={12}>
      <Box py={3} display='flex' justifyContent='center'>
        <Button onClick={SubmitApplication} variant='contained' sx={{bgcolor:'secondary.main'}}>Submit Application</Button>
      </Box>
      </Grid>
      </Grid>
      </Box>
}

   </Box>
   </Container>
    <Container>
    <Box mt={2} boxShadow={4} p={3} mb={2} bgcolor='#EDF4F4'>
    <Grid container>
                    <TableContainer sx={{border:'1px solid silver'}} >

                    <Table>
                    <TableHead sx={{ whiteSpace: 'nowrap', bgcolor: 'success.main' }}>
                    <TableRow sx={{borderBottom:'1px solid silver'}}>
                      {
                        role ==='Super Admin' && 
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600  }}>
                      Employee Name
                    </TableCell>
                      }
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      <Box sx={{ display: 'flex' , justifyContent:'center'}}>
                      <Box sx={{ my: 'auto' }}>
                         Employee ID
                      </Box>
                      <Box>
                     <Filter search={search} setSearch={setSearch} />
                      </Box>
                  </Box>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                    Leave From
                    </TableCell>
                     <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                    Leave Till
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                    Reason
                    </TableCell>
                 <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                    Explanation
                    </TableCell>{
                      role !== 'Super Admin' &&
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      <Box sx={{ display: 'flex' , justifyContent:'center'}}>
                      <Box sx={{ my: 'auto' }}>
                         Status
                      </Box>
                      <Box>
                     <Filter search={search} setSearch={setSearch} />
                      </Box>
                  </Box>
                    </TableCell>
                    }
                    {
                      role === 'Super Admin' &&
                      <>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Approve
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Reject
                    </TableCell>
                    </>
                    }
                    </TableRow>
                    </TableHead>
                    <TableBody>
                   
                      {
                      allPendingLeaves && allPendingLeaves.filter((data) =>FilterData(data, search, {
                                    searchFeildOne: data.id,
                                    searchFeildTwo:data.status,
                                })).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i,index)=>{
                          return(
                    <TableRow key={index} sx={{borderBottom:'1px solid silver'}}>
                      {
                        role === 'Super Admin' &&
                      <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.ProfileName}</TableCell>
                      }
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.EmployeeId}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.from_date}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.to_date}</TableCell>
                     <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.reason}</TableCell>
                      <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.explanation}</TableCell>
                   {
                    role !== 'Super Admin' && 
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>Pending</TableCell>
                   }
                    {
                      role === 'Super Admin' &&
                      <>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>
                      <div>
                    <Button onClick={()=>approveLeave(i.id)} sx={{bgcolor:'#7bc54c', color:'#333', ':hover':{bgcolor:'#616e80'}}}>
                      Approve
                    </Button>
                   <Snackbar open={isAddedCartSnackbarOpen} autoHideDuration={1000} onClose={handleCloseAddedCartSnackbar}>
                  <Alert onClose={handleCloseAddedCartSnackbar}>
                      {Notification}
                  </Alert>
                  </Snackbar>
                  </div>
                    </TableCell>

                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>
                    <Button onClick={handleOpenRejectDialog} sx={{bgcolor:'red',color:'#333', ':hover':{bgcolor:'#616e80'}}}>
                        Reject
                    </Button>
                    </TableCell>
                    <RejectReasonDialogBox id={i.id} allPendingLeaveList={allPendingLeaveList} getFilteredPendingLeaves={getFilteredPendingLeaves} EmployeeId={EmployeeId} setopenRejectDialog={setopenRejectDialog} openRejectDialog={openRejectDialog} />
                    </>}
                    </TableRow>
                          )
                        })
                      }

                    </TableBody>
                    </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={allPendingLeaves.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Grid>
                  </Box>
                </Container>



  </Box>
  )
}
