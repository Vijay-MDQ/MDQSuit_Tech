import React from 'react'
import { Typography } from '@mui/material';

function Heading({ title }) {
    return (
        <Typography
            variant="h3"
            sx={{ textAlign: 'left', fontWeight: 600, fontSize: 25, textTransform: 'uppercase', color: '#363737' }}
        >
            {title}
        </Typography>
    )
}

export default Heading;