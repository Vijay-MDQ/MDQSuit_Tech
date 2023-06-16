import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { escalation_approval } from '../../../API_Service/API_Links';

export default function ComplaintDialog({openResponseDialog, getAllComplaints,id , setOpenResponseDialog}) {

 const handleClose = () => {
    setOpenResponseDialog(!openResponseDialog);
  };

  const [reason, setReason] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState();
  const [color, setColor] = useState();
  const [complaintStatus , setComplaintStatus] = useState('');
   const options = [
  { id: 1, label: 'Completed' },
  { id: 0, label: 'Pending' },
];

console.log("",complaintStatus);

const SendResponse = () => {
    if(reason !== ''){
  const sendData = new FormData()
  sendData.append('EscalationId', id)
  sendData.append('AudioFile', '')
  sendData.append('Messages', reason)
  sendData.append('Status', complaintStatus)
  axios({
      method: 'POST',
      url: escalation_approval,
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
          getAllComplaints();
          handleClose();
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
    }
    else{
        handleClose();
    }
 }

  return (
    <div>
      <Dialog
        open={openResponseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{opacity:0.5}}
      >
        <DialogTitle>Send Your Response</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type Your Response For Respective Complaint.
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

        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        onChange={(event, value)=>setComplaintStatus(value.id)}
        renderInput={(params) => ( <TextField {...params} 
        label="Status"
        InputLabelProps={{shrink:true}}
        sx={{ width: "100%" }} variant="outlined"
        size="small" color="secondary"
            />
        )}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={SendResponse}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}