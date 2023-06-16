import React, { useEffect, useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import Heading from '../Heading';
import Breadcrumbs from '../Breadcrumbs';
import { assignedProjectsempTable, LeaveApprovaltable, paysliptable } from '../../Variables/Variables';
import Filter from '../FilterData/Filter';
import {FilterData} from '../FilterData/FilterData';
import { useNavigate } from 'react-router-dom';
import { get_all_factory_project, methodGet } from '../../API_Service/API_Links';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';

export default function AssignedFactoryProjectTable() {

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState();
  const [color, setColor] = useState();


  
  useEffect(() => {
    axios({
      method: 'GET',
      url: get_all_factory_project,
    })
      .then((res) => {
        if (res.data.error) {
          setMessage(res.data.message);
          setOpen(true);
          setStatus(false);
          setColor(false);
        } else {
          setMessage(res.data.message);
          setdata(res.data.data);
          setOpen(true);
          setStatus(true);
          setColor(true);
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
  }, []);
   
  const statusMapping = {
    1: 'In-Progress',
    2: 'Purchase Pending',
    3: 'Finance Pending',
    4: 'Finance Approved',
    5: 'Raw Material Available',
    6: 'Assigned To Employee',
    7: 'Completed',
  };






const handleChangePage = (event, newPage) => {
    setPage(newPage);
};
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};

 const handleOpenEdit = (i) =>{
  navigate('editFactproject', {state:{id:i.ProjectId}});
 }

  const handleOpenView = (i) => {
  navigate('viewFactproject', {state:{project:i}})
  }

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
                    <Box sx={{ display: 'flex' , justifyContent:'center'}}>
                      <Box sx={{ my: 'auto' }}>
                         Project Name
                      </Box>
                      <Box>
                     <Filter search={search} setSearch={setSearch} />
                      </Box>
                  </Box>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Project Code
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Company Name
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                       <Box sx={{ display: 'flex' , justifyContent:'center'}}>
                      <Box sx={{ my: 'auto' }}>
                       Project Type
                      </Box>
                      <Box>
                     <Filter search={search} setSearch={setSearch} />
                      </Box>
                  </Box>
                    </TableCell> 
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Client
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Status
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
                        data.filter((data) =>FilterData(data, search, {
                                    searchFeildOne: data.ProjectName,
                                    searchFeildTwo:data.ProjectType,
                                })).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i,index)=>{
                          return(
                    <TableRow key={index} sx={{borderBottom:'1px solid silver'}}>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.ProjectName}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.ProjectCode}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.CompanyName}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.ProjectType}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{i.CustomerName}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{statusMapping[i.ProjectStatus]}</TableCell>
                    <TableCell onClick={()=>handleOpenView(i)} sx={{textAlign:'center',borderBottom:'1px solid silver'}}><VisibilityIcon /></TableCell>
                     <TableCell onClick={()=>handleOpenEdit(i)} sx={{textAlign:'center',borderBottom:'1px solid silver'}}><ModeEditIcon /></TableCell>
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
                        count={data.length}
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
