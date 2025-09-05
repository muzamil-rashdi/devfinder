import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const NotFound: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box>
        <Typography
          variant="h1"
          fontWeight="bold"
          gutterBottom
          sx={{ color: theme.text }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: theme.text }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{ color: theme.textSecondary }}
        >
          The page you are looking for doesn’t exist or has been moved.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ backgroundColor: theme.primary }}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
