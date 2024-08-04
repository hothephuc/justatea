import { useState } from 'react'
import SideBar from '../components/adPanel/SideBar'
import AdPanel from '../components/adPanel/adPanel'
import "./css/Admin.css"

const Admin = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  
    return (
      <div className='grid-container'>
        <SideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <AdPanel/>
      </div>
    )
}

export default Admin


