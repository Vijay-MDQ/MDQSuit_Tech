import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { get_all_factory_project } from '../API_Service/API_Links';
import {Box,Button,Card,Grid,TextField,Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";

export default function ProjectManagerDialog() {

  const [openProject, setopenProject] = useState(
    localStorage.getItem("showDialogBox") !== "false"
  );
  const [data, setdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState();
  const [color, setColor] = useState();
  const role = JSON.parse(localStorage.getItem('role'));

  const handleClose = () => {
     const close = localStorage.setItem("showDialogBox", "false");
     setopenProject(false);
   };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    useEffect(() => {
      if(role === 'Super Admin'){
    axios({
      method: 'GET',
      url: get_all_factory_project,
    })
      .then((res) => {
        if (res.data.error) {
          setMessage(res.data.message);
          setStatus(false);
          setColor(false);
        } else {
          setMessage(res.data.message);
          setdata(res.data.data);
          setStatus(true);
          setColor(true);
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
    }
  }, []);

  console.log("",openProject);

  return (
          <div>
            {
              openProject && 
      <Dialog
        fullScreen={fullScreen}
        open={openProject}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"All Pendig Projects"}
        </DialogTitle>
        <DialogContent>
          {
            data.map((i)=>{
              return(
                <Box component={Card} boxShadow={2} py={2} my={2}>
                  <Box p={1} textAlign='left'> 
                  <Typography variant='subtitle1' fontWeight={600} color='#616e80'>ProjectName : <Typography variant='body' fontWeight={400} color='#262626' component='span'> {i.ProjectName}</Typography></Typography>
                  <Typography variant='subtitle1' fontWeight={600} color='#616e80'>ProjectCode: <Typography variant='body' fontWeight={400} color='#262626' component='span'> {i.ProjectCode}</Typography></Typography>
                   <Typography variant='subtitle1' fontWeight={600} color='#616e80'>ProjectStatus :<Typography variant='body' fontWeight={400} color='#262626' component='span'> {i.ProjectStatus}</Typography></Typography>
                  </Box>
                </Box>
              )
            })
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
}
    </div>
  )
}
