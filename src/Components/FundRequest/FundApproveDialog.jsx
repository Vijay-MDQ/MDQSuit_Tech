import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, TextField } from '@mui/material';
import { reject_leave } from '../../API_Service/API_Links';
import { useState } from 'react';
import axios from 'axios';
import { approve_notify, getPendingFundRequest, methodPost } from "../../API_Service/API_Links";

export default function FundApproveDialog({setopenApproveDialog,openApproveDialog,setIsAddedCartSnackbarOpen,setNotification, getAllPendinRequest , id}) {

  const handleClose = () => {
    setopenApproveDialog(false);
  };

  const [Remarks, setRemarks] = useState('');
  const [ApprovedAmount, setApprovedAmount] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState();
  const [color, setColor] = useState();


  const approvereq = () => {
    const sendData = new FormData()
    sendData.append('notificationId', id)
    sendData.append('reason', Remarks)
    sendData.append('amount', ApprovedAmount)
    axios({
        method: methodPost,
        url: approve_notify,
        data:sendData
      })
        .then((res) => {
          if (res.data.error) {
            setMessage(res.data.message);
            setOpen(true)
            setStatus(false)
            setColor(false)
          } else {
            setMessage(res.data.message);
            setOpen(true)
            setStatus(false)
            setColor(false)
             handleClose();
            setIsAddedCartSnackbarOpen(true)
            setNotification('Request Approved')
            getAllPendinRequest();
          }
        })
        .catch((err) => {
          alert("Oops something went wrong " + err);
        });
   }


  return (
    <div>
      <Dialog
        open={openApproveDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{opacity:1}}
      >
        <DialogTitle>Approve This Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Apporved Amount and Your Remarks to Approve this Fund Request.
          </DialogContentText>
          <Stack>
           <TextField
            autoFocus
            id="name"
            fullWidth
            variant="outlined"
            label='Approved Amount'
            sx={{my:2}}
            onChange={(e)=>setApprovedAmount(e.target.value)}
          />
           <TextField
            id="name"
            fullWidth
            variant="outlined"
            label='Remarks'
            sx={{my:2}}
            onChange={(e)=>setRemarks(e.target.value)}
          />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={approvereq}>Approve</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}