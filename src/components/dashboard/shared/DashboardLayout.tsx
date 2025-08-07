import React from 'react';
import { Box, Typography, Tabs, Tab, IconButton, Drawer, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; // <-- Add this import
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BookIcon from '@mui/icons-material/Book';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentIcon from '@mui/icons-material/Payment';
import MessageIcon from '@mui/icons-material/Message';
import StarIcon from '@mui/icons-material/Star';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material/styles';

const tabIcons = [
  <DashboardIcon />,
  <AssignmentIcon />,
  <BookIcon />,
  <ReceiptIcon />,
  <PaymentIcon />,
  <MessageIcon />,
  <StarIcon />,
  <AccountCircleIcon />,
];

interface DashboardLayoutProps {
  userType: 'fixer' | 'client';
  tabs: string[];
  children: (tabIndex: number) => React.ReactNode;
}

const TAB_CONTAINER_WIDTH = { xs: '100%', md: '65%' };

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ userType, tabs, children }) => {
  const [tab, setTab] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  // Render vertical sidebar (full, icons only, or hamburger)
  const renderSidebar = () => {
    // Hamburger for very small screens
    if (isSmDown) {
      return (
        <>
          {/* Hide hamburger when drawer is open */}
          {!drawerOpen && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                position: 'fixed',
                top: 64, // Push down so it doesn't cover the app title
                left: 24,
                zIndex: 1300,
                bgcolor: '#fff',
                boxShadow: 1,
              }}
              aria-label="Open sidebar"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              sx: { minWidth: 200, bgcolor: '#fff', borderRadius: 2, p: 2 },
            }}
          >
            {/* Close button inside Drawer */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
              <IconButton onClick={() => setDrawerOpen(false)} aria-label="Close sidebar">
                <CloseIcon /> {/* Use X icon for close */}
              </IconButton>
            </Box>
            <Typography variant="h6" fontWeight={700} sx={{ px: 2, mb: 2 }}>
              {userType === 'fixer' ? 'Fixer Dashboard' : 'Client Dashboard'}
            </Typography>
            <Tabs
              orientation="vertical"
              value={tab}
              onChange={(_, v) => {
                setTab(v);
                setDrawerOpen(false);
              }}
              sx={{
                '& .MuiTab-root': {
                  alignItems: 'flex-start',
                  fontWeight: 500,
                  textTransform: 'none',
                  px: 2,
                  py: 1.5,
                  justifyContent: 'flex-start',
                },
              }}
            >
              {tabs.map((label, idx) => (
                <Tab key={label} icon={tabIcons[idx] || <DashboardIcon />} label={label} />
              ))}
            </Tabs>
          </Drawer>
        </>
      );
    }

    // Icons only for medium screens
    if (isMdDown) {
      return (
        <Box
          sx={{
            minWidth: 64,
            bgcolor: '#fff',
            borderRadius: 3,
            boxShadow: 1,
            mr: 2,
            py: 2,
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Tabs
            orientation="vertical"
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{
              '& .MuiTab-root': {
                minWidth: 0,
                px: 1,
                py: 1.5,
                justifyContent: 'center',
              },
            }}
          >
            {tabs.map((label, idx) => (
              <Tab
                key={label}
                icon={tabIcons[idx] || <DashboardIcon />}
                aria-label={label}
                sx={{ minWidth: 0 }}
              />
            ))}
          </Tabs>
        </Box>
      );
    }

    // Full sidebar for large screens
    return (
      <Box
        sx={{
          minWidth: 220,
          bgcolor: '#fff',
          borderRadius: 3,
          boxShadow: 1,
          mr: 3,
          py: 2,
          height: 'fit-content',
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ px: 3, mb: 2 }}>
          {userType === 'fixer' ? 'Fixer Dashboard' : 'Client Dashboard'}
        </Typography>
        <Tabs
          orientation="vertical"
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              alignItems: 'flex-start',
              fontWeight: 500,
              textTransform: 'none',
              px: 3,
              py: 1.5,
              justifyContent: 'flex-start',
            },
          }}
        >
          {tabs.map((label, idx) => (
            <Tab key={label} icon={tabIcons[idx] || <DashboardIcon />} iconPosition="start" label={label} />
          ))}
        </Tabs>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: '#f7f8fa',
        py: 4,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: '95%',
          bgcolor: 'transparent',
        }}
      >
        {renderSidebar()}
        {/* Content Area */}
        <Box
          sx={{
            flex: 1,
            maxWidth: TAB_CONTAINER_WIDTH,
            bgcolor: '#fff',
            borderRadius: 3,
            boxShadow: 1,
            overflow: 'hidden',
            minHeight: '80vh',
            px: { xs: 2, sm: 4 },
            py: 4,
            ml: isSmDown ? 0 : undefined,
          }}
        >
          {children(tab)}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;