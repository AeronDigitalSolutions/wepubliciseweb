import { useLocation } from 'react-router-dom';
import Footer from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {children}
      {/* Show the standard multi-column footer only on inner pages, not on home page */}
      {!isHomePage && <Footer />}
    </>
  );
};

export default AppLayout;
