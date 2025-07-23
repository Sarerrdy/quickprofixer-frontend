import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { Tabs, Tab, Box } from '@mui/material';

const mainTabs = [
  'Overview',
  'Fix Requests',
  'Bookings & Fixes',
  'Quotes',
  'Payments & Invoices',
  'Messages',
  'Ratings & Reviews',
  'Account',
];

const jobRequestSubTabs = ['Incoming Requests', 'Pending', 'Details'];
const bookingsSubTabs = ['Accepted', 'In Progress', 'Completed', 'Rejected'];
const quotesSubTabs = ['Sent', 'Details'];
const paymentsSubTabs = ['Payments', 'Invoices'];
const ratingsSubTabs = ['Client Ratings', 'My Reviews'];
const accountSubTabs = ['Profile', 'Notifications', 'Settings'];

const SubTabPanel: React.FC<{ tabs: string[]; children: (idx: number) => React.ReactNode }> = ({ tabs, children }) => {
  const [subTab, setSubTab] = React.useState(0);
  return (
    <Box
      sx={{
        bgcolor: '#f4f6fa',
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        p: 2,
        mt: 2,
      }}
    >
      <Tabs
        value={subTab}
        onChange={(_, v) => setSubTab(v)}
        sx={{
          mb: 2,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: '#f9fafc',
          borderRadius: 1,
          px: 1,
        }}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
      <Box>{children(subTab)}</Box>
    </Box>
  );
};

const FixerDashboard: React.FC<{ userType: 'fixer' }> = ({ userType }) => {
  return (
    <DashboardLayout userType={userType} tabs={mainTabs}>
      {(tab) => {
        switch (tab) {
          case 0:
            return <h2>Overview</h2>;
          case 1:
            return (
              <SubTabPanel tabs={jobRequestSubTabs}>
                {(subTab) => {
                  switch (subTab) {
                    case 0:
                      return <div>Incoming Fix Requests</div>;
                    case 1:
                      return <div>Pending Requests</div>;
                    case 2:
                      return <div>Request Details</div>;
                    default:
                      return null;
                  }
                }}
              </SubTabPanel>
            );
          case 2:
            return (
              <SubTabPanel tabs={bookingsSubTabs}>
                {(subTab) => {
                  switch (subTab) {
                    case 0:
                      return <div>Accepted Fixes</div>;
                    case 1:
                      return <div>Fixes In Progress</div>;
                    case 2:
                      return <div>Completed Fixes</div>;
                    case 3:
                      return <div>Rejected Fixes</div>;
                    default:
                      return null;
                  }
                }}
              </SubTabPanel>
            );
          case 3:
            return (
              <SubTabPanel tabs={quotesSubTabs}>
                {(subTab) => {
                  switch (subTab) {
                    case 0:
                      return <div>Sent Quotes</div>;
                    case 1:
                      return <div>Quote Details</div>;
                    default:
                      return null;
                  }
                }}
              </SubTabPanel>
            );
          case 4:
            return (
              <SubTabPanel tabs={paymentsSubTabs}>
                {(subTab) => {
                  switch (subTab) {
                    case 0:
                      return <div>Payment History</div>;
                    case 1:
                      return <div>Invoices</div>;
                    default:
                      return null;
                  }
                }}
              </SubTabPanel>
            );
          case 5:
            return <div>Messages</div>;
          case 6:
            return (
              <SubTabPanel tabs={ratingsSubTabs}>
                {(subTab) => {
                  switch (subTab) {
                    case 0:
                      return <div>Client Ratings</div>;
                    case 1:
                      return <div>My Reviews</div>;
                    default:
                      return null;
                  }
                }}
              </SubTabPanel>
            );
          case 7:
            return (
              <SubTabPanel tabs={accountSubTabs}>
                {(subTab) => {
                  switch (subTab) {
                    case 0:
                      return <div>Profile</div>;
                    case 1:
                      return <div>Notifications</div>;
                    case 2:
                      return <div>Settings</div>;
                    default:
                      return null;
                  }
                }}
              </SubTabPanel>
            );
          default:
            return null;
        }
      }}
    </DashboardLayout>
  );
};

export default FixerDashboard;