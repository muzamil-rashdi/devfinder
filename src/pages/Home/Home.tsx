import React, { useState } from 'react';
import { Container, TextField, Typography, Pagination, CircularProgress, Alert } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useDebounce } from '../../hooks/useDebounce';
import { useSearchUsers } from '../../api/github';
import ProfileCard from '../../components/cards/ProfileCard/ProfileCard';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const {
    data: searchResults,
    isLoading,
    isError,
    error,
  } = useSearchUsers(debouncedSearchQuery, page);

  const handleUserClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  return (
    <Container className="py-8">
      <div className="text-center mb-8">
        <Typography 
          variant="h2" 
          className="font-bold mb-4"
          style={{ color: theme.text }}
        >
          DevFinder
        </Typography>
        <Typography 
          variant="h6"
          style={{ color: theme.textSecondary }}
        >
          Discover GitHub developers and their repositories
        </Typography>
      </div>

      <div className="mb-8">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search GitHub users..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
          InputProps={{
            startAdornment: <Search className="mr-2" style={{ color: theme.textSecondary }} />,
            sx: {
              color: theme.text,
              '& .MuiInputBase-input': {
                color: theme.text,
              },
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.surface,
              color: theme.text,
              '& fieldset': {
                borderColor: theme.border,
              },
              '&:hover fieldset': {
                borderColor: theme.primary,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.primary,
              },
            },
          }}
        />
      </div>

      {/* Rest of the component remains the same */}
      {isError && (
        <Alert severity="error" className="mb-4">
          {error instanceof Error ? error.message : 'An error occurred while searching'}
        </Alert>
      )}

      {isLoading && (
        <div className="flex justify-center my-8">
          <CircularProgress style={{ color: theme.primary }} />
        </div>
      )}

      {searchResults && (
        <>
          <Typography variant="h6" className="mb-4" style={{ color: theme.text }}>
            {searchResults.total_count} users found
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {searchResults.items && searchResults.items.map((user) => (
              <div key={user.id}>
                <ProfileCard
                  user={user}
                  onClick={() => handleUserClick(user.login)}
                />
              </div>
            ))}
          </div>

          {searchResults.total_count > 0 && (
            <div className="flex justify-center">
              <Pagination
                count={Math.ceil(Math.min(searchResults.total_count, 1000) / 10)}
                page={page}
                onChange={(_, value) => setPage(value)}
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: theme.text,
                  },
                }}
              />
            </div>
          )}
        </>
      )}

      {debouncedSearchQuery && !isLoading && searchResults?.items?.length === 0 && (
        <Typography variant="h6" className="text-center" style={{ color: theme.text }}>
          No users found for "{debouncedSearchQuery}"
        </Typography>
      )}
    </Container>
  );
};

export default Home;