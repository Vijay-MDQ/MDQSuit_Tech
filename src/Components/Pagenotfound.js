import React from 'react'
import pagenotfound from '../Assets/pagenotfound.jpg'
import { Box, Button } from '@mui/material';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';
import { startUrl } from '../Routes';

function Pagenotfound() {
    const navigate = useNavigate();
    const auth = localStorage.getItem('true', true);
    return (
        <Box sx={{ textAlign: 'center'}}>
            <Box >
                <Image src={pagenotfound} className='w-50 h-50' />
            </Box>
            <Box sx={{ py: 5 }}>
                <Button variant="contained" onClick={() => {
                    if (!auth) {
                        navigate(startUrl);
                        localStorage.clear();
                    } else {
                        navigate(`${startUrl}app`);
                    }
                }}>Go to home page</Button>
            </Box>
        </Box>
    )
}

export default Pagenotfound