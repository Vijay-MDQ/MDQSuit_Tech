import React, { useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography,Checkbox ,Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import Heading from '../../Heading';
import Breadcrumbs from '../../Breadcrumbs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import DownloadIcon from '@mui/icons-material/Download';
import { incentivetable, paysliptable } from '../../../Variables/Variables';
import IconBreadcrumbs from '../../Breadcrumbs';

export default function IncentiveSection() {

  const [value, setValue] = React.useState(dayjs('2022-04-07'));
  const { formState: { errors }, handleSubmit } = useForm();
  const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAllDwnld, setopenAllDwnld] = useState(false);
  const [allIncentives , setAllIncentives] = useState([]);

  const handleChangePage = (event, newPage) => {
  setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
  };

 const role = JSON.parse(localStorage.getItem('role'));


   const onselectAll = (e) => {
  const allitems = [...incentivetable]
  allitems.forEach(function (a) {
    a.is_checked = e.target.checked;
  })
  setAllIncentives(allitems)
  setopenAllDwnld(!openAllDwnld);
}

  return (
    <Box>

   
    <Container>
   <Box component={Card} p={4}>
  {
      role === 'Super Admin' ?
      <Grid container>
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
        error={errors.EmployeeName ? true : false}
        helperText={(errors.EmployeeName && errors.EmployeeName.type === "required") ? "Employee Name is required" : ""}
        onChange={(e) => setEmployeeName(e.target.value)}
        {...("EmployeeName", { required: true })}
          
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
        error={errors.EmployeeID ? true : false}
        helperText={(errors.EmployeeName && errors.EmployeeName.type === "required") ? "Employee Name is required" : ""}
        onChange={(e) => setEmployeeName(e.target.value)}
        {...("EmployeeName", { required: true })}
          
      />
        </Box>
        </Box>
        </Grid>
  
        <Grid item xs={3} sm={3} md={3} lg={3}>
      <Box>
      <Box py={2}>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Select Pay Period</Typography>
      </Box>
      <Box mt={1}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      views={['year', 'month']}
      label="Year and Month"
      minDate={dayjs('2012-03-01')}
      maxDate={dayjs('2023-06-01')}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      renderInput={(params) => <TextField {...params} size='small' helperText={null} />}
    />
    </LocalizationProvider>
      </Box>
      </Box>
      </Grid>

      <Grid item xs={3} sm={3} md={3} lg={3}>
      <Box display='flex' justifyContent='center' py={4}>
        <Button variant='contained' sx={{bgcolor:'secondary.main'}}>GET Incentives Data</Button>
      </Box>
      </Grid>
      </Grid>
   :
   <Box>
    <Grid container>
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Box>
      <Box py={2}>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Select Pay Period</Typography>
      </Box>
      <Box mt={1}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      views={['year', 'month']}
      label="Year and Month"
      minDate={dayjs('2012-03-01')}
      maxDate={dayjs('2023-06-01')}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      renderInput={(params) => <TextField {...params} size='small' helperText={null} />}
    />
    </LocalizationProvider>
      </Box>
      </Box>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12}>
       <Box display='flex' justifyContent='start' py={2}>
        <Button variant='contained' sx={{bgcolor:'secondary.main'}}  >GET Incentives Data</Button>
      </Box>
      </Grid>
    </Grid>
    </Box>

    }
   </Box>
   </Container>


    <Container>
    <Box mt={2} p={3} boxShadow={5} mb={2} bgcolor='#EDF4F4'>
      {
        openAllDwnld ? 
        <Box display='flex' justifyContent='end' py={2}>
        <Button variant='contained' sx={{bgcolor:'secondary.main'}}>GET ALL INCENTIVES</Button>
      </Box>
      :
      <Box display='flex' justifyContent='end' py={2}>
      <Button variant='contained' sx={{bgcolor:'secondary.main'}}>EXPORT INCENTIVE</Button>
      </Box>
      }

    <Grid container>
                    <TableContainer sx={{border:'1px solid silver'}} >

                    <Table>
                    <TableHead sx={{ whiteSpace: 'nowrap', bgcolor: 'success.main' }}>
                    <TableRow sx={{borderBottom:'1px solid silver'}}>
                        <TableCell sx={{
                        color: 'white', fontWeight: 600, textAlign: 'center', px: 5
                        }} >
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                       <Box>
                       <Checkbox className='text-white' onChange={onselectAll} />
                      </Box>
                      <Box>
                       Select
                      </Box>
                      </Box>
                     </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600  }}>
                      Employee Name
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Employee ID
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Pay Period
                    </TableCell> 
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Alloted
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                     Paid
                    </TableCell>
                    </TableRow>
                    </TableHead>


                    <TableBody>
                   
                      {
                       incentivetable.map((i,index)=>{
                          return(
                    <TableRow hover key={index} sx={{borderBottom:'1px solid silver'}}>
                  <TableCell align='center'>
                  <Box>
                  <Checkbox checked={!!i.is_checked} onChange={(e) => {
                    i.is_checked = e.target.checked;
                    const allitems = [...incentivetable]
                    allitems.find((element) => element.id === i.id).is_checked = i.is_checked
                    setAllIncentives(allitems)
                    }} />
                    </Box>
                    </TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.name}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.id}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.period}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.actual}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.paid}</TableCell>
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
                        count={2}
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
