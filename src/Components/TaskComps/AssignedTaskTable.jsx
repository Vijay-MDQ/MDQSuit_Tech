import React, { useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography,IconButton, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import Heading from '../Heading';
import Breadcrumbs from '../Breadcrumbs';
import { assignedtaskEmpTable } from '../../Variables/Variables';
import Filter from '../FilterData/Filter';
import {FilterData, FilterSite} from '../FilterData/FilterData';
import { useNavigate } from 'react-router-dom';
import { getTask } from '../../API_Service/API_Links';
import { useEffect } from 'react';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function AssignedTaskTable() {


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [allTask , setAllTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [color, setColor] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  const handleOpenEdit = (id) =>{
    navigate('editTask' , {state:{id:id}})
  }

  // const handleOpenView = () => {
  // navigate('viewtask')
  // }
   
  const role = JSON.parse(localStorage.getItem('role'));


  const getAllTask = () =>{
      axios({
          method:'GET',
          url: getTask,
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
              setAllTask(res.data.data);
          }
      }).catch(err => {
          alert('Oops something went wrong ' + err)
      });
  }

  useEffect(() => {
   getAllTask();
  }, [])


  return (
    <Box boxShadow={4} bgcolor='#EDF4F4'>  

    <Container>
    <Box mt={2} py={4}  >
    <Grid container>
                    <TableContainer sx={{border:'1px solid silver'}} >
                    <Table>
                    <TableHead sx={{ whiteSpace: 'nowrap', bgcolor: 'success.main' }}>
                    <TableRow sx={{borderBottom:'1px solid silver'}}>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600  }}>
                      Task Name
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      <Box sx={{ display: 'flex' , justifyContent:'center'}}>
                      <Box sx={{ my: 'auto' }}>
                         Task Code
                      </Box>
                      <Box>
                     <Filter label={"Project Code"} search={search} setSearch={setSearch} />
                      </Box>
                  </Box>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600  }}>
                      Task
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Members
                    </TableCell> 
                      <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Department
                    </TableCell> 
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      <Box sx={{ display: 'flex' , justifyContent:'center'}}>
                      <Box sx={{ my: 'auto' }}>
                         Task Type
                      </Box>
                      <Box>
                     <Filter label={"Project Code"} search={search} setSearch={setSearch} />
                      </Box>
                  </Box>
                    </TableCell>
                     <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Start Date
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Expected Completion Date
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Deadline
                    </TableCell>
                    {
                      role === 'Super Admin' && 
                      <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                       Edit
                    </TableCell>
                    }
                    </TableRow>
                    </TableHead>


                    <TableBody>
                   
                      {
                        allTask.filter((data) =>FilterData(data, search, {
                                    searchFeildOne: data.taskCode,
                                    searchFeildTwo:data.taskType,
                                })).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i,index)=>{
                          return(
                    <TableRow key={index} sx={{borderBottom:'1px solid silver'}}>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.taskName}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.taskCode}</TableCell>
                     <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.descriptions}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.Members}</TableCell>
                     <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.department}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.taskType}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.startdate}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.enddate}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.expected_completion_date}</TableCell>
                    {
                      role === 'Super Admin' &&
                     <TableCell onClick={()=>handleOpenEdit(i.taskId)} sx={{textAlign:'center',borderBottom:'1px solid silver'}}><IconButton><ModeEditIcon /></IconButton></TableCell>
                    }
                     
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
                        count={allTask.length}
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
