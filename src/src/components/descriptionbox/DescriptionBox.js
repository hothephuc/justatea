import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className='descriptionbox-navigator'>
            <div className='descpiptionbox-nav-box'>Mô tả</div>
            <div className='descpiptionbox-nav-box fade show'>Nguyên liệu</div>
        </div>
        <div className='description'>
            <p>blablabla</p>
        </div>
    </div>
  )
}

export default DescriptionBox