import React from 'react';
import { Card, CardContent, Typography, Chip, IconButton } from '@mui/material';
import { Star, ForkRight, Visibility } from '@mui/icons-material';
import { GitHubRepo } from '../../../types';
import { useTheme } from '../../../context/ThemeContext';

interface RepoCardProps {
  repo: GitHubRepo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  const { theme } = useTheme();

  return (
    <Card 
      className="h-full hover:shadow-lg transition-shadow"
      style={{ backgroundColor: theme.surface }}
    >
      <CardContent className="h-full flex flex-col">
        <Typography 
          variant="h6" 
          className="mb-2 font-semibold"
          style={{ color: theme.text }}
        >
          {repo.name}
        </Typography>
        
        {repo.description && (
          <Typography 
            variant="body2" 
            className="mb-4 flex-grow"
            style={{ color: theme.textSecondary }}
          >
            {repo.description}
          </Typography>
        )}
        
        {repo.language && (
          <Chip
            label={repo.language}
            size="small"
            className="mb-3"
            style={{ 
              backgroundColor: theme.primary,
              color: 'white'
            }}
          />
        )}
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star fontSize="small" style={{ color: theme.textSecondary }} />
              <Typography variant="body2" style={{ color: theme.textSecondary, marginLeft: '4px' }}>
                {repo.stargazers_count}
              </Typography>
            </div>
            
            <div className="flex items-center">
              <ForkRight fontSize="small" style={{ color: theme.textSecondary }} />
              <Typography variant="body2" style={{ color: theme.textSecondary, marginLeft: '4px' }}>
                {repo.forks_count}
              </Typography>
            </div>
            
            <div className="flex items-center">
              <Visibility fontSize="small" style={{ color: theme.textSecondary }} />
              <Typography variant="body2" style={{ color: theme.textSecondary, marginLeft: '4px' }}>
                {repo.watchers_count}
              </Typography>
            </div>
          </div>
          
          <IconButton 
            size="small" 
            onClick={() => window.open(repo.html_url, '_blank')}
            aria-label="View repository on GitHub"
          >
            <Typography variant="body2" style={{ color: theme.primary }}>
              View
            </Typography>
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default RepoCard;