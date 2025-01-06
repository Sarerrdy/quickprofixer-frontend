import React, { useState } from 'react';
import { Tabs, Tab, Box, Button, useMediaQuery, useTheme, Typography } from '@mui/material';
import SearchSection from './SearchSection';
import TabProgressBar from './TabProgressBar';
import DateTab from './DateTab';
import DescriptionTab from './DescriptionTab';
import FilesTab from './FilesTab';
import LocationTab from './LocationTab';
import PreviewTab from './PreviewTab';

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
    >
      {value === index && (
        <Box p={3} className="py-20 px-4 mx-auto">
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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

  const labels = ["Search services", "Date", "Description", "Supporting files", "Location", "Preview"];

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 4 } }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="tabs example"
        centered={!isSmallScreen}
        variant={isSmallScreen ? 'scrollable' : 'standard'}
        scrollButtons={isSmallScreen ? 'auto' : undefined}
      >
        {labels.map((label, index) => (
          <Tab key={index} label={label} disabled={index > value} />
        ))}
      </Tabs>
      <TabProgressBar value={value} labels={labels} />
      <TabPanel value={value} index={0}>
        <SearchSection />
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
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <PreviewTab
          serviceType="Service Type" // Replace with actual service type
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
          <Button variant="contained" color="primary">
            Find Fixers Now
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TabsControl;