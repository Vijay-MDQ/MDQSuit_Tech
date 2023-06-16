import React, { useEffect, useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Divider , Stack} from "@mui/material";
import Calender from '../Calender';
import { Link } from 'react-router-dom';
import { getallannouncement, methodGet } from '../../../API_Service/API_Links';
import axios from 'axios';

export default function SeeAllEvent() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [color, setColor] = useState(false);
  const [message, setMessage] = useState("");
  const [allEvents , setAllEvents] = useState([]);

  useEffect(() => {
    axios({
        method: methodGet,
        url: getallannouncement,
    }).then(res => {
        if (res.data.error) {
            setMessage(res.data.message)
            setOpen(true)
            setStatus(false)
            setColor(false)
        } else {
            setMessage(res.data.message)
            setAllEvents(res.data.data)
            setOpen(true)
            setStatus(true)
            setColor(true)

        }
    }).catch(err => {
        alert('Oops something went wrong ' + err)
    });
}, [])

  // if (!isloading) {
  //   return <Statusloader />;
  // } else {
 console.log(allEvents)
  return (
      <Box py={3}>
        <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>

          <Grid container display='flex' justifyContent='space-around'>

            {/* <Grid item xs={4} sm={4} md={4} lg={4} justifyContent='start'  >
              <Box p={2}>
              <Calender />
              </Box>
            
            </Grid>
             */}

            <Grid item xs={12} sm={12} md={12} mg={12}>
              <Grid container spacing={4} display='flex' justifyContent='start' px={4}>
              { allEvents.map((announcement) => 
              <Grid item xs={4} sm={4} md={4} lg={4}>
             <Box>
              <Box className='eventBox3' boxShadow={3} p={4} color='#ffff'>
                <Stack spacing={2}>
                  {/* <Typography variant='h5' fontWeight={600}>{announcement.title}</Typography> */}
                  <Box>
                    <Typography variant='h4' fontWeight={600}>{announcement.title}</Typography>
                    {/* <Typography variant='h4' fontWeight={600}>DAY 2023</Typography> */}
                  </Box>
                  <Typography variant='subtitle1'>{announcement.startdate} - {announcement.enddate} </Typography>
                  <Typography variant='subtitle2'>{announcement.start_time} - {announcement.end_time}</Typography>
                  
                </Stack>
                  {/* <Box mt={4} display='flex' justifyContent='end'>
                    <Link><Typography  variant='h5' fontWeight={600}>Register Now</Typography></Link>
                  </Box> */}
              </Box>
             </Box>
              </Grid>
              )}
         
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </Grid>

      </Box>
  )
  // }
}