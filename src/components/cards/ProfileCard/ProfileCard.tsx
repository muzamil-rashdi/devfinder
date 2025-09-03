import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import { Favorite, FavoriteBorder, Person } from "@mui/icons-material";
import { GitHubUser, GitHubUserDetailed } from "../../../types";
import { useTheme } from "../../../context/ThemeContext";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addFavorite, removeFavorite } from "../../../redux/slices/favoritesSlice";
import styled from "styled-components";
import axios from "axios";

interface StyledCardProps {
  theme: any;
}

const StyledCard = styled(Card)<StyledCardProps>`
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
  border-radius: 16px;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${(props: any) => props.theme.shadows[6]};
  }
`;

interface ProfileCardProps {
  user: GitHubUser;
  onClick?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, onClick }) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state: any) => state.favorites.users);
  const isFavorite = favorites.some((fav: GitHubUser) => fav.id === user.id);

  const [detailedUser, setDetailedUser] = useState<GitHubUserDetailed | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(user.id));
    } else {
      dispatch(addFavorite(user));
    }
  };

  useEffect(() => {
    let isMounted = true;
    setLoadingDetails(true);
    axios
      .get(`https://api.github.com/users/${user.login}`)
      .then((res) => {
        if (isMounted) {
          setDetailedUser(res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
      })
      .finally(() => {
        if (isMounted) setLoadingDetails(false);
      });

    return () => {
      isMounted = false;
    };
  }, [user.login]);

  return (
    <StyledCard
      onClick={onClick}
      style={{ backgroundColor: theme.surface }}
      theme={theme}
    >
      {/* Favorite button in top-right */}
      <IconButton
        onClick={handleToggleFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: theme.surface,
          "&:hover": { backgroundColor: theme.primary + "22" },
        }}
      >
        {isFavorite ? (
          <Favorite className="text-red-500" />
        ) : (
          <FavoriteBorder style={{ color: theme.textSecondary }} />
        )}
      </IconButton>

      <CardContent className="flex flex-col items-center p-6">
        {/* Avatar */}
        <Avatar
          src={user.avatar_url}
          alt={user.login}
          sx={{
            width: 96,
            height: 96,
            mb: 2,
            border: `3px solid ${theme.primary}`,
          }}
        >
          <Person className="text-4xl" />
        </Avatar>

        {/* Username */}
        <Typography
          variant="h6"
          className="text-center font-semibold"
          style={{ color: theme.text }}
        >
          {user.login}
        </Typography>

        {/* Real Name */}
        <Typography
          variant="body2"
          className="text-center"
          style={{ color: theme.textSecondary }}
        >
          {detailedUser?.name || "Unknown User"}
        </Typography>

        {/* Bio */}
        <Typography
          variant="body2"
          className="text-center mt-2"
          style={{ color: theme.textSecondary, fontStyle: !detailedUser?.bio ? "italic" : "normal" }}
        >
          {detailedUser?.bio
            ? detailedUser.bio.length > 100
              ? `${detailedUser.bio.substring(0, 100)}...`
              : detailedUser.bio
            : "No bio available"}
        </Typography>

        {/* Stats */}
        <Box
          className="grid grid-cols-3 gap-4 w-full mt-4"
          sx={{
            textAlign: "center",
            borderTop: `1px solid ${theme.textSecondary}33`,
            pt: 2,
          }}
        >
          {loadingDetails ? (
            <div className="col-span-3 flex justify-center py-2">
              <CircularProgress size={20} style={{ color: theme.primary }} />
            </div>
          ) : (
            <>
              <div>
                <Typography variant="body2" sx={{ fontWeight: "bold", color: theme.text }}>
                  {detailedUser?.followers ?? "N/A"}
                </Typography>
                <Typography variant="caption" style={{ color: theme.textSecondary }}>
                  Followers
                </Typography>
              </div>
              <div>
                <Typography variant="body2" sx={{ fontWeight: "bold", color: theme.text }}>
                  {detailedUser?.following ?? "N/A"}
                </Typography>
                <Typography variant="caption" style={{ color: theme.textSecondary }}>
                  Following
                </Typography>
              </div>
              <div>
                <Typography variant="body2" sx={{ fontWeight: "bold", color: theme.text }}>
                  {detailedUser?.public_repos ?? "N/A"}
                </Typography>
                <Typography variant="caption" style={{ color: theme.textSecondary }}>
                  Repos
                </Typography>
              </div>
            </>
          )}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ProfileCard;
