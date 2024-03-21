import React from 'react'
import { BsSearch, BsJustify } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function Header({ OpenSidebar }) {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const ID = localStorage.getItem('ID');

    const handleLogout = () => {
        localStorage.removeItem('email');
        navigate('/');

    };
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            {/* <BsSearch  className='icon'/> */}
        </div>
        <div className='header-right'>
        <a className="dropdown-item" href="#" onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
            </div>
    </header>
  )
}

export default Header