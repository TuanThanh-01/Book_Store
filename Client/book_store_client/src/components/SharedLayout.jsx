import { Outlet } from 'react-router-dom';
import Header from './Header/index';
import Footer from './Footer/index';

const SharedLayOut = ({ user, setUser }) => {
  return (
    <>
      <Header user={user} setUser={setUser} />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayOut;
