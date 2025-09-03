import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Favorite, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { theme, toggleTheme, themeMode } = useTheme();
  const navigate = useNavigate();

  return (
    <AppBar position="static" style={{ backgroundColor: theme.primary }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          DevFinder
        </Typography>
        
        <Button 
          color="inherit" 
          startIcon={<Favorite />}
          onClick={() => navigate('/favorites')}
        >
          Favorites
        </Button>
        
        <IconButton color="inherit" onClick={toggleTheme}>
          {themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;