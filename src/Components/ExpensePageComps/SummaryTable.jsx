import React, { useState, useEffect } from "react";
import {Typography,TextField, Card, Button,TableFooter, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper , Grid, Box, Container, TablePagination, IconButton } from "@mui/material";
import { get_all_maintenance_expense, get_all_rental_expense, get_expense_summary, methodPost } from "../../API_Service/API_Links";
import axios from "axios";
import { FilterData } from "../FilterData/FilterData";
import Filter from "../FilterData/Filter";
import { PlayCircleFilled, Image } from '@mui/icons-material';

export default function SummaryTable() {

    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState("");
    const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const [search, setSearch] = useState("");
  const [allSummary , setAllSummary ] = useState([]);
  const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");
  const [fromDate , setFromDate] = useState('');
  const [toDate , setToDate] = useState('');

 const getAllSummary = () =>{
  setFromDate('')
  setToDate('')
   const sendData = new FormData()
  sendData.append('EmployeeId', '')
  sendData.append('FromDate', '')
  sendData.append('ToDate', '')
  axios({
      method: methodPost,
      url: get_expense_summary,
      data:sendData
    })
      .then((res) => {
        if (res.data.error) {
          setMessage(res.data.message);
          setStatus(false);
          setColor(false);
        } else {
          setMessage(res.data.message);
          setStatus(true);
          setColor(true);
          setAllSummary(res.data.data);
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
 }

  useEffect(()=>{
   getAllSummary();
  },[EmployeeId]);


  const getFilteredSummary = () =>{
    if(EmployeeId !== ''){
  const sendData = new FormData()
  sendData.append('EmployeeId', EmployeeId)
  sendData.append('FromDate', fromDate)
  sendData.append('ToDate', toDate)
  axios({
      method: methodPost,
      url: get_expense_summary,
      data:sendData
    })
      .then((res) => {
        if (res.data.error) {
          setMessage(res.data.message);
          setStatus(false);
          setColor(false);
        } else {
          setMessage(res.data.message);
          setStatus(true);
          setColor(true);
          setAllSummary(res.data.data);
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
    }
    else{
  const sendData = new FormData()
  sendData.append('EmployeeId', '')
  sendData.append('FromDate', '')
  sendData.append('ToDate', '')
  axios({
      method: methodPost,
      url: get_expense_summary,
      data:sendData
    })
      .then((res) => {
        if (res.data.error) {
          setMessage(res.data.message);
          setStatus(false);
          setColor(false);
        } else {
          setMessage(res.data.message);
          setStatus(true);
          setColor(true);
          setAllSummary(res.data.data);
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
    }
  }


const allSummaryArr = Object.keys(allSummary).map((category) => {
  return allSummary[category].map((expense, index) => {
    return {
      sno: index + 1,
      category,
      ...expense
    };
  });
}).flat();

const handleClick = (event, index) => {
  setPage(index);
};

const emptyRows =
  rowsPerPage - Math.min(rowsPerPage, allSummaryArr.length - page * rowsPerPage);



    const handleChangePage = (event, newPage) => {
    setPage(newPage);
};





  return (
      <Box boxShadow={4} bgcolor='#EDF4F4' py={2}>   

    <Container>
   <Box component={Card} p={4}>
      <Grid container columnSpacing={2}>
      <Grid item xs={3} sm={3} md={3} lg={3}>
        <Box mt={1}>
        <TextField   
        fullWidth
        id="EmployeeName" 
        label="Employee ID" 
        variant="outlined" 
        size='small'  
        color='secondary'
        value={EmployeeId}
        onChange={(e) => setEmployeeId(e.target.value)}       
      />
        </Box>
         </Grid>

       <Grid item xs={3} sm={3} md={3} lg={3}>
        <Box mt={1}>
        <TextField   
        fullWidth
        id="EmployeeName" 
        label="Start Date"
        type='date'
         variant="outlined" 
        size='small'  
        color='secondary'
        value={fromDate}
        InputLabelProps={{shrink:true}}
        onChange={(e) => setFromDate(e.target.value)}       
      />
        </Box>
        </Grid>
  
      <Grid item xs={3} sm={3} md={3} lg={3}>
      <Box mt={1}>
        <TextField   
        id="EmployeeName" 
        label="To Date"
        type='date'
        fullWidth
         variant="outlined" 
        size='small'  
        color='secondary'
        value={toDate}
         InputLabelProps={{shrink:true}}
        onChange={(e) => setToDate(e.target.value)}       
      />
      </Box>
      </Grid>

     <Grid item xs={3} sm={3} md={3} lg={3}>
      <Box display='flex' justifyContent='center'>
        <Button size="small" onClick={getFilteredSummary} variant='contained' sx={{bgcolor:'secondary.main'}} >FILTER SUMMARY</Button>
      </Box>
      </Grid>
      </Grid>
   

   </Box>
   </Container>

   <Container>
    <Box mt={2} py={4}>
    <Grid container spacing={1}>
       <TableContainer sx={{border:'1px solid silver'}} >        
 <Table>
    <TableHead sx={{ whiteSpace: 'nowrap', bgcolor: 'success.main' }}>
      <TableRow>
        <TableCell>S.NO</TableCell>
        <TableCell>Category</TableCell>
        <TableCell>Amount</TableCell>
        <TableCell>Comments</TableCell>
        <TableCell>Audio File</TableCell>
        <TableCell>Images</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {allSummaryArr.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((expense, index) => (
        <TableRow key={index}>
          <TableCell>{(page * rowsPerPage) + index + 1}</TableCell>
          <TableCell>{expense.category}</TableCell>
          <TableCell>{expense.amount}</TableCell>
          <TableCell>{expense.comments}</TableCell>
          <TableCell>{expense.audio_file}</TableCell>
          <TableCell>{expense.images}</TableCell>
        </TableRow>
      ))}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[rowsPerPage]}
          colSpan={6}
          count={allSummaryArr.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
          onPageChange={handleClick}
        />
      </TableRow>
    </TableFooter>
  </Table>
  </TableContainer>
                  </Grid>
                  </Box>


</Container>
  </Box>
  )
}
