import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, Grow, TableHead, TableRow, Paper , Snackbar, Alert, Grid, Box, Container, TablePagination,Button,Card } from "@mui/material";
import { approve_notify, getPendingFundRequest, methodPost } from "../../API_Service/API_Links";
import axios from "axios";
import { FilterData } from "../FilterData/FilterData";
import FundRejectDialog from "./FundRejectDialog";
import FundApproveDialog from "./FundApproveDialog";


export default function ApproveFundRequest() {

    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState("");
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [openRejectDialog, setopenRejectDialog] = useState(false);
    const [openApproveDialog,setopenApproveDialog] = useState(false);
    const [isAddedCartSnackbarOpen, setIsAddedCartSnackbarOpen] = useState(false);
    const [Notification, setNotification] = useState("");

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const getAllPendinRequest = () =>{
        axios({
              method:'GET',
              url: getPendingFundRequest,
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
                  setData(res.data.data);
              }
          }).catch(err => {
              alert('Oops something went wrong ' + err)
          });
    }

  useEffect(()=>{
  getAllPendinRequest();
  },[]);


    const handleOpenApproveDialog = () =>{
   setopenApproveDialog(!openApproveDialog);
  }

  const handleOpenRejectDialog = () =>{
   setopenRejectDialog(!openRejectDialog);
  }

           const handleCloseAddedCartSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsAddedCartSnackbarOpen(false);
  };

  function GrowTransition(props) {
    return <Grow {...props} direction="up" />;
  }



return (
    <Box>
   <Container>
   <Box component={Card} p={4} bgcolor='#EDF4F4' mb={2}>
          <Snackbar 
          open={isAddedCartSnackbarOpen} 
          autoHideDuration={1000}            
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          TransitionComponent={GrowTransition}
           onClose={handleCloseAddedCartSnackbar}>
        <Alert onClose={handleCloseAddedCartSnackbar} severity='success' variant="filled" sx={{ width: '100%' }}>
         {Notification}
        </Alert>
         </Snackbar>   
    <Box mt={2} py={4}>
    <Grid container spacing={1}>
                    <TableContainer sx={{border:'1px solid silver'}} >

                    <Table>
                    <TableHead sx={{ whiteSpace: 'nowrap', bgcolor: 'success.main' }}>
                    <TableRow sx={{borderBottom:'1px solid silver'}}>
                    {/* <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                    Progile Image
                    </TableCell> */}
                     <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Employee ID
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600  }}>
                      Employee Name
                    </TableCell>
                   
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                    Project Code
                    </TableCell>
                   <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                    Request To
                    </TableCell>
                   <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                   Amount
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                    Message From Employee
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                      Approve
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: 'white', fontWeight: 600 }}>
                     Reject
                    </TableCell>
                  
                    </TableRow>
                    </TableHead>


                    <TableBody>
                    {data.filter((data) =>FilterData(data, search, {
                                    searchFeildOne: data.employee_id,
                                    searchFeildTwo:data.user_name,
                                })).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((req,index)=>{
                          return(
                    <TableRow  sx={{borderBottom:'1px solid silver'}}>
                    {/* <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{req.profile_image}</TableCell> */}
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{req.employee_id}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{req.user_name}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{req.project_code}</TableCell>
                     <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{req.request_to}</TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{req.amount}
                    </TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>{req.message}
                    </TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}> 
                    <Button onClick={handleOpenApproveDialog}  sx={{bgcolor:'#7bc54c', color:'#333', ':hover':{bgcolor:'#616e80'}}}>
                      Approve
                    </Button>
                    <FundApproveDialog setIsAddedCartSnackbarOpen={setIsAddedCartSnackbarOpen} setNotification={setNotification} getAllPendinRequest={getAllPendinRequest} id={req.notication_id} setopenApproveDialog={setopenApproveDialog} openApproveDialog={openApproveDialog} />
                    </TableCell>
                    <TableCell sx={{textAlign:'center',borderBottom:'1px solid silver'}}>
                    <Button onClick={handleOpenRejectDialog} sx={{bgcolor:'red',color:'#333', ':hover':{bgcolor:'#616e80'}}}>
                        Reject
                    </Button>
                    <FundRejectDialog setIsAddedCartSnackbarOpen={setIsAddedCartSnackbarOpen} setNotification={setNotification} getAllPendinRequest={getAllPendinRequest} id={req.notication_id} setopenRejectDialog={setopenRejectDialog} openRejectDialog={openRejectDialog}  />
                    </TableCell>
                    </TableRow>
                     )})}
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
                </Box>
                </Container>
                

  </Box>
  )
}
