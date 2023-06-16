import React, { useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import Heading from '../Heading';
import Breadcrumbs from '../Breadcrumbs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import DownloadIcon from '@mui/icons-material/Download';
import { LeaveApprovaltable, paysliptable } from '../../Variables/Variables';
import Autocomplete from '@mui/material/Autocomplete';
import IconBreadcrumbs from '../Breadcrumbs';
import { getAllFundRequest, get_all_view_leaves, methodPost } from '../../API_Service/API_Links';
import { useEffect } from 'react';
import axios from 'axios';
import { FilterData } from '../FilterData/FilterData';

export default function FundRequestView() {

  const [value, setValue] = React.useState(dayjs('2022-04-07'));
  const { formState: { errors }, handleSubmit } = useForm();
  const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");
  const [page, setPage] = useState(0);
  const [LeaveStatus, setLeaveStatus] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState();
  const [color, setColor] = useState();
  const [search, setSearch] = useState("");
  const[viewallfundreq, setViewallFundrequest] = useState([]);
 
 
  const role = JSON.parse(localStorage.getItem('role'));
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
};
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};
 


  useEffect(()=>{
    axios({
         method:'GET',
         url: getAllFundRequest,
     }).then(res => {
         if (res.data.error) {
             setMessage(res.data.message)
             setOpen(true)
             setStatus(false)
             setColor(false)
         } else {
             setMessage(res.data.message)
             setViewallFundrequest(res.data.data)
             setOpen(true)
             setStatus(true)
             setColor(true)
         }
     }).catch(err => {
         alert('Oops something went wrong ' + err)
     });
 },[]);
 

  return (
    <Box>
   <Container>
   <Box component={Card} p={4} bgcolor='#EDF4F4' mb={2}>
 
    <Box mt={2} py={4}>
    <Grid container spacing={1}>
                    <TableContainer sx={{border:'1px solid silver'}} >

                    <Table>
                    <TableHead sx={{ whiteSpace: 'nowrap', bgcolor: 'success.main' }}>
                    <TableRow sx={{borderBottom:'1px solid silver'}}>
                    {/* <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                    Progile Image
                    </TableCell> */}
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600  }}>
                      Employee Name
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Employee ID
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                    Project Code
                    </TableCell>
                   <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                    Request To
                    </TableCell>
                   <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                    Amount
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                    Message From Employee
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                    Reason For Rejection
                    </TableCell>
                  
                    </TableRow>
                    </TableHead>


                    <TableBody>
                    { viewallfundreq.filter((data) =>FilterData(data, search, {
                                    searchFeildOne: data.employee_id,
                                    searchFeildTwo:data.user_name,
                                })).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data,index)=>{
                          return(
                    <TableRow  sx={{borderBottom:'1px solid silver'}}>
                    {/* <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}><img src="`https://mdqualityapps.in/API/igreen_cms/UAT/fund_request/`{data.profile_image}" /></TableCell> */}
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{data.user_name}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{data.employee_id}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{data.project_code}</TableCell>
                     <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{data.request_to}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{data.amount}
                    </TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{data.message}
                    </TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>
                        {data.approved === 1 ? 'Approved' :
                          data.approved === 0 ? 'Pending' :
                          data.approved === 2 ? 'Rejected' :
                          ''}
                    </TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{data.reject_reason}
                    </TableCell>
                    </TableRow>
                     )})}
                    </TableBody>
                    </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={viewallfundreq.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Grid>
                  </Box>
                </Box>
                </Container>
                

  </Box>
  )
}
