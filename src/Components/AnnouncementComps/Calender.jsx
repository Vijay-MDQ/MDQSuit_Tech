import React, {useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import { Box } from '@mui/material';

export default function Calender() {
  const [dateState, setDateState] = useState(new Date())
  return (
    <Box>
      <Calendar 
    value={dateState}
      />
    </Box>
  )
}

