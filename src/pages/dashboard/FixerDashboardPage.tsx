import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import FixerDashboard from '../../components/dashboard/fixer/FixerDashboard';
import { Fixer } from '../../components/fixers/Fixer';


const FixerDashboardPage: React.FC = () => (
  <div>
    <Header />
    <FixerDashboard userType="fixer" />
    <Footer />
  </div>
);

export default FixerDashboardPage;