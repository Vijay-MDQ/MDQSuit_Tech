import React, { useEffect, useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import Heading from '../../Heading';
import Breadcrumbs from '../../Breadcrumbs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import DownloadIcon from '@mui/icons-material/Download';
import { allComplaintsTable, LeaveApprovaltable, paysliptable } from '../../../Variables/Variables';
import Autocomplete from '@mui/material/Autocomplete';
import Filter from '../../FilterData/Filter';
import {FilterData} from '../../FilterData/FilterData';
import IconBreadcrumbs from '../../Breadcrumbs';
import axios from 'axios';
import { get_all_escalation } from '../../../API_Service/API_Links';
import ComplaintDialog from './ComplaintDialog';

export default function Complaints() {

  const [value, setValue] = React.useState(dayjs('2022-04-07'));
  const { formState: { errors }, handleSubmit } = useForm();
  const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const options = ['HIGH', 'MEDIUM', 'LOW'];
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [color, setColor] = useState(false);
  const [message, setMessage] = useState("");
  const [allComplaints, setAllComplaints] = useState([]);
  const [openResponseDialog, setOpenResponseDialog] = useState(false);
  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

    const role = JSON.parse(localStorage.getItem('role'));

    const getAllComplaints = () =>{
      axios({
          method:'GET',
          url: get_all_escalation,
      }).then(res => {
          if (res.data.error) {
              setMessage(res.data.message)
              setStatus(false)
              setColor(false)
          } else {
              setMessage(res.data.message)
              setStatus(true)
              setColor(true)
              setAllComplaints(res.data.data);
          }
      }).catch(err => {
          alert('Oops something went wrong ' + err)
      });
    }

    useEffect(()=>{
     getAllComplaints();
    }
    ,[])

    const OpenDialog = () =>{
      setOpenResponseDialog(!openResponseDialog);
    }


  return (
    <Box>

      <Box py={2} px={1}>
    <IconBreadcrumbs
    previous={'Home'}
    current={'HRMS'}
    currentSection={'Complaints'}
    link1={`/home`}
    link2={'/home/HRMS'}
    
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading  title={'Complaints'}/>
      </Box>
    </Container>


{
  role !== 'Super Admin' &&
    <Container>
   <Box component={Card} p={4}>
      <Grid container>
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
        error={errors.EmployeeName ? true : false}
        helperText={(errors.EmployeeName && errors.EmployeeName.type === "required") ? "Employee Name is required" : ""}
        onChange={(e) => setEmployeeName(e.target.value)}
        {...("EmployeeName", { required: true })}
          
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
        <TextField   
        id="EmployeeId" 
        label="Employee ID" variant="outlined" 
        required size='small'  
        color='secondary'
          sx={{width:250}}
        error={errors.EmployeeID ? true : false}
        helperText={(errors.EmployeeName && errors.EmployeeName.type === "required") ? "Employee Name is required" : ""}
        onChange={(e) => setEmployeeName(e.target.value)}
        {...("EmployeeName", { required: true })}
          
      />
        </Box>
        </Box>
        </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
        <Box mb={3}>
        <Box>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Department</Typography>
      </Box>
        <Box mt={1}>
        <TextField   
        id="EmployeeId" 
        label="Department" variant="outlined" 
        required size='small'  
        color='secondary'
          sx={{width:250}}
        error={errors.EmployeeID ? true : false}
        helperText={(errors.EmployeeName && errors.EmployeeName.type === "required") ? "Employee Name is required" : ""}
        onChange={(e) => setEmployeeName(e.target.value)}
        {...("EmployeeName", { required: true })}
          
      />
        </Box>
        </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4}>
        <Box mb={3}>
        <Box>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Reporting To</Typography>
      </Box>
        <Box mt={1}>
        <TextField   
        id="EmployeeId" 
        label="Reporting To" variant="outlined" 
        required size='small'  
        color='secondary'
          sx={{width:250}}
        error={errors.EmployeeID ? true : false}
        helperText={(errors.EmployeeName && errors.EmployeeName.type === "required") ? "Employee Name is required" : ""}
        onChange={(e) => setEmployeeName(e.target.value)}
        {...("EmployeeName", { required: true })}
          
      />
        </Box>
        </Box>
        </Grid>

           <Grid item xs={12} sm={12} md={4} lg={4}>
        <Box mb={3}>
        <Box>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Risk Level</Typography>
      </Box>
        <Box mt={1}>
       <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      size='small' 
      sx={{width:250}}
      renderInput={(params) => <TextField  color='secondary' {...params} label="RISK LEVEL" />}
        />
        </Box>
        </Box>
        </Grid>

                   <Grid item xs={12} sm={12} md={4} lg={4}>
        <Box mb={3}>
        <Box>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Complaint Type</Typography>
      </Box>
        <Box mt={1}>
       <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      size='small' 
      sx={{width:250}}
      renderInput={(params) => <TextField  color='secondary' {...params} label="Complaint Type" />}
        />
        </Box>
        </Box>
        </Grid>
              
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Box mb={3}>
        <Box>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Complaint</Typography>
      </Box>
        <Box mt={1}>
        <TextField   
        id="EmployeeId" 
        label="Complaint" variant="outlined" 
        required 
        size='small' 
        fullWidth 
        color='secondary'
        rows={3}
        multiline
        error={errors.EmployeeID ? true : false}
        helperText={(errors.EmployeeName && errors.EmployeeName.type === "required") ? "Employee Name is required" : ""}
        onChange={(e) => setEmployeeName(e.target.value)}
        {...("EmployeeName", { required: true })}
          
      />
        </Box>
        </Box>
        </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12}>
      <Box display='flex' justifyContent='center' py={2}>
        <Button variant='contained' color='secondary'  sx={{width:250}}>Raise Complaint</Button>
      </Box>
      </Grid>
      </Grid>
      </Box>
    </Container>

}



   <Container>
   <Box component={Card} p={4} mt={2} mb={2} bgcolor='#EDF4F4'>
    <Box mt={2} py={4}>
      
    <Grid container spacing={1}>
                    <TableContainer sx={{border:'1px solid silver'}} >

                    <Table>
                    <TableHead sx={{ whiteSpace: 'nowrap', bgcolor: 'success.main' }}>
                    <TableRow sx={{borderBottom:'1px solid silver'}}>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600  }}>
                   <Box sx={{ display: 'flex' , justifyContent:'center'}}>
                      <Box sx={{ my: 'auto' }}>
                         Complaint ID
                      </Box>
                      <Box>
                     <Filter search={search} setSearch={setSearch} />
                      </Box>
                  </Box>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Complaint
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Raised By
                    </TableCell> 
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                     Raised on
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      <Box sx={{ display: 'flex' , justifyContent:'center'}}>
                      <Box sx={{ my: 'auto' }}>
                        Status
                      </Box>
                      <Box>
                     <Filter  search={search} setSearch={setSearch} />
                      </Box>
                  </Box>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Response
                    </TableCell>
                    </TableRow>
                    </TableHead>


                    <TableBody>
                   
                      {
                      allComplaints.filter((data) =>FilterData(data, search, {
                                    searchFeildOne: data.id,
                                    searchFeildTwo:data.status,
                                })).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i,index)=>{
                          return(
                    <TableRow key={index} sx={{borderBottom:'1px solid silver'}}>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.EscalationId}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.Messages}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.ProfileName} ({i.EmployeeId})</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.EscalationDate}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.EscalationStatus === 0 ? 'Pending': 'Completed'}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>
                      <Button onClick={OpenDialog} size='small' variant='contained'>Send Response</Button>
                      </TableCell>
                         <ComplaintDialog getAllComplaints={getAllComplaints} id={i.EscalationId} openResponseDialog={openResponseDialog} setOpenResponseDialog={setOpenResponseDialog} />
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
                </Box>
                </Container>
                

  </Box>
  )
}
