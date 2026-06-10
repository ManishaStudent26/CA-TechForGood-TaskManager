import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NewsComponent } from './newsapi';
import { useNavigate } from 'react-router-dom';

export default function ButtonAppBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{width: '100%' }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tech For Good
          </Typography>
          {/*<NewsComponent /> Note from ME: Ran out of credits while testing the component*/}
          <Button color="inherit" onClick={() => navigate(`/login`)}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );}