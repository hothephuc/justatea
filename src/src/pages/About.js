import React from 'react'
import Viet from '../components/assets/Viet.jpg'
import Binh from '../components/assets/Binh.jpg'
import Tan from '../components/assets/Tan.jpg'
import Phuoc from '../components/assets/Phuoc.jpg'
import Phuc from '../components/assets/Phuc.jpg'
import './css/About.css'

const About = () => {
  return (
    <div className='about'>
      <h1>Thành viên</h1>
      <div className='member'>
        <div className='member-item'>
          <img src={Viet} alt=""/>
          <p>Trần Quốc Việt</p>
          <p>22127454</p>
        </div>
        <div className='member-item'>
          <img src={Tan} alt=""/>
          <p>Lê Quang Tân</p>
          <p>22127326</p>
        </div>
        <div className='member-item'>
          <img src={Binh} alt=""/>
          <p>Trần Đức Bình</p>
          <p>22127038</p>
        </div>
        <div className='member-item'>
          <img src={Phuoc} alt=""/>
          <p>Trần Đoàn Huy Phước</p>
          <p>22127338</p>
        </div>
        <div className='member-item'>
          <img src={Phuc} alt=""/>
          <p>Hồ Thế Phúc</p>
          <p>21127670</p>
        </div>
      </div>
    </div>
  )
}

export default About
