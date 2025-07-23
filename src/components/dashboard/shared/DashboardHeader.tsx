import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const DashboardHeader: React.FC<{ userType: 'fixer' | 'client' }> = ({ userType }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">
        {userType === 'fixer' ? 'Fixer Dashboard' : 'Client Dashboard'}
      </Typography>
    </Toolbar>
  </AppBar>
);

export default DashboardHeader;