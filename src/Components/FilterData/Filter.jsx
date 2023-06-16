import React from 'react'
import { Box, Menu, IconButton, TextField, InputAdornment, Input } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { useState } from 'react';
import KeyboardIcon from '@mui/icons-material/Keyboard';

function Filter({ label, setSearch }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [value , setValue] = useState('');
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box>
            <IconButton className='text-white' onClick={handleClick} aria-label="delete">
                {value !=="" ? <FilterAltIcon fontSize="small" /> : <FilterAltOffIcon fontSize="small"  />}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ p: 2 }}>
         <Input
        autoFocus
            value={value}
            label={label}
            variant="standard"
            onChange={(event) => { 
            setSearch(event.target.value)
            setValue(event.target.value)
            }} 
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start">                            
            <IconButton>
            <KeyboardIcon />
           </IconButton></InputAdornment>}
          />
          </Box>
            </Menu>
        </Box>
    )
}

export default Filter