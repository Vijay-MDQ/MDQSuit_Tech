import React, { useEffect, useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Checkbox } from "@mui/material";
import Heading from '../Heading';
import Breadcrumbs from '../Breadcrumbs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import DownloadIcon from '@mui/icons-material/Download';
import { paysliptable } from '../../Variables/Variables';
import IconBreadcrumbs from '../Breadcrumbs';
import axios from 'axios';
import { get_employee_pay_slip } from '../../API_Service/API_Links';

function PayslipSection() {

  const [value, setValue] = useState('');
  const { formState: { errors }, handleSubmit } = useForm();
  const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAllDwnld, setopenAllDwnld] = useState(false);
  const [allPaystubs , setAllPaystubs] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState();
  const [color, setColor] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
};
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};



  const role = JSON.parse(localStorage.getItem('role'));

  useEffect(() => {
    const sendData = new FormData()
    sendData.append('EmployeeName', EmployeeName)
    sendData.append('EmployeeId', EmployeeId)
    sendData.append('YearMonth', value)
    axios({
      method: 'POST',
      url: get_employee_pay_slip,
      data:sendData
    })
      .then((res) => {
        if (res.data.error) {
          setMessage(res.data.message);
          setOpen(true);
          setStatus(false);
          setColor(false);
        } else {
          setMessage(res.data.message);
          setData(res.data.data);
          setOpen(true);
          setStatus(true);
          setColor(true);
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
  }, []);


  const onselectAll = (e) => {
  const allitems = [...paysliptable]
  allitems.forEach(function (a) {
    a.is_checked = e.target.checked;
  })
  setAllPaystubs(allitems)
  setopenAllDwnld(!openAllDwnld);
}

  return (
    <Box>

    <Box py={2} px={1}>
    <IconBreadcrumbs
    previous={'Home'}
    current={'Finance'}
    currentSection={'Payslip'}
    link1={`/home`}
    link2={'/home/finance'}
    
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading  title={'Payslip'}/>
      </Box>
    </Container>

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
        <Button variant='contained' sx={{bgcolor:'secondary.main'}} >GET PAYSLIPS</Button>
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
       <Button variant='contained' sx={{bgcolor:'secondary.main'}} >GET PAYSLIPS</Button>
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
        <Button variant='contained' sx={{bgcolor:'secondary.main'}} >GET ALL PAYSLIPS</Button>
      </Box>
      :
      <Box display='flex' justifyContent='end' py={2}>
      <Button variant='contained' sx={{bgcolor:'secondary.main'}} >GET PAYSLIP</Button>
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
                      Department
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Amount
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Paystub
                    </TableCell>
                    </TableRow>
                    </TableHead>


                    <TableBody>
                   
                      {
                        data.map((i,index)=>{
                          return(
                  <TableRow hover key={index} sx={{borderBottom:'1px solid silver'}}>
                  <TableCell align='center'>
                  <Box>
                  <Checkbox checked={!!i.is_checked} onChange={(e) => {
                    i.is_checked = e.target.checked;
                    const allitems = [...paysliptable]
                    allitems.find((element) => element.id === i.id).is_checked = i.is_checked
                    setAllPaystubs(allitems)
                    }} />
                    </Box>
                    </TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.EmployeeName}</TableCell>
                              <TableCell sx={{ textAlign: 'center', borderBottom: '1px solid silver' }}>{i.EmployeeId}</TableCell>
                              <TableCell sx={{ textAlign: 'center', borderBottom: '1px solid silver' }}>{i.PayPeriod}</TableCell>
                              <TableCell sx={{ textAlign: 'center', borderBottom: '1px solid silver' }}>{i.DepartmentName}</TableCell>
                              <TableCell sx={{ textAlign: 'center', borderBottom: '1px solid silver' }}>{i.Total}</TableCell>
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

export default PayslipSection
