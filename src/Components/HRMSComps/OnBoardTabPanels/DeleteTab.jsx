import React, { useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import Heading from '../../Heading';
import Breadcrumbs from '../../Breadcrumbs';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { LeaveApprovaltable, OnBoardDeletetable, OnBoardtable, paysliptable } from '../../../Variables/Variables';
import Autocomplete from '@mui/material/Autocomplete';

export default function EditTab() {

  const [value, setValue] = React.useState(dayjs('2022-04-07'));
  const { formState: { errors }, handleSubmit } = useForm();
  const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openTable, setOpenTable] = useState(false);
  const options = ['Approved', 'Pending', 'Rejected'];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
};
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};

const handleOpenTable = () =>{
   setOpenTable(true);
}

  return (
    <Box>

   <Container>
   <Box component={Card} p={4}>
      <Grid container>
      <Grid item xs={4} sm={4} md={4} lg={4}>
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

         <Grid item xs={4} sm={4} md={4} lg={4}>
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

        <Grid item xs={4} sm={4} md={4} lg={4}>
      <Box display='flex' justifyContent='start' alignSelf='center' py={4}>
        <Button variant='contained' color='secondary'>GET EMPLOYEE INFO</Button>
      </Box>
      </Grid>

         </Grid>
    </Box>

    <Box mt={2} p={2} bgcolor='#EDF4F4'>
    <Grid container>
                    <TableContainer sx={{border:'1px solid silver'}} >

                    <Table>
                    <TableHead sx={{ whiteSpace: 'nowrap', bgcolor: 'success.main' }}>
                    <TableRow sx={{borderBottom:'1px solid silver'}}>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600  }}>
                    Employee ID
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                    First Name
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                    Last Name
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Joined Date
                    </TableCell> 
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      EMployment Status
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Remove
                    </TableCell>
                    </TableRow>
                    </TableHead>


                    <TableBody>
                   
                      {
                       OnBoardDeletetable.map((i,index)=>{
                          return(
                    <TableRow key={index} sx={{borderBottom:'1px solid silver'}}>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.id}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.fname}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.lname}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.joined}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.status}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.delete}</TableCell>
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
