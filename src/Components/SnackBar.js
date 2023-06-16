import React from 'react'
import { Alert, Grow, Snackbar } from '@mui/material';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function GrowTransition(props) {
    return <Grow {...props} direction="up" />;
  }

function SnackBar({ open, message,setOpen ,status,color }) {

    return (
        <Snackbar
            open={open}
            autoHideDuration={1500}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={() => setOpen(false)}
            TransitionComponent={GrowTransition}
           >
            <Alert icon={status ? <TaskOutlinedIcon fontSize="inherit" /> : <ErrorOutlineIcon fontSize="inherit" />} severity={color ? 'success' : 'error'} variant="filled" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SnackBar