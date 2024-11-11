import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => {
    setLoginCheck(auth.loggedIn());
  };

  useEffect(() => {
    checkLogin();
  }, []); // Run only once when the component mounts

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/'>Krazy Kanban Board</Link>
      </div>
      <ul>
        {
          !loginCheck ? (
            <li className='nav-item'>
              <button type='button'>
                <Link to='/login'>Login</Link>
              </button>
            </li>
          ) : (
            <li className='nav-item'>
              <button
                type='button'
                onClick={() => {
                  auth.logout();
                  setLoginCheck(false); // Update state after logout
                  navigate('/login'); // Redirect to login page
                }}
              >
                Logout
              </button>
            </li>
          )
        }
      </ul>
    </div>
  );
};

export default Navbar;
