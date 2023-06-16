import React, { useEffect, useState } from 'react'
import {Box,Button,Card,Grid,TextField,Autocomplete, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import Heading from '../Heading';
import Breadcrumbs from '../Breadcrumbs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import DownloadIcon from '@mui/icons-material/Download';
import { ctctable, incentivetable, paysliptable } from '../../Variables/Variables';
import IconBreadcrumbs from '../Breadcrumbs';
import { get_all_ctc, get_employee_id, get_employee_name } from '../../API_Service/API_Links';
import axios from 'axios';
import { FilterData, FilterSite } from '../FilterData/FilterData';

export default function CTCSection() {


  const [value, setValue] = React.useState(dayjs('2022-04-07'));
  const { formState: { errors }, handleSubmit } = useForm();
  const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");
  const [JoinDate , setJoinDate] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [allCTC , setAllCTC] = useState([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [color, setColor] = useState(false);
  const [message, setMessage] = useState("");
  const [EmployeeIdList , setEmployeeIdList] = useState([]);
  const [search, setSearch] = useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
};
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};


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
              setEmployeeIdList(res.data.data);
          }
      }).catch(err => {
          alert('Oops something went wrong ' + err)
      });
  },[EmployeeId])

    const selectedName = EmployeeIdList.map((i)=>i.EmployeeName);

 
     useEffect(()=>{
      const sendData = new FormData()
      sendData.append('EmployeeName', '')
      sendData.append('EmployeeId', '')
      sendData.append('JoiningDate', '')
     axios({
          method:'POST',
          url: get_all_ctc,
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
              setAllCTC(res.data.data);
          }
      }).catch(err => {
          alert('Oops something went wrong ' + err)
      });
  },[EmployeeId]);


    const getFilteredCTC = () =>{
      if(EmployeeId !== ''){
    const sendData = new FormData()
      sendData.append('EmployeeName', EmployeeName)
      sendData.append('EmployeeId', EmployeeId)
      sendData.append('JoiningDate', JoinDate)
      axios({
          method:'POST',
          url: get_all_ctc,
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
              setAllCTC(res.data.data);
          }
      }).catch(err => {
          alert('Oops something went wrong ' + err)
      });
    }
    else{
    const sendData = new FormData()
      sendData.append('EmployeeName', '')
      sendData.append('EmployeeId', '')
      sendData.append('JoiningDate', '')
      axios({
          method:'POST',
          url: get_all_ctc,
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
              setAllCTC(res.data.data);
          }
      }).catch(err => {
          alert('Oops something went wrong ' + err)
      });
    }
    }



  return (
    <Box>

      <Box py={2} px={1}>
    <IconBreadcrumbs
    previous={'Home'}
    current={'HRMS'}
    currentSection={'CTC'}
    link1={`/home`}
    link2={'/home/HRMS'}
    
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading  title={'CTC'}/>
      </Box>
    </Container>

    
    <Container>
   <Box component={Card} p={4}>
      <Grid container>
      <Grid item xs={3} sm={3} md={3} lg={3}>
      <Box>
      <Box py={2}>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Employee ID</Typography>
      </Box>
        <Box mt={1}>
        <TextField   
        id="EmployeeName" 
        label="Employee ID" 
        variant="outlined" 
        size='small'  
        color='secondary'
        value={EmployeeId}
        onChange={(e) => setEmployeeId(e.target.value)}       
      />
        </Box>
        </Box>
         </Grid>

      <Grid item xs={3} sm={3} md={3} lg={3}>
        <Box>
        <Box py={2}>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Employee Name</Typography>
      </Box>
        <Box mt={1}>
         <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={[...selectedName]}
        onChange={(event, value)=>setEmployeeName(value)}
        renderInput={(params) => ( <TextField {...params} 
        label="Employee Name"
        InputLabelProps={{shrink:true}}
        sx={{ width: 220 }} variant="outlined"
        size="small" color="secondary"
        />
        )}
        />
        </Box>
        </Box>
        </Grid>
  
        <Grid item xs={3} sm={3} md={3} lg={3}>
      <Box>
      <Box py={2}>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Select Joining Date</Typography>
      </Box>
      <Box mt={1}>
        <TextField   
        id="EmployeeId" 
        label="Joining Date" 
        type='date'
        variant="outlined" 
        required 
        size='small'  
         InputLabelProps={{shrink:true}}
        color='secondary'
        onChange={(e) => setJoinDate(e.target.value)}
      />
      </Box>
      </Box>
      </Grid>

      <Grid item xs={3} sm={3} md={3} lg={3}>
      <Box display='flex' justifyContent='center' py={4}>
        <Button onClick={getFilteredCTC} variant='contained' sx={{bgcolor:'secondary.main'}} >GET CTC Data</Button>
      </Box>
      </Grid>
      </Grid>
   

   </Box>
   </Container>


    <Container>
      <Box mt={2} p={3} boxShadow={5} mb={2} bgcolor='#EDF4F4'>
      <Box display='flex' justifyContent='end' py={2}>
      <Button variant='contained' sx={{bgcolor:'secondary.main'}} >GET ALL CTC DATA</Button>
      </Box>
    <Grid container>
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
                      Joining Date
                    </TableCell> 
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      CTC
                    </TableCell>
                    </TableRow>
                    </TableHead>


                    <TableBody>
                   
                      {
                       allCTC.filter((data) =>FilterData(data, search, {
                                    searchFeildOne: data.employeeName,
                                    searchFeildTwo:data.employeeId,
                                })).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i,index)=>{
                          return(
                    <TableRow key={index} sx={{borderBottom:'1px solid silver'}}>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.employeeName}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.employeeId}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.JoiningDate}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.CTC}</TableCell>
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
                        count={allCTC.length}
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
