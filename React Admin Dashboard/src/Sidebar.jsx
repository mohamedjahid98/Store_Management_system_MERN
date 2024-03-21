import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
    
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/>Product Management
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/home">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/orders">
                    <BsMenuButtonWideFill className='icon'/> Order
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/category">
                    <BsFillGrid3X3GapFill className='icon'/>Category
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/products">
                    <BsFillArchiveFill className='icon'/> Product
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/stock-view">
                    <BsListCheck className='icon'/>Revenue
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/users">
                    <BsPeopleFill className='icon'/> User's
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar