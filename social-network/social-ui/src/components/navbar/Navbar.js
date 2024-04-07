import React, { useContext } from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/authContext';


const Navbar = () => {

  const {toggle, darkMode}=useContext(ThemeContext);
  const {currentUser}=useContext(AuthContext);

  return (
    <div className='navbar dark light'>
      <div className="left-n">
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span>ChatApp</span>
        </Link>
        <div className="icon-n">
          <HomeOutlinedIcon />

        </div>
          {darkMode? <WbSunnyOutlinedIcon onClick={toggle}/> :
           <DarkModeOutlinedIcon onClick={toggle} /> }
        <GridViewOutlinedIcon />
        <div className="search-n">
          <SearchOutlinedIcon />
          <input type="text" placeholder='Search...'/>
        </div>
      </div>
      <div className="right-n">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user-n">
          <img src={currentUser.profilePic} alt="demo" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
