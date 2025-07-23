import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { Tabs, Tab, Box } from '@mui/material';
import ClientOverview from './ClientOverview';
import FixRequestsPanel from './FixRequestsPanel';
import PendingRequestList from './PendingRequestList';
import FixRequestDetails from './FixRequestDetails';
import { sample } from "../../../sample";

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

const fixRequestSubTabs = ['Sent Requests', 'Pending'];
const bookingsSubTabs = ['In Progress', 'Completed', 'Rejected'];
const quotesSubTabs = ['Received', 'Details'];
const paymentsSubTabs = ['Payments', 'Invoices'];
const ratingsSubTabs = ['My Ratings', 'My Reviews'];
const accountSubTabs = ['Profile', 'Notifications', 'Settings'];

const SubTabPanel: React.FC<{ tabs: string[]; children: (idx: number) => React.ReactNode }> = ({ tabs, children }) => {
  const [subTab, setSubTab] = React.useState(0);
  return (
    <Box
      sx={{
        bgcolor: '#f4f6fa', // light shade for sub-tab background
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
          bgcolor: '#f9fafc', // even lighter shade for the tabs themselves
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

const ClientDashboard: React.FC<{ userType: 'client' }> = ({ userType }) => {
  // State for viewing details of a pending request
  const [selectedPending, setSelectedPending] = React.useState<any>(null);

  return (
    <DashboardLayout userType={userType} tabs={mainTabs}>
      {(tab) => {
        switch (tab) {
          case 0:
            return <ClientOverview />;
          case 1:
            return (
              <SubTabPanel tabs={fixRequestSubTabs}>
                {(subTab) => {
                  switch (subTab) {
                    case 0:
                      return <FixRequestsPanel requests={sample.fixRequests} title="Sent Fix Requests" />;
                    case 1:
                      // Pending requests only, with details view
                      return selectedPending ? (
                        <FixRequestDetails
                          request={selectedPending}
                          onBack={() => setSelectedPending(null)}
                        />
                      ) : (
                        <PendingRequestList
                          requests={sample.fixRequests.filter(r => r.status === 'Pending')}
                          onViewDetails={setSelectedPending}
                          title="Pending Requests"
                        />
                      );
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
                      return <div>Fixes In Progress</div>;
                    case 1:
                      return <div>Completed Fixes</div>;
                    case 2:
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
                      return <div>Received Quotes</div>;
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
                      return <div>My Ratings for Fixers</div>;
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

export default ClientDashboard;