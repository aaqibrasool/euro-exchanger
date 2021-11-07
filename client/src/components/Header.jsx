import React from 'react'
import AppBar from '@mui/material/AppBar';
import Typography  from '@mui/material/Typography';

const Header = () => {
    return (
        <>
          <AppBar position='relative'>
            <Typography variant='h3' align='center'>
                Euro Exchange Rates
            </Typography>
          </AppBar> 
        </>
    )
}

export default Header
