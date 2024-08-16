import React from 'react'
import 
{BsGiftFill, BsGrid1X2Fill, BsFillArchiveFill, BsFillBellFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
 import { Link, useNavigate } from 'react-router-dom';

function SideBar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/Admin">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/product-manager">
                    <BsFillArchiveFill className='icon'/> Products
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/voucher">
                    <BsGiftFill className='icon'/> Vouchers
                </a>
            </li>
            <li className='sidebar-list-item'>
                <Link to ='/CustomerList'>
                    <BsPeopleFill className='icon'/> Customers
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <a href="/reports">
                    <BsFillBellFill className='icon'/> Reports
                </a>
            </li>
            <li className='sidebar-list-item'>
                <Link to ='/Setting'>
                    <BsFillGearFill className='icon'/> Setting
                </Link>
                    
            </li>
        </ul>
    </aside>
  )
}

export default SideBar