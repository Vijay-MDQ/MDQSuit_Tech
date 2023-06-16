import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, IconButton, Input, InputAdornment, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

export default function SiteProjectBillChatDialog() {
  const [open, setOpen] = React.useState(false);
  const[inputText , setInputText] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button fullWidth sx={{height:42, bgcolor:'secondary.main', ':hover':{bgcolor:'success.main'}}} variant="outlined" onClick={handleClickOpen}>
        Open Bill Chat Box
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <Box display='flex' justifyContent='end' paddingTop={1} paddingRight={1}>
         <CloseIcon onClick={handleClose} />
        </Box>
        <Box m={1} border='1px solid silver'>
        <Box textAlign='left' p={1} mb={3}>
        <Typography variant='h5' fontWeight={600}>Bill Chat</Typography>
        <Typography>All Your Chats Will be Stored Here.</Typography>
        </Box>
        <Box p={2} width={300}>
        <Typography>Team Name</Typography>
         <Typography textAlign='justify' sx={{wordBreak:'break-word'}}>Text : {inputText}</Typography>
         <Typography variant='caption'>Date and Time</Typography>
        </Box>
        <Box sx={{border:'1px solid silver', borderWidth:'1px 0px 1px 0px'}}>
        <Input
         id="standard-adornment-password"
        type='text'
        multiline
        placeholder=' Type Your Text Here'
        fullWidth
        onChange={(e)=>setInputText(e.target.value)}
        endAdornment={
        <InputAdornment position="end">
        <IconButton>
            <SendIcon />
        </IconButton>
        </InputAdornment>
        }
         />
         </Box>
        </Box>
      </Dialog>
    </div>
  );
}