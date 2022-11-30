import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Header = ({ user, setUser }) => {
  if (!user) {
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
              {user.roles[0] === 'ROLE_ADMIN' ? (
                <Link className='nav-link' to='admin'>
                  Admin
                </Link>
              ) : (
                <Link className='nav-link' to='shelf'>
                  Shelf
                </Link>
              )}
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/' onClick={() => setUser(null)}>
                Log out
              </Link>
            </li>
          </ul>

          <Link
            className='btn btn-md ml-3'
            style={{ backgroundColor: '#CFFDE1', color: '#434242' }}
            to='/cart'
          >
            <AiOutlineShoppingCart className='pt-1' /> Cart
            <span className='ml-2 badge badge-light'>0</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
