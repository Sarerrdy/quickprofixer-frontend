import React, { useState, useRef, useEffect } from 'react';
import { Tabs, Tab, Box, Button, useMediaQuery, useTheme, Typography, Divider, Snackbar, Alert } from '@mui/material';
import SearchSection from './SearchSection';
import TabProgressBar from './TabProgressBar';
import DateTab from './DateTab';
import DescriptionTab from './DescriptionTab';
import FilesTab from './FilesTab';
import LocationTab from './LocationTab';
import PreviewTab from './PreviewTab';
import FixerList from '../fixers/FixerList';
import AvailableFixersTab from './AvailableFixersTab';
import { useFetch } from '../../api/hooks/useApi';
import { Fixer } from '../fixers/Fixer';

/**
 * Props for TabPanel component.
 */
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

/**
 * TabPanel component renders the content of each tab.
 * Uses Tailwind CSS for layout and Material UI Box for padding and sizing.
 * Uses a light gray background to visually separate from layout background.
 */
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      className="tab-panel-scroll w-full h-full overflow-y-auto box-border"
    >
      {value === index && (
        <Box
          p={3}
          className="py-10 px-4 mx-auto rounded-lg shadow-sm"
          sx={{
            width: '100%',
            minWidth: 0,
            boxSizing: 'border-box',
            borderRadius: 2,
            boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

/**
 * Main TabsControl component for the multi-step service request flow.
 * - Handles tab navigation, validation, and state for each step.
 * - Uses Material UI Tabs and Tab components for navigation.
 * - Uses Tailwind CSS for layout and scroll styling.
 */
const TabsControl: React.FC = () => {
  // Tab navigation state
  const [value, setValue] = useState(0);

  // Form states for each tab
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [document, setDocument] = useState<File | null>(null);
  const [links, setLinks] = useState<{ title: string; url: string }[]>([]);
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [town, setTown] = useState('');
  const [lga, setLga] = useState('');
  const [country, setCountry] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [manualLocation, setManualLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showFixers, setShowFixers] = useState(false);
  const [serviceType, setServiceType] = useState('');
  const [serviceTypeId, setServiceTypeId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchFixers, setFetchFixers] = useState(false);
  const [addressId, setAddressId] = useState<number>(1);

  // Responsive design hooks
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Validation states
  const [dateError, setDateError] = useState<string>('');
  const [descError, setDescError] = useState<string>('');
  const [descTouched, setDescTouched] = useState(false);

  // Snackbar state for toast notifications
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');

  // Heading for Available Fixers tab
  const [fixersTabHeading, setFixersTabHeading] = useState('Available Fixers');

  // Minimum rating for fixer search
  const minRating = 4;

  /**
   * Fetch fixers based on selected service and location.
   * Only enabled when user clicks "Find Fixers Now".
   */
  const { data: fixers = [], isLoading, error } = useFetch<Fixer[]>(
    fetchFixers ? ['fixers', serviceType, town, minRating] : ['fixers'],
    fetchFixers ? '/fixer/search' : '',
    fetchFixers ? { skillCategory: serviceType, location: town, minRating } : {},
    { enabled: fetchFixers }
  );

  /**
   * Handles tab change event.
   * Only allows navigation to previous or current tabs.
   */
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue <= value) {
      setValue(newValue);
    }
  };

  /**
   * Handles "Next" button click.
   * Validates current tab before moving to the next.
   */
  const handleNext = () => {
    // Tab 0: Service selection required
    if (value === 0 && !serviceType) return;

    // Tab 1: Date validation
    if (value === 1) {
      const now = new Date();
      const minDate = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour ahead
      if (!selectedDate || selectedDate < minDate) {
        setDateError('Please select a date at least one hour from now.');
        return;
      } else {
        setDateError('');
      }
    }

    // Tab 2: Title and description validation
    if (value === 2) {
      if (!isValidText(title, 5)) {
        setDescError('Title must be at least 5 letters and not only numbers or special characters.');
        return;
      }
      if (!isValidText(description, 20)) {
        setDescError('Description must be at least 20 letters and not only numbers or special characters.');
        return;
      }
      setDescError('');
    }

    if (value < labels.length - 1) {
      setValue(value + 1);
    }
  };

  /**
   * Handles "Previous" button click.
   * Moves to the previous tab.
   */
  const handlePrevious = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  /**
   * Handles adding a new supporting link.
   */
  const handleAddLink = () => {
    if (newLinkTitle && newLinkUrl) {
      setLinks([...links, { title: newLinkTitle, url: newLinkUrl }]);
      setNewLinkTitle('');
      setNewLinkUrl('');
    }
  };

  /**
   * Handles "Find Fixers Now" button click.
   * Triggers fixer search and moves to the "Available Fixers" tab.
   */
  const handleFindFixers = () => {
    setFetchFixers(true);
    setShowFixers(true);
    setValue(6); // Move to the new tab after clicking
  };

  // Tab labels for navigation, including new "Available Fixers" tab
  const labels = [
    "Search services",
    "Date",
    "Description",
    "Supporting files",
    "Location",
    "Preview",
    "Available Fixers"
  ];

  // Preview data for the final tab
  const previewData = {
    serviceType,
    selectedDate,
    title,
    description,
    image,
    document,
    links,
    address: newAddress,
    landmark,
    town,
    lga,
    country,
    serviceTypeId,
    addressId,
  };

  /**
   * Utility function to validate text input.
   * Ensures minimum length and at least one letter.
   */
  function isValidText(str: string, minLen: number) {
    const trimmed = str.trim();
    return (
      trimmed.length >= minLen &&
      /[a-zA-Z]/.test(trimmed) && // must contain at least one letter
      !/^[\d\W]+$/.test(trimmed) // not only numbers or special chars
    );
  }

  // Responsive container width for tab content
  const TAB_CONTAINER_WIDTH = { xs: '100%' };

  // Refs for tab labels to enable scroll-into-view on small screens
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (isSmallScreen && tabRefs.current[value]) {
      tabRefs.current[value]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [value, isSmallScreen]);

  /**
   * Validates selected date on Date tab.
   * Shows error if date is less than one hour from now.
   */
  useEffect(() => {
    if (value === 1) {
      const now = new Date();
      const minDate = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour ahead
      if (!selectedDate || selectedDate < minDate) {
        setDateError('Please select a date at least one hour from now.');
      } else {
        setDateError('');
      }
    }
  }, [selectedDate, value]);

  /**
   * Validates title and description on Description tab.
   * Shows error if requirements are not met.
   */
  useEffect(() => {
    if (value === 2 && descTouched) {
      if (!isValidText(title, 5)) {
        setDescError('Title must be at least 5 letters and not only numbers or special characters.');
        return;
      }
      if (!isValidText(description, 20)) {
        setDescError('Description must be at least 20 letters and not only numbers or special characters.');
        return;
      }
      setDescError('');
    } else {
      setDescError('');
    }
  }, [title, description, value, descTouched]);

  // Show snackbar and update tab heading on error or no fixers found
  useEffect(() => {
    if (error) {
      setSnackbarMsg('Error loading fixers');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setFixersTabHeading('Error loading fixers');
    } else if (!isLoading && !error && fixers.length === 0 && fetchFixers) {
      setSnackbarMsg('No fixers found matching your criteria. Try again with different filters.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      setFixersTabHeading('No fixers found matching your criteria. Try again with different filters.');
    } else if (!isLoading && !error && fixers.length > 0) {
      setFixersTabHeading('Available Fixers');
    }
  }, [error, isLoading, fixers, fetchFixers]);

  return (
    <Box className="flex flex-col min-h-screen max-w-full bg-white">
      {/* Tab Labels Navigation */}
      <Box className="sticky top-0 z-10 bg-white w-full overflow-x-auto hide-scrollbar">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs example"
          centered={!isSmallScreen}
          variant={isSmallScreen ? 'scrollable' : 'standard'}
          scrollButtons={isSmallScreen ? 'auto' : undefined}
          sx={{
            minWidth: isSmallScreen ? 'max-content' : undefined,
          }}
        >
          {labels.map((label, index) => (
            <div
              key={index}
              ref={el => (tabRefs.current[index] = el)}
              className="inline-block"
            >
              <Tab
                label={label}
                disabled={index > value}
                sx={
                  isSmallScreen
                    ? { minWidth: 120 }
                    : { minWidth: 0, flex: 1 }
                }
              />
            </div>
          ))}
        </Tabs>
      </Box>

      {/* Progress Bar */}
      <Box className="sticky z-10 bg-white w-full overflow-x-auto scrollbar-hide" sx={{ top: 48 }}>
        <TabProgressBar value={value} labels={labels} />
        <Divider sx={{ display: { xs: 'block', md: 'none' }, my: 1 }} />
      </Box>

      {/* Tab Content Panels */}
      <Box className="flex-1 overflow-y-auto px-2 md:px-4" sx={{ width: '100%', maxWidth: TAB_CONTAINER_WIDTH, mx: 'auto' }}>
        <TabPanel value={value} index={0}>
          <SearchSection
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSelectService={(name, id) => {
              setServiceType(name);
              setServiceTypeId(id);
            }}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DateTab selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          {dateError && (
            <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
              {dateError}
            </Typography>
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {descError && (
            <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
              {descError}
            </Typography>
          )}
          <DescriptionTab
            title={title}
            setTitle={val => { setTitle(val); setDescTouched(true); }}
            description={description}
            setDescription={val => { setDescription(val); setDescTouched(true); }}
            titlePlaceholder="Enter a brief summary (at least 5 letters, not only numbers or symbols)"
            descriptionPlaceholder="Describe your request in detail (at least 20 letters, not only numbers or symbols)"
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <FilesTab
            image={image}
            setImage={setImage}
            document={document}
            setDocument={setDocument}
            links={links}
            newLinkTitle={newLinkTitle}
            setNewLinkTitle={setNewLinkTitle}
            newLinkUrl={newLinkUrl}
            setNewLinkUrl={setNewLinkUrl}
            handleAddLink={handleAddLink}
          />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <LocationTab
            newAddress={newAddress}
            setNewAddress={setNewAddress}
            landmark={landmark}
            setLandmark={setLandmark}
            town={town}
            setTown={setTown}
            lga={lga}
            setLga={setLga}
            country={country}
            setCountry={setCountry}
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
            manualLocation={manualLocation}
            setManualLocation={setManualLocation}
            addressId={addressId}
            setAddressId={setAddressId}
          />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <>
            <PreviewTab
              serviceType={serviceType}
              selectedDate={selectedDate}
              title={title}
              description={description}
              image={image}
              document={document}
              links={links}
              address={newAddress}
              landmark={landmark}
              town={town}
              lga={lga}
              country={country}
            />
            {showFixers && !isLoading && !error && (
              <FixerList fixers={fixers} previewData={previewData} clientId="client-id" />
            )}
            {isLoading && <Typography>Loading...</Typography>}
            {error && <Typography>Error loading fixers</Typography>}
          </>
        </TabPanel>
        <TabPanel value={value} index={6}>
        <AvailableFixersTab
          fixersTabHeading={fixersTabHeading}
          isLoading={isLoading}
          error={error}
          fixers={fixers}
          previewData={previewData}
          clientId="client-id"
          snackbarOpen={snackbarOpen}
          snackbarMsg={snackbarMsg}
          snackbarSeverity={snackbarSeverity}
          setSnackbarOpen={setSnackbarOpen}
        />
      </TabPanel>
      </Box>

      {/* Navigation Buttons fixed at the bottom */}
      <Box className="sticky bottom-0 z-10 bg-white py-2 flex justify-center gap-2 border-t">
        <Button variant="contained" color="primary" onClick={handlePrevious} disabled={value === 0}>
          Previous
        </Button>
        {value < labels.length - 2 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={value === 0 && (!serviceType || serviceType.trim() === '') ||
              (value === 1 && (!!dateError || !selectedDate)) ||
              (value === 2 && (!isValidText(title, 5) || !isValidText(description, 20)))
            }
          >
            Next
          </Button>
        ) : value === labels.length - 2 ? (
          <Button variant="contained" color="primary" onClick={handleFindFixers}>
            Find Fixers Now
          </Button>
        ) : null}
      </Box>
      {/* Hide scrollbars for custom scrollable areas */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar,
          .tab-panel-scroll::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar,
          .tab-panel-scroll {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE 10+ */
          }
        `}
      </style>
    </Box>
  );
};

export default TabsControl;