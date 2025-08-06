import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { Tabs, Tab, Box } from '@mui/material';
import ClientOverview from './ClientOverview';
import FixList from '../shared/FixList';
import FixDetails from '../shared/FixDetails';
import RequestListTab from './RequestTab';
// import { sample } from "../../../sample";
import RequestTab from './RequestTab';
import { Book } from '@mui/icons-material';
import BookingTab from './BookingTab';

const mainTabs = [
  'Overview',
  'Requests',
  'Bookings',
  'Quotes',
  'Payments & Invoices',
  'Messages',
  'Ratings & Reviews',
  'Account',
];

const fixRequestSubTabs = ['Requests'];
const bookingsSubTabs = ['In Progress', 'Completed', 'Rejected'];
const quotesSubTabs = ['Received', 'Details'];
const paymentsSubTabs = ['Payments', 'Invoices'];
const ratingsSubTabs = ['My Ratings', 'My Reviews'];
const accountSubTabs = ['Profile', 'Notifications', 'Settings'];


const SubTabPanel: React.FC<{ tabs: string[]; children: (idx: number) => React.ReactNode }> = ({ tabs, children }) => {
  const [subTab, setSubTab] = React.useState(0);
  const badges: { label: string; onRemove: () => void }[] = []; // <-- Populate this from your filter state
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

// const filterRequestsByFixerStatus = (status: string) => {
//   return sample.fixRequests.filter(req =>
//     req.fixerStatuses?.some((fs: any) => fs.status === status)
//   );
// };

const ClientDashboard: React.FC<{ userType: 'client' }> = ({ userType }) => {
  // State for viewing details of sent and pending requests
  const [selectedSent, setSelectedSent] = React.useState<any>(null);
  const [selectedPending, setSelectedPending] = React.useState<any>(null);

  return (
    <DashboardLayout userType={userType} tabs={mainTabs}>
      {(tab) => {
        switch (tab) {
          case 0:
            return <ClientOverview />;
          case 1:
            return <RequestTab />;
            // return <FixTab type="request" />;

          case 2:
            return (
              <BookingTab />
                // <SubTabPanel tabs={bookingsSubTabs}>
                //   {(subTab) => <FixTab type="booking" subTab={subTab} />}
                //   {/* {(subTab) => <FixTab type="booking" subTab={subTab} />} */}
                // </SubTabPanel>
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