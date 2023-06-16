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
import { allProfileTable, LeaveApprovaltable, paysliptable } from '../../Variables/Variables';
import Autocomplete from '@mui/material/Autocomplete';
import ProfileDialog from './ProfileDialog';
import Filter from '../FilterData/Filter';
import {FilterData} from '../FilterData/FilterData';
import IconBreadcrumbs from '../Breadcrumbs';

export default function Profile() {

  const [value, setValue] = React.useState(dayjs('2022-04-07'));
  const { formState: { errors }, handleSubmit } = useForm();
  const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openTable, setOpenTable] = useState(false);
  const options = ['Approved', 'Pending', 'Rejected'];
  const[openDialog, setOpenDialog]= useState(false);
    const [search, setSearch] = useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
};
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};

const openProfile = () =>{
   setOpenDialog(true);
}

  return (
    <Box>
     <ProfileDialog open={openDialog}  setOpen={setOpenDialog} />

      <Box py={2} px={1}>
    <IconBreadcrumbs
    previous={'Home'}
    current={'HRMS'}
    currentSection={'Profile'}
    link1={`/home`}
    link2={'/home/HRMS'}
    
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading  title={'View All Profile'}/>
      </Box>
    </Container>

   <Container>
   <Box component={Card} p={4} mb={2} bgcolor='#EDF4F4'>
    <Box mt={2}>
    <Grid container spacing={1}>
                    <TableContainer sx={{border:'1px solid silver'}} >

                    <Table>
                    <TableHead sx={{ whiteSpace: 'nowrap', bgcolor: 'success.main' }}>
                    <TableRow sx={{borderBottom:'1px solid silver'}}>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600  }}>
                      Employee Name
                    </TableCell>
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
                      <Box sx={{ display: 'flex' , justifyContent:'center'}}>
                      <Box sx={{ my: 'auto' }}>
                         Joining Date
                      </Box>
                      <Box>
                     <Filter search={search} setSearch={setSearch} />
                      </Box>
                  </Box>
                    </TableCell> 
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Employment Status
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      View Profile
                    </TableCell>
                    </TableRow>
                    </TableHead>


                    <TableBody>
                   
                      {
                        allProfileTable.filter((data) =>FilterData(data, search, {
                                    searchFeildOne: data.id,
                                    searchFeildTwo:data.join,
                                })).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i,index)=>{
                          return(
                    <TableRow key={index} sx={{borderBottom:'1px solid silver'}}>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.name}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.id}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.join}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.status}</TableCell>
                    <TableCell onClick={openProfile} sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.view}</TableCell>
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
