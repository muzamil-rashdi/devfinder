import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Tabs,
  Tab,
  Box,
  CircularProgress,
  Alert,
  Typography,
  Divider,
} from "@mui/material";
import {
  useUser,
  useUserRepos,
  useUserFollowers,
  useUserFollowing,
} from "../../api/github";
import ProfileCard from "../../components/cards/ProfileCard/ProfileCard";
import RepoCard from "../../components/cards/RepoCard/RepoCard";
import { useTheme } from "../../context/ThemeContext";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div hidden={value !== index} role="tabpanel">
      {value === index && <Box sx={{ pt: 4 }}>{children}</Box>}
    </div>
  );
};

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [tabValue, setTabValue] = useState(0);
  const [followersPage] = useState(1);
  const [followingPage] = useState(1);
  const { theme } = useTheme();

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useUser(username || "");
  const {
    data: repos,
    isLoading: reposLoading,
    error: reposError,
  } = useUserRepos(username || "", 1);
  const {
    data: followers,
    isLoading: followersLoading,
    error: followersError,
  } = useUserFollowers(username || "", followersPage);
  const {
    data: following,
    isLoading: followingLoading,
    error: followingError,
  } = useUserFollowing(username || "", followingPage);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Loading state
  if (userLoading) {
    return (
      <Container
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: theme.primary }} />
      </Container>
    );
  }

  // Error or no user
  if (userError || !user) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">
          {userError instanceof Error ? userError.message : "User not found"}
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      {/* Profile Section */}
      <Box sx={{ mb: 6 }}>
        <ProfileCard user={user} />
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Repositories" />
          <Tab label={`Followers (${user.followers || 0})`} />
          <Tab label={`Following (${user.following || 0})`} />
        </Tabs>
      </Box>

      {/* Repositories */}
      <TabPanel value={tabValue} index={0}>
        {reposLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
            <CircularProgress sx={{ color: theme.primary }} />
          </Box>
        )}

        {reposError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {reposError instanceof Error
              ? reposError.message
              : "Failed to load repositories"}
          </Alert>
        )}

        {repos && Array.isArray(repos) && (
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
            }}
          >
            {repos.map((repo: any) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </Box>
        )}
      </TabPanel>

      {/* Followers */}
      <TabPanel value={tabValue} index={1}>
        {followersLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
            <CircularProgress sx={{ color: theme.primary }} />
          </Box>
        )}

        {followersError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {followersError instanceof Error
              ? followersError.message
              : "Failed to load followers"}
          </Alert>
        )}

        {followers && Array.isArray(followers) && (
          <>
            {followers.length === 0 ? (
              <Typography
                variant="h6"
                align="center"
                sx={{ color: theme.text, mt: 4 }}
              >
                No followers found
              </Typography>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gap: 3,
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "1fr 1fr 1fr",
                    lg: "1fr 1fr 1fr 1fr",
                  },
                }}
              >
                {followers.map((follower: any) => (
                  <ProfileCard key={follower.id} user={follower} />
                ))}
              </Box>
            )}
          </>
        )}
      </TabPanel>

      {/* Following */}
      <TabPanel value={tabValue} index={2}>
        {followingLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
            <CircularProgress sx={{ color: theme.primary }} />
          </Box>
        )}

        {followingError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {followingError instanceof Error
              ? followingError.message
              : "Failed to load following"}
          </Alert>
        )}

        {following && Array.isArray(following) && (
          <>
            {following.length === 0 ? (
              <Typography
                variant="h6"
                align="center"
                sx={{ color: theme.text, mt: 4 }}
              >
                Not following anyone
              </Typography>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gap: 3,
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "1fr 1fr 1fr",
                    lg: "1fr 1fr 1fr 1fr",
                  },
                }}
              >
                {following.map((followedUser: any) => (
                  <ProfileCard key={followedUser.id} user={followedUser} />
                ))}
              </Box>
            )}
          </>
        )}
      </TabPanel>
    </Container>
  );
};

export default Profile;
