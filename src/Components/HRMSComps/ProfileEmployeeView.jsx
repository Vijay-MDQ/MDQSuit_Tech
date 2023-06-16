import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Card, Container, Grid } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LayersIcon from '@mui/icons-material/Layers';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import Heading from '../Heading';
import IconBreadcrumbs from '../Breadcrumbs';



export default function ProfileEmployeeDialog() {



  return (
    <div>

      <Box py={2} px={1}>
    <IconBreadcrumbs
    previous={'Home'}
    current={'HRMS'}
    currentSection={'Profile'}
    link1={`/home`}
    link2={'/home/HRMS'}
    
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading  title={'Your Profile'}/>
      </Box>
    </Container>

          <Container>
            <Box p={3}>
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
          </Container>

          <Container>
            <Box textAlign='center' component={Card} py={3} mx={3}>
                <Typography  fontWeight={600} variant='h6'>Your Hierarchy</Typography>
            </Box>
             <Box className="tree" py={3}>
	<ul>
  <li>
    <a href="#">Employee Name</a>
    <ul>
      <li>
        <a href="#">Team Lead Name</a>
        <ul>
          <li>
            <a href="#">Manager</a>
          </li><li>
            <a href="#">Assistant Manager</a>
            <ul>
              <li>
                <a href="#">President</a>
              </li><li>
                <a href="#">Vice President</a>
              </li>
            </ul>
          </li>
        </ul>
      </li><li>
        <a href="#">Team Lead Name</a>
        <ul>
          <li>
            <a href="#">Senior Manager</a>
            <ul>
              <li>
                <a href="#">Director</a>
              </li>
            </ul>
          </li><li>
            <a href="#">Manager</a>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
</Box>
          </Container>
    </div>
  );
}