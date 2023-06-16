import React, { useEffect, useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, IconButton } from "@mui/material";
import Heading from '../Heading';
import Breadcrumbs from '../Breadcrumbs';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { siteprojectTable } from '../../Variables/Variables';
import Filter from '../FilterData/Filter';
import {FilterData, FilterSite} from '../FilterData/FilterData';
import { getAllSiteProject } from '../../API_Service/API_Links';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';

export default function EditTab() {

  const [value, setValue] = React.useState(dayjs('2022-04-07'));
  const { formState: { errors }, handleSubmit } = useForm();
  const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openTable, setOpenTable] = useState(false);
  const [openViewTab, setOpenViewTab] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [color, setColor] = useState(false);
  const [message, setMessage] = useState("");
  const options = ['Approved', 'Pending', 'Rejected'];
  const [search, setSearch] = useState("");
  const [allProjects , setAllProjects] = useState([]);

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
};
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};

 const handleOpenEdit = (i) =>{
  navigate('editsiteproject' , {state:{SiteProjectId:i.SiteProjectId , projectCode: i.projectCode}})
 }

  const handleOpenView = (i) => {
  navigate('viewsiteproject', {state:{SiteProjectId:i.SiteProjectId , projectCode: i.projectCode}})
  }

// GET ALL PROJECTS
      useEffect(() => {
            axios({
                method: 'GET',
                url: getAllSiteProject,
            }).then(res => {
                if (res.data.error) {
                    setMessage(res.data.message)
                    setOpen(true)
                    setStatus(false)
                    setColor(false)
                } else {
                    setMessage(res.data.message)
                    setAllProjects(res.data.data)
                    setOpen(true)
                    setStatus(true)
                    setColor(true)
                }
            }).catch(err => {
                alert('Oops something went wrong ' + err)
            });
    }, [])



  return (
    <Box boxShadow={4} bgcolor='#EDF4F4'>   
   <Container>
    <Box mt={2} py={4} id='assignedSiteFirstTab'>
    <Grid container spacing={1}>
                    <TableContainer sx={{border:'1px solid silver'}} >

                    <Table>
                    <TableHead sx={{ whiteSpace: 'nowrap', bgcolor: 'success.main' }}>
                    <TableRow sx={{borderBottom:'1px solid silver'}}>
                    <TableCell sx={{color: 'white', fontWeight: 600 , textAlign:'center'  }}>
                      <Box sx={{ display: 'flex' , justifyContent:'center'}}>
                      <Box sx={{ my: 'auto' }}>
                         Project ID
                      </Box>
                      <Box>
                     <Filter search={search} setSearch={setSearch} />
                      </Box>
                  </Box>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Date
                    </TableCell> 
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      <Box sx={{ display: 'flex' , justifyContent:'center'}}>
                      <Box sx={{ my: 'auto' }}>
                        Team
                      </Box>
                      <Box>
                     <Filter search={search} setSearch={setSearch} />
                      </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Last Updated
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
                      allProjects &&  allProjects.filter((data) =>FilterSite(data, search, {
                                    searchFeildOne: data.projectCode,
                                    searchFeildTwo:data.Department,
                                })).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i,index)=>{
                          return(
                    <TableRow key={index} sx={{borderBottom:'1px solid silver'}}>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.projectCode}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.Date}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.Department}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.lastUpdatedEmployeeName} ({i.lastUpdatedEmployeeID}) | {i.lastUpdatedDate}</TableCell>
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
                        count={allProjects.length}
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
