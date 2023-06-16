import React, { useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import Heading from '../../Heading';
import Breadcrumbs from '../../Breadcrumbs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import DownloadIcon from '@mui/icons-material/Download';
import { LeaveApprovaltable, paysliptable } from '../../../Variables/Variables';
import Autocomplete from '@mui/material/Autocomplete';
import IconBreadcrumbs from '../../Breadcrumbs';
import { get_all_view_leaves, methodPost } from '../../../API_Service/API_Links';
import { useEffect } from 'react';
import axios from 'axios';
import { FilterData } from '../../FilterData/FilterData';

export default function ViewLeaves() {

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
  const[viewallLeaves, setViewallLeaves] = useState([]);
 const options = [
  { id: 1, label: 'Approved' },
  { id: 0, label: 'Pending' },
  { id: 2, label: 'Rejected' },
];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
};
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};
 
  const role = JSON.parse(localStorage.getItem('role'));

  console.log("",LeaveStatus);

  const getAllLeaves = () =>{
  const sendData = new FormData()
  sendData.append('approved', LeaveStatus)
  axios({
      method: methodPost,
      url: get_all_view_leaves,
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
          setViewallLeaves(res.data.data);
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
  }

  useEffect(()=>{
    getAllLeaves();
  },[LeaveStatus])
 
  console.log("",LeaveStatus);

  return (
    <Box>
   <Container>
   <Box component={Card} p={4} bgcolor='#EDF4F4' mb={2}>
    <Box py={3}>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option.label}
      onChange={(event, value)=>setLeaveStatus(value.id)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField color='secondary' {...params} label="Leave Status" />}
    />
    </Box>
    <Box mt={2} py={4}>
    <Grid container spacing={1}>
                    <TableContainer sx={{border:'1px solid silver'}} >

                    <Table>
                    <TableHead sx={{ whiteSpace: 'nowrap', bgcolor: 'success.main' }}>
                    <TableRow sx={{borderBottom:'1px solid silver'}}>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600  }}>
                      Employee Name
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Employee ID
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
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Status
                    </TableCell>
                    </TableRow>
                    </TableHead>


                    <TableBody>
                      {
                        viewallLeaves.filter((data) =>FilterData(data, search, {
                                    searchFeildOne: data.id,
                                    searchFeildTwo:data.status,
                                })).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i,index)=>{
                          return(
                    <TableRow key={index} sx={{borderBottom:'1px solid silver'}}>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.ProfileName}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.EmployeeId}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.from_date}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.to_date}</TableCell>
                     <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.reason}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.explanation}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>
                        {i.approved === 1 ? 'Approved' :
                          i.approved === 0 ? 'Pending' :
                          i.approved === 2 ? 'Rejected' :
                          ''}
                    </TableCell>
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
                        count={viewallLeaves.length}
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
