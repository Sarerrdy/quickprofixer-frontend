import React, { useState, useRef, useEffect } from 'react';
import { Tabs, Tab, Box, Button, useMediaQuery, useTheme, Typography, Divider } from '@mui/material';
import SearchSection from './SearchSection';
import TabProgressBar from './TabProgressBar';
import DateTab from './DateTab';
import DescriptionTab from './DescriptionTab';
import FilesTab from './FilesTab';
import LocationTab from './LocationTab';
import PreviewTab from './PreviewTab';
import FixerList from '../fixers/FixerList';
import { useFetch } from '../../api/hooks/useApi';
import { Fixer } from '../fixers/Fixer';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{
        width: '100%',
        height: '420px',
        overflow: 'auto',
        boxSizing: 'border-box',
      }}
      className="tab-panel-scroll"
    >
      {value === index && (
        <Box
          p={3}
          className="py-20 px-4 mx-auto"
          sx={{
            width: '100%',
            minWidth: 0,
            boxSizing: 'border-box',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

const TabsControl: React.FC = () => {
  const [value, setValue] = useState(0);
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const minRating = 4;

  const { data: fixers = [], isLoading, error } = useFetch<Fixer[]>(
    fetchFixers ? ['fixers', serviceType, town, minRating] : ['fixers'],
    fetchFixers ? '/fixer/search' : '',
    fetchFixers ? { skillCategory: serviceType, location: town, minRating } : {},
    { enabled: fetchFixers }
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue <= value) {
      setValue(newValue);
    }
  };

  const handleNext = () => {
    if (value < labels.length - 1) {
      setValue(value + 1);
    }
  };

  const handlePrevious = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const handleAddLink = () => {
    if (newLinkTitle && newLinkUrl) {
      setLinks([...links, { title: newLinkTitle, url: newLinkUrl }]);
      setNewLinkTitle('');
      setNewLinkUrl('');
    }
  };

  const handleFindFixers = () => {
    setFetchFixers(true);
    setShowFixers(true);
  };

  const labels = ["Search services", "Date", "Description", "Supporting files", "Location", "Preview"];

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

  // Responsive container widths
  const TAB_CONTAINER_WIDTH = { xs: '100%', md: '65%' };

  // --- Tab label scroll into view ---
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
  // -----------------------------------

  return (
    <Box sx={{ width: '100%', maxWidth: '95%', mx: 'auto' }}>
      {/* Tab Labels */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '95%',
          mx: 'auto',
          px: { xs: 0, sm: 2 },
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          mb: 0.5,
        }}
        className="hide-scrollbar"
      >
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
              style={{ display: 'inline-block' }}
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
      <Box
        sx={{
          width: '100%',
          maxWidth: '90%',
          mx: 'auto',
          px: { xs: 0, sm: 2 },
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          mb: 2,
        }}
        className="hide-scrollbar"
      >
        <TabProgressBar value={value} labels={labels} />
        <Divider sx={{ display: { xs: 'block', md: 'none' }, my: 1 }} />
      </Box>

      {/* Tab Content */}
      <Box
        sx={{
          width: '100%',
          maxWidth: TAB_CONTAINER_WIDTH,
          mx: 'auto',
          px: { xs: 0, sm: 2, md: 4 },
        }}
      >
        <TabPanel value={value} index={0}>
          <SearchSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSelectService={(name, id) => { setServiceType(name); setServiceTypeId(id); }} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DateTab selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DescriptionTab title={title} setTitle={setTitle} description={description} setDescription={setDescription} />
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
        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, mt: 2, gap: 1 }}>
          <Button variant="contained" color="primary" onClick={handlePrevious} disabled={value === 0}>
            Previous
          </Button>
          {value < labels.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleFindFixers}>
              Find Fixers Now
            </Button>
          )}
        </Box>
      </Box>
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