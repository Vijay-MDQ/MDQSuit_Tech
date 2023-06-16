import React, { useEffect, useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography,IconButton, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import Heading from '../../Heading';
import Breadcrumbs from '../../Breadcrumbs';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { LeaveApprovaltable, OnBoardtable, paysliptable } from '../../../Variables/Variables';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import EditEmployeeViewForm from './EditEmployeeViewForm';
import { get_all_employee_details, get_employee_detail, get_employee_id, get_employee_name } from '../../../API_Service/API_Links';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { FilterData, FilterSite } from '../../FilterData/FilterData';

export default function EditTab() {


  const { formState: { errors }, handleSubmit } = useForm();
  const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [allEmployee, setAllEmployee] = useState([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [color, setColor] = useState(false);
  const [message, setMessage] = useState("");
  const options = ['Approved', 'Pending', 'Rejected'];
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [EmployeeNameList , setEmployeeNameList] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
};
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};

 const handleOpenEdit = (i) =>{
  navigate('updateemployee', {state:{EmployeeId : i.EmployeeId, EmployeeName:i.EmployeeName}});
 }

  const handleOpenView = (i) => {
    navigate('viewemployee', {state:{EmployeeId : i.EmployeeId, EmployeeName:i.EmployeeName}});
  }


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
              setEmployeeName(res.data.data.EmployeeName);
          }
      }).catch(err => {
          alert('Oops something went wrong ' + err)
      });
  },[EmployeeName])



  const getAllEmployeeAtOnce =() =>{
    const sendData = new FormData()
    sendData.append('EmployeeName', EmployeeName)
    sendData.append('EmployeeId', EmployeeId)
      axios({
          method:'POST',
          url: get_employee_detail,
          data:sendData
      }).then(res => {
          if (res.data.error) {
              setMessage(res.data.message)
              setOpen(true)
              setStatus(false)
              setColor(false)
              setAllEmployee([])
          } else {
              setMessage(res.data.message)
              setOpen(true)
              setStatus(true)
              setColor(true)
              setAllEmployee(res.data.data);
          }
      }).catch(err => {
          alert('Oops something went wrong ' + err)
      });
  }

    useEffect(()=>{
    getAllEmployeeAtOnce();
    }
    ,[])

    const getFilteredEmployee = () =>{
      if(EmployeeName !== ''){
    const sendData = new FormData()
    sendData.append('EmployeeName', EmployeeName)
    sendData.append('EmployeeId', EmployeeId)
      axios({
          method:'POST',
          url: get_employee_detail,
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
              setAllEmployee([res.data.data]);
          }
      }).catch(err => {
          alert('Oops something went wrong ' + err)
      });
    }
    else{
    const sendData = new FormData()
    sendData.append('EmployeeName', '')
    sendData.append('EmployeeId', '')
      axios({
          method:'POST',
          url: get_employee_detail,
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
              setAllEmployee(res.data.data);
          }
      }).catch(err => {
          alert('Oops something went wrong ' + err)
      });
    }
    }
  
 

  return (
    <Box>
     
   <Container>
   <Box component={Card} p={4}>
      <Grid container>
      <Grid item xs={4} sm={4} md={4} lg={4}>
      <Box>
      <Box py={2}>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Employee Id</Typography>
      </Box>
        <Box mt={1}>
        <TextField   
        id="EmployeeId" 
        label="Employee Id" variant="outlined" 
        size='small'  
        color='secondary'
        onChange={(e) => setEmployeeId(e.target.value)}       
      />
        </Box>
        </Box>
         </Grid>

         <Grid item xs={4} sm={4} md={4} lg={4}>
        <Box>
        <Box py={2}>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Employee Name</Typography>
      </Box>
        <Box mt={1}>
        <TextField   
        id="EmployeeName" 
        label="Employee Name" variant="outlined" 
        size='small'  
        color='secondary'
        value={EmployeeName}      
      />
        </Box>
        </Box>
        </Grid>

        <Grid item xs={4} sm={4} md={4} lg={4}>
      <Box display='flex' justifyContent='start' alignSelf='center' py={5}>
        <Button variant='contained' color='secondary' onClick={getFilteredEmployee}>GET EMPLOYEE INFO</Button>
      </Box>
      </Grid>

         </Grid>
    </Box>

    <Box mt={2} p={2} bgcolor='#EDF4F4' boxShadow={2}>
    <Grid container>
                    <TableContainer sx={{border:'1px solid silver'}} >

                    <Table>
                    <TableHead sx={{ whiteSpace: 'nowrap', bgcolor: 'success.main' }}>
                    <TableRow sx={{borderBottom:'1px solid silver'}}>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600  }}>
                    Employee ID
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                     Employee Name
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                     Department
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Role
                    </TableCell> 
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Joined Date
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      View
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Edit
                    </TableCell>
                    </TableRow>
                    </TableHead>


                    <TableBody>
                   
                      {
                      allEmployee && allEmployee.filter((data) =>FilterData(data, search, {
                                    searchFeildOne: data.id,
                                    searchFeildTwo:data.status,
                                })).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i,index)=>{
                          return(
                    <TableRow key={index} sx={{borderBottom:'1px solid silver'}}>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.EmployeeId}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.EmployeeName}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.department}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.role}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.dateOfJoining}</TableCell>
                    <TableCell onClick={()=>handleOpenView(i)} sx={{textAlign:'center',borderBottom:'1px solid silver'}}><IconButton><VisibilityIcon /></IconButton></TableCell>
                     <TableCell onClick={()=>handleOpenEdit(i)} sx={{textAlign:'center',borderBottom:'1px solid silver'}}><IconButton><ModeEditIcon /></IconButton></TableCell>
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
                        count={allEmployee.length}
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
