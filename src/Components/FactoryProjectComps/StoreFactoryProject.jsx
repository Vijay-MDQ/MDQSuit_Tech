import React, { useEffect, useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import Heading from '../Heading';
import Breadcrumbs from '../Breadcrumbs';
import { assignedProjectsempTable, LeaveApprovaltable, paysliptable } from '../../Variables/Variables';
import Filter from '../FilterData/Filter';
import {FilterData} from '../FilterData/FilterData';
import { useNavigate } from 'react-router-dom';
import { get_all_factory_project, methodGet, get_project_for_store } from '../../API_Service/API_Links';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';

export default function StoreFactoryProject() {

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
    const sendData = new FormData();
    sendData.append('ProjectId', '')
    axios({
      method: 'POST',
      url: get_project_for_store,
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
   navigate('viewstore', {state:{id:i.ProjectId}});
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
                    <TableCell sx={{ textAlign: 'center', borderBottom: '1px solid silver' }}>{statusMapping[i.ProjectStatus]}</TableCell>
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



// const StoredSelectedTeam = () => {
//     // This is to display Team and Staff
//     const newObject = {
//         team: teamName,
//         staff: staffName,
//         StartDate: ProjectStart,
//         EndDate: ProjectEnd
//     };
//     setTeamMemberStaffPairs([...teamMemberStaffPairs, newObject]);
//     // This is to pass them to API
//     const convertedObject = {
//         EmployeeId: teamMember,
//         DepartmentId: staffMember,
//         StartDate: ProjectStart,
//         EndDate: ProjectEnd
//     }
//     setTeamSelectionAPI([...teamSelectionAPI, convertedObject]);
//     setTeamMember([]);
//     setStaffMember([]);
//     setProjectEnd('');
//     setProjectStart('');
//     setInput(true);
// }



{/* <Grid
    item
    lg={12}
    sm={12}
    xl={12}
    xs={12}
    md={12}
    sx={{ py: 1 }}
    display='flex'
    justifyContent='center'
>
    <Box sx={{ textAlign: "center" }}>
        {
            teamMemberStaffPairs.length !== 0 &&
            <>
                <Typography variant='h6' fontWeight={600}>Selected Team</Typography>
                {
                    teamMemberStaffPairs.map((i) => {
                        return (
                            <Box textAlign='left'>
                                <Typography variant='subtitle2'>{i.team} - {i.staff} : {i.StartDate} - {i.EndDate}</Typography>
                            </Box>

                        )
                    })
                }
            </>
        }
    </Box>
</Grid> */}


// const [teamMemberStaffPairs, setTeamMemberStaffPairs] = useState([]);
// const [teamSelectionAPI, setTeamSelectionAPI] = useState([]);

// const [teamName, setTeamName] = useState([]);
// const [staffName, setStaffName] = useState([]);
// const [currentTeam, setCurrentTeam] = useState('');

{/* <Grid
    item
    lg={3}
    sm={2}
    xl={3}
    xs={2}
    md={3}
    sx={{ py: 2 }}
>
    <Button onClick={StoredSelectedTeam} variant='contained' fullWidth>+ Add</Button>
</Grid> */}



