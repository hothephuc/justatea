import { useState } from 'react'
import SideBar from '../components/adPanel/SideBar'
import DashBoard from '../components/adPanel/DashBoard'
import "./css/Admin.css"

const Admin = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  
    return (
      <div className='grid-container'>
        <SideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <DashBoard/>
      </div>
    )
}

export default Admin


