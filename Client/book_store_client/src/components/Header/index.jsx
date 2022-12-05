import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { SpinnerLoading } from '../SpinnerLoading/index';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    localStorage.clear();
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (!localStorage.getItem('token')) {
    return (
      <header>
        <nav
          className='navbar navbar-expand-lg navbar-light'
          style={{ backgroundColor: '#D6E4E5' }}
        >
          <Link className='navbar-brand' to='/'>
            Book Store
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarText'
            aria-controls='navbarText'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarText'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item active'>
                <Link className='nav-link' to='/'>
                  Home <span className='sr-only'>(current)</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='login'>
                  Login
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='signup'>
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header>
      <nav
        className='navbar navbar-expand-lg navbar-light'
        style={{ backgroundColor: '#D6E4E5' }}
      >
        <Link className='navbar-brand' to='/'>
          Book Store
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarText'
          aria-controls='navbarText'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarText'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/'>
                Home <span className='sr-only'>(current)</span>
              </Link>
            </li>
            <li className='nav-item'>
              {localStorage.getItem('role') === 'ROLE_ADMIN' ? (
                <Link className='nav-link' to='manageBook'>
                  Manage Book
                </Link>
              ) : (
                <Link className='nav-link' to='historyOrder'>
                  History Order
                </Link>
              )}
            </li>
            {localStorage.getItem('role') === 'ROLE_ADMIN' && (
              <li className='nav-item'>
                <Link className='nav-link' to='manageOrder'>
                  Manage Order
                </Link>
              </li>
            )}
            <li className='nav-item'>
              <Link className='nav-link' to='/' onClick={handleLogout}>
                Log out
              </Link>
            </li>
          </ul>

          {localStorage.getItem('role') === 'ROLE_ADMIN' ? (
            <p className='pt-1' style={{ color: '#810CA8' }}>
              Hello, Administrator
            </p>
          ) : (
            <Link
              className='btn btn-md ml-3'
              style={{ backgroundColor: '#CFFDE1', color: '#434242' }}
              to='/cart'
            >
              <AiOutlineShoppingCart />{' '}
              <span className='font-weight-bold'>Cart</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
