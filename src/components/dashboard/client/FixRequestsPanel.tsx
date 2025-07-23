import React from "react";
import FixRequestList from "./FixRequestList";
import FixRequestDetails from "./FixRequestDetails";

/**
 * Handles switching between fix request list and details view.
 * @param requests Array of fix requests
 * @param title Section title
 */
const FixRequestsPanel: React.FC<{ requests: any[]; title: string }> = ({ requests, title }) => {
  const [selected, setSelected] = React.useState<any>(null);
  return selected ? (
    <FixRequestDetails request={selected} onBack={() => setSelected(null)} />
  ) : (
    <FixRequestList requests={requests} onViewDetails={setSelected} title={title} />
  );
};

export default FixRequestsPanel;