import React from 'react';
import {Box,Button,Card,Grid,TextField,Typography, Container, Autocomplete} from "@mui/material";
import AssignedSiteProjectTable from './AssignedSiteProjectTable';

export default function AssignedSiteProjectsTab() {
  return (
    <Box>
        <AssignedSiteProjectTable />
    </Box>
  )
}
