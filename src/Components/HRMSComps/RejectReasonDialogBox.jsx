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

export default function RejectReasonDialogBox({setopenRejectDialog,openRejectDialog , id , EmployeeId, getFilteredPendingLeaves, allPendingLeaveList}) {

  const handleClose = () => {
    setopenRejectDialog(false);
  };

  const [reason, setReason] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState();
  const [color, setColor] = useState();

  const rejectLeave = () => {
    if(reason !== ''){
  const sendData = new FormData()
  sendData.append('id', id)
  sendData.append('reject_voice_note', '')
  sendData.append('reject_reason', reason)
  axios({
      method: 'POST',
      url: reject_leave,
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
          if(EmployeeId !== ''){
          allPendingLeaveList();
          }
          else{
          getFilteredPendingLeaves();
          }
          setopenRejectDialog(false);
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
    }
 }

  return (
    <div>
      <Dialog
        open={openRejectDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{opacity:0.5}}
      >
        <DialogTitle>Reason For Rejection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type Your Reason For Rejecting this Leave Application.
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
          <Button onClick={rejectLeave}>Reject</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}