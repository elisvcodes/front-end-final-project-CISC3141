import React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import Grid from '@mui/material/Grid';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../_actions/auth';
const Navbar = () => {
  const authReducer = useSelector((state) => state.authReducer);
  const { isLoggedIn } = authReducer;
  const dispatch = useDispatch();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <AppBar position='static' color='inherit'>
          <Toolbar>
            <IconButton
              href='/'
              size='large'
              edge='start'
              color='inherit'
              aria-label='icon'
            >
              <BugReportOutlinedIcon
                style={{ fontSize: 40 }}
                color='secondary'
              />
            </IconButton>

            <Typography
              variant='h6'
              component='div'
              sx={{ marginRight: '820px' }}
            >
              BugTracker
            </Typography>

            {isLoggedIn ? (
              <Button
                href='/signin'
                className='btn'
                variant='contained'
                color='primary'
                size='small'
                style={{ textTransform: 'none', flexGrow: 0.1 }}
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  className='btn'
                  variant='text'
                  color='inherit'
                  size='small'
                  style={{ textTransform: 'none', flexGrow: 0.1 }}
                >
                  <Typography
                    sx={{
                      marginRight: '20px',
                      cursor: 'pointer',
                      color: '#616161',
                    }}
                  >
                    Features
                  </Typography>
                </Button>
                <Button
                  href='/signin'
                  className='btn'
                  variant='contained'
                  color='primary'
                  size='small'
                  style={{ textTransform: 'none', flexGrow: 0.1 }}
                >
                  Login
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Grid>
    </Box>
  );
};

export default Navbar;
