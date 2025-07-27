import React from "react";
import FixRequestList from "./FixRequestList";
import FixRequestDetails from "./FixRequestDetails";

const RequestListTab: React.FC<{
  requests: any[];
  title: string;
}> = ({ requests, title }) => {
  const [selected, setSelected] = React.useState<any>(null);

  return selected ? (
    <FixRequestDetails request={selected} onBack={() => setSelected(null)} />
  ) : (
    <FixRequestList requests={requests} onViewDetails={setSelected} title={title} />
  );
};

export default RequestListTab;