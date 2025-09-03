import React from 'react';
import { Container, Typography} from '@mui/material';
import { useAppSelector } from '../../redux/hooks';
import ProfileCard from '../../components/cards/ProfileCard/ProfileCard';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Favorites: React.FC = () => {
  const favorites = useAppSelector(state => state.favorites.users);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleUserClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  return (
    <Container className="py-8">
      <Typography variant="h4" className="mb-6" style={{ color: theme.text }}>
        Favorite Developers
      </Typography>

      {favorites.length === 0 ? (
        <Typography variant="h6" className="text-center" style={{ color: theme.textSecondary }}>
          No favorites yet. Start adding developers from the home page!
        </Typography>
      ) : (
                // Replace the Grid components with:
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {favorites.map(user => (
                    <div key={user.id}>
                    <ProfileCard
                        user={user}
                        onClick={() => handleUserClick(user.login)}
                    />
                    </div>
                ))}
                </div>
                    )}
    </Container>
  );
};

export default Favorites;