import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, Card, Grid } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LayersIcon from '@mui/icons-material/Layers';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ProfileDialog({open, setOpen}) {

  const [maxWidth, setMaxWidth] = React.useState('md');
 const [fullWidth, setFullWidth] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Employee Profile
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box>
            <Box p={5}>
           <Grid container spacing={4} rowSpacing={4}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
            <Box component={Card} p={4} alignItems='center' 
            display='flex' flexDirection='row'>
              <Box>
              <img alt='profile' src='https://wallpapers.com/images/featured/s52z1uggme5sj92d.jpg' 
              style={{objectFit:'contain', width:100, height:100, borderRadius:10}} />
            </Box>
            <Box px={2}>
              <Typography color='#28313c' fontWeight={600} fontSize={17}>VijayaPrasath</Typography>
              <Typography color='#616e80' variant='subtitle1'>Senior Developer</Typography>
              <Typography color='#616e80' variant='caption'>Emp Id : EMP-01</Typography>
            </Box>
            </Box>

            <Box mt={2} component={Card} p={2}  display='flex' justifyContent='space-between' flexDirection='column'>
                <Box  display='flex' justifyContent='space-between' flexDirection='row'>
                <Typography fontWeight={600}>Leaves</Typography>
                <Box alignSelf='center'>
                <HolidayVillageIcon sx={{color:'#616e80'}} fontSize='large'/>
                </Box>
                </Box>
                <Box display='flex'  flexDirection='row' mt={3} justifyContent='space-around'>
                <Box textAlign='center'>
                  <Typography color='#3860b5'>1</Typography>
                 <Typography color='#3860b5'>Balance</Typography>
                  </Box>
                  <Box textAlign='center'>
                  <Typography color='#c2312f'>1</Typography>
                 <Typography color='#c2312f'>Approved</Typography>
                  </Box>
                  <Box textAlign='center'>
                  <Typography color='#c2312f'>1</Typography>
                 <Typography color='#c2312f'>Rejected</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Box component={Card} p={3}  display='flex' justifyContent='space-between' flexDirection='column'>
                <Box  display='flex' justifyContent='space-between' flexDirection='row'>
                <Typography fontWeight={600}>Tasks</Typography>
                <Box alignSelf='center'>
                <FormatListBulletedIcon sx={{color:'#616e80'}} fontSize='large'/>
                </Box>
                </Box>
                <Box display='flex'  flexDirection='row' mt={3}>
                  <Box mr={2} textAlign='center'>
                  <Typography color='#3860b5'>1</Typography>
                 <Typography color='#3860b5'>Progress</Typography>
                  </Box>
                  <Box ml={2} textAlign='center'>
                  <Typography color='#c2312f'>1</Typography>
                 <Typography color='#c2312f'>Overdue</Typography>
                  </Box>

                </Box>

              </Box>

              <Box mt={3} component={Card} p={2}  display='flex' justifyContent='space-between' flexDirection='column'>
                <Box  display='flex' justifyContent='space-between' flexDirection='row'>
                <Typography fontWeight={600}>Projects</Typography>
                <Box alignSelf='center'>
                <LayersIcon sx={{color:'#616e80'}} fontSize='large'/>
                </Box>
                </Box>
                <Box display='flex'  flexDirection='row' mt={3}>
                  <Box mr={2} textAlign='center'>
                  <Typography color='#3860b5'>1</Typography>
                 <Typography color='#3860b5'>Approved</Typography>
                  </Box>
                  <Box ml={2} textAlign='center'>
                  <Typography color='#c2312f'>1</Typography>
                 <Typography color='#c2312f'>Overdue</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>


            

           </Grid>
            </Box>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}