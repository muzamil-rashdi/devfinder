import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Tabs, Tab, Box, CircularProgress, Alert, Typography } from '@mui/material';
import { useUser, useUserRepos, useUserFollowers, useUserFollowing } from '../../api/github';
import ProfileCard from '../../components/cards/ProfileCard/ProfileCard';
import RepoCard from '../../components/cards/RepoCard/RepoCard';
import { useTheme } from '../../context/ThemeContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [tabValue, setTabValue] = useState(0);
  const [followersPage] = useState(1);
  const [followingPage] = useState(1);
  const { theme } = useTheme();

  const { data: user, isLoading: userLoading, error: userError } = useUser(username || '');
  const { data: repos, isLoading: reposLoading, error: reposError } = useUserRepos(username || '', 1);
  const { data: followers, isLoading: followersLoading, error: followersError } = useUserFollowers(username || '', followersPage);
  const { data: following, isLoading: followingLoading, error: followingError } = useUserFollowing(username || '', followingPage);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (userLoading) {
    return (
      <Container className="flex justify-center items-center min-h-screen">
        <CircularProgress style={{ color: theme.primary }} />
      </Container>
    );
  }

  if (userError || !user) {
    return (
      <Container className="py-8">
        <Alert severity="error">
          {userError instanceof Error ? userError.message : 'User not found'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="mb-8">
        <ProfileCard user={user} />
      </div>

      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Repositories" />
        <Tab label={`Followers (${user.followers || 0})`} />
        <Tab label={`Following (${user.following || 0})`} />
      </Tabs>

      {/* Repositories Tab */}
      <TabPanel value={tabValue} index={0}>
        {reposLoading && (
          <div className="flex justify-center my-8">
            <CircularProgress style={{ color: theme.primary }} />
          </div>
        )}
        
        {reposError && (
          <Alert severity="error" className="mb-4">
            {reposError instanceof Error ? reposError.message : 'Failed to load repositories'}
          </Alert>
        )}
        
        {repos && Array.isArray(repos) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((repo: any) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </TabPanel>

      {/* Followers Tab */}
      <TabPanel value={tabValue} index={1}>
        {followersLoading && (
          <div className="flex justify-center my-8">
            <CircularProgress style={{ color: theme.primary }} />
          </div>
        )}
        
        {followersError && (
          <Alert severity="error" className="mb-4">
            {followersError instanceof Error ? followersError.message : 'Failed to load followers'}
          </Alert>
        )}
        
        {followers && Array.isArray(followers) && (
          <>
            {followers.length === 0 ? (
              <Typography variant="h6" className="text-center" style={{ color: theme.text }}>
                No followers found
              </Typography>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {followers.map((follower: any) => (
                  <ProfileCard key={follower.id} user={follower} />
                ))}
              </div>
            )}
          </>
        )}
      </TabPanel>

      {/* Following Tab */}
      <TabPanel value={tabValue} index={2}>
        {followingLoading && (
          <div className="flex justify-center my-8">
            <CircularProgress style={{ color: theme.primary }} />
          </div>
        )}
        
        {followingError && (
          <Alert severity="error" className="mb-4">
            {followingError instanceof Error ? followingError.message : 'Failed to load following'}
          </Alert>
        )}
        
        {following && Array.isArray(following) && (
          <>
            {following.length === 0 ? (
              <Typography variant="h6" className="text-center" style={{ color: theme.text }}>
                Not following anyone
              </Typography>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {following.map((followedUser: any) => (
                  <ProfileCard key={followedUser.id} user={followedUser} />
                ))}
              </div>
            )}
          </>
        )}
      </TabPanel>
    </Container>
  );
};

export default Profile;