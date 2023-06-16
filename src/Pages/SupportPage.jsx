import React from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container} from "@mui/material";
import Heading from '../Components/Heading';
import Breadcrumbs from '../Components/Breadcrumbs';


export default function SupportPage() {
  return (
    <Box>

    <Box py={2} px={1}>
    <Breadcrumbs 
    previous={'Home'}
    current={'Support'}
    link1={`/home`}
    link2={'/project'}
    
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading  title={'Support'}/>
      </Box>
    </Container>










  </Box>
  )
}
