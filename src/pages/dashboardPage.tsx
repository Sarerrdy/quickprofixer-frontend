import { Dashboard } from "@mui/icons-material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import DashboardOverview from "../components/dashboard/DashboardOverview";

interface DashboardOverviewProps {
  userType: 'fixer' | 'client';
}

const dashBoardPage: React.FC<DashboardOverviewProps> = ({ userType }) =>{
	return(
		<div>
		<Header/>
		<DashboardOverview userType={userType} />
		<Footer/>		
		</div>
	)
}

export default dashBoardPage;