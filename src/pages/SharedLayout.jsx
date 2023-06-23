import React from 'react'
import {Outlet, Link} from 'react-router-dom'
import Header from '../components/Header'

const SharedLayout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
      <strong className={'text-info d-flex justify-content-center'}>Developed By Jai Bhalla</strong>
    </>
  )
}

export default SharedLayout