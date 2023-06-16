import React, { useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import Heading from '../Heading';
import Breadcrumbs from '../Breadcrumbs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import DownloadIcon from '@mui/icons-material/Download';
import { incentivetable, paysliptable } from '../../Variables/Variables';
import IconBreadcrumbs from '../Breadcrumbs';

function Last3PayoutSection() {

  const [value, setValue] = React.useState(dayjs('2022-04-07'));
  const { formState: { errors }, handleSubmit } = useForm();
  const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
};
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};

      const role = JSON.parse(localStorage.getItem('role'));
  return (
    <Box>

      <Box py={2} px={1}>
    <IconBreadcrumbs
    previous={'Home'}
    current={'HRMS'}
    currentSection={'Last 3 Payout'}
    link1={`/home`}
    link2={'/home/HRMS'}
    
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading  title={'Last 3 Pay'}/>
      </Box>
    </Container>

{
  role === 'Super Admin' &&
    <Container>
   <Box component={Card} p={4}>
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
      <Box display='flex' justifyContent='center' py={4}>
        <Button variant='contained' sx={{bgcolor:'secondary.main'}} >GET Payout Data</Button>
      </Box>
      </Grid>
      </Grid>
   </Box>
   </Container>
   }


    <Container>
      <Box mt={2} p={3} boxShadow={5} mb={2} bgcolor='#EDF4F4'>
      <Box display='flex' justifyContent='end' py={2}>
      <Button variant='contained' sx={{bgcolor:'secondary.main'}} >Export DATA</Button>
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
                      Monthly Alloted
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                     Last 3 Payout Paid
                    </TableCell>
                    </TableRow>
                    </TableHead>


                    <TableBody>
                   
                      {
                       incentivetable.map((i,index)=>{
                          return(
                    <TableRow key={index} sx={{borderBottom:'1px solid silver'}}>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.name}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.id}</TableCell>
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

export default Last3PayoutSection
