import React from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container} from "@mui/material";
import Heading from '../Heading';
import Breadcrumbs from '../Breadcrumbs';
import IconBreadcrumbs from '../Breadcrumbs';

export default function Form16Ssection() {
  return (
    <Box>

      <Box py={2} px={1}>
    <IconBreadcrumbs
    previous={'Home'}
    current={'HRMS'}
    currentSection={'Form 16'}
    link1={`/home`}
    link2={'/home/HRMS'}
    
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading  title={'FORM 16'}/>
      </Box>
    </Container>










  </Box>
  )
}
