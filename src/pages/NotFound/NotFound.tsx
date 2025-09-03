import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <Container className="flex flex-col items-center justify-center min-h-screen">
      <Typography variant="h1" className="font-bold mb-4" style={{ color: theme.text }}>
        404
      </Typography>
      <Typography variant="h4" className="mb-4" style={{ color: theme.text }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" className="mb-8 text-center" style={{ color: theme.textSecondary }}>
        The page you are looking for doesn't exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/')}
        style={{ backgroundColor: theme.primary }}
      >
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;