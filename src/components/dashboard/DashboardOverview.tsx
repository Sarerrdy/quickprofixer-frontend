import React from 'react';
import { Box, Typography, Tabs, Tab, AppBar } from '@mui/material';

interface DashboardLayoutProps {
  userType: 'fixer' | 'client';
  children?: React.ReactNode;
}

const fixerTabs = [
  'Overview',
  'Job Requests',
  'Accepted Jobs',
  'Messages',
  'Payments',
];

const clientTabs = [
  'Overview',
  'Post a Job',
  'My Requests',
  'Quotes',
  'Messages',
  'Payments',
];

const TAB_CONTAINER_WIDTH = { xs: '100%', md: '65%' }; // Match TabsControl

const DashboardOverview: React.FC<DashboardLayoutProps> = ({ userType, children }) => {
  const [tab, setTab] = React.useState(0);

  const tabs = userType === 'fixer' ? fixerTabs : clientTabs;

  return (
    <Box sx={{ width: '100%', maxWidth: '95%', mx: 'auto', minHeight: '100vh', bgcolor: '#f7f8fa', py: 4 }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: TAB_CONTAINER_WIDTH,
          mx: 'auto',
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 1,
        }}
      >
        {/* Header */}
        <Box sx={{ bgcolor: '#fff', px: 3, py: 2, borderBottom: '1px solid #eee' }}>
          <Typography variant="h5" fontWeight={700}>
            QuickProFixer
          </Typography>
        </Box>
        {/* Tabs */}
        <AppBar position="static" color="default" elevation={0} sx={{ bgcolor: '#fff', borderBottom: '1px solid #eee' }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              px: 2,
              '& .MuiTab-root': { fontWeight: 500, textTransform: 'none' },
            }}
          >
            {tabs.map((label) => (
              <Tab key={label} label={label} />
            ))}
          </Tabs>
        </AppBar>
        {/* Main Content */}
        <Box sx={{ bgcolor: '#fff', px: { xs: 2, sm: 4 }, py: 4 }}>
          <Typography variant="h4" fontWeight={700} mb={3}>
            Overview
          </Typography>
          {/* Placeholder lines for overview content */}
          {[...Array(6)].map((_, i) => (
            <Box
              key={i}
              sx={{
                height: 14,
                bgcolor: '#e5e7eb',
                borderRadius: 2,
                mb: 2,
                width: `${80 - i * 8}%`,
                maxWidth: '100%',
              }}
            />
          ))}
          {/* Render children if provided */}
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardOverview;