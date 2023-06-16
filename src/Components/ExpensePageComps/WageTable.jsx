import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper , Grid, Box, Container, TablePagination } from "@mui/material";
import { get_all_maintenance_expense, get_all_rental_expense, get_all_wages_expense } from "../../API_Service/API_Links";
import axios from "axios";
import { FilterData } from "../FilterData/FilterData";
import Filter from "../FilterData/Filter";

export default function WagesTable() {

    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState("");
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
   const [search, setSearch] = useState("");

  useEffect(()=>{
     axios({
          method:'GET',
          url: get_all_wages_expense,
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
  },[]);

  const keys = Object.keys(data[0] || {}).filter((key) => key !== "wagesId");

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
};
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};

  return (
      <Box boxShadow={4} bgcolor='#EDF4F4'>   
   <Container>
    <Box mt={2} py={4}>
    <Grid container spacing={1}>
      <TableContainer sx={{border:'1px solid silver'}} >
         <Table>
         <TableHead sx={{ whiteSpace: 'nowrap', bgcolor: 'success.main' }}>
          <TableRow>
            {keys.map((key) => (
             <TableCell sx={{color: 'white', fontWeight: 500 , textAlign:'center'  }} key={key}>
                <Box sx={{ display: 'flex' , justifyContent:'center'}}>
                <Box sx={{ my: 'auto', textTransform: 'uppercase' }}>
                    {key}
                </Box>
                   {key === "projectCode" || key === "employeeId" ? (
                <Box>
                <Filter search={search} setSearch={setSearch} />
                </Box>
                )
                :''
              }
            </Box>
             </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .filter((row) => FilterData(row, search, {
              searchFeildOne: row.employeeId,
              searchFeildTwo: row.projectCode,
            }))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={index}>
                {keys.map((key) => (
                  <TableCell align="center" key={key}>{row[key]}</TableCell>
                ))}
              </TableRow>
            ))}
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
