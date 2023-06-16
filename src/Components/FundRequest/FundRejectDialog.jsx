import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { reject_leave } from '../../API_Service/API_Links';
import { useState } from 'react';
import axios from 'axios';
import { reject_notify, getPendingFundRequest, methodPost } from "../../API_Service/API_Links";

export default function FundRejectDialog({setopenRejectDialog,openRejectDialog,setNotification,setIsAddedCartSnackbarOpen, getAllPendinRequest , id}) {

  const handleClose = () => {
    setopenRejectDialog(false);
  };

  const [reason, setReason] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState();
  const [color, setColor] = useState();


     const rejectreq = () => {
    const sendData = new FormData()
     sendData.append('notificationId', id)
    sendData.append('reason', reason)
    sendData.append('AudioFile', '')
    axios({
        method: methodPost,
        url: reject_notify,
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
            setNotification('Request Rejected')
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
        open={openRejectDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{opacity:1}}
      >
        <DialogTitle>Reason For Rejection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type Your Reason For Rejecting this Fund Request.
          </DialogContentText>
          <TextField
            autoFocus
            id="name"
            fullWidth
            variant="outlined"
            multiline
            rows={2}
            sx={{my:2}}
            onChange={(e)=>setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={rejectreq}>Reject</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}