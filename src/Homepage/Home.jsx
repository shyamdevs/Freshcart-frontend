import React from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import Freature from './Freature'
import Popproduct from './Popproduct'
import Footer from './Footer'
import Slider from './Slider'
import DailyBest from './Sells'
import Feature from './Feature'



export default function Home() {
  return (
    <>
    <Navbar/>
    <Slider/>
  <Feature/>
    <Banner/>
    <Popproduct/>
    <DailyBest/>
    <Freature/>
    <Footer/>


    </>
  )
}
