import React from 'react';
import './Header.css';
import sjsuLogo from './sjsu.png';
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  // Handle user authentication (sign in/sign out)
  const handleAuthentication = () => {
    if (user) {
      auth.signOut(); // Sign out the user
    }
  };

  return (
    <div className='header'>
      {/* Logo */}
      <Link to="/">
        <img className="header__logo" src={sjsuLogo} alt="SJSU Logo" />
      </Link>

      {/* Search Bar */}
      <div className='header__search'>
        <input className='header_searchInput' type="text" placeholder="Search..." />
        <SearchIcon className="header_searchIcon" />
      </div>

      {/* Navigation */}
      <div className="header_nav">
        {/* User Authentication */}
        <Link to={!user && '/login'}>
          <div onClick={handleAuthentication} className='header_option'>
            <span className='header_optionLineOne'>Hello {user ? user.email : 'Guest'}</span>
            <span className='header_optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>

        {/* Orders and Returns */}
        <Link to='/orders'>
          <div className='header_option'>
            <span className='header_optionLineOne'>Returns</span>
            <span className='header_optionLineTwo'>& Orders</span>
          </div>
        </Link>

       {/* GO Spartans */}
<div className='header_option'>
  <a href="https://www.sjsu.edu/" target="_blank" rel="noopener noreferrer">
    <span className='header_optionLineOne'>GO</span>
    <span className='header_optionLineTwo'>Spartans</span>
  </a>
</div>


        {/* Basket */}
        <Link to="/checkout">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_optionLineTwo header_basketCount">{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
