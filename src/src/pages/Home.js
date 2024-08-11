import React from 'react'
import Hero from '../components/hero/Hero'
import Admin from './Admin'
import BestProduct from '../components/bestproduct/BestProduct'

const Home = () => {
  return (
    <div>
      {/* <Admin></Admin> */}
      <Hero></Hero>
      <BestProduct/>
    </div>
  )
}

export default Home
