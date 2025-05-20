import React from 'react'
import { useState } from 'react'
import './App.css'
// import SignupForm from './components/SignupForm'
// import LoginForm from './components/LoginForm'
// import Navbar from './components/Navbar'
import Layout from './components/Layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout/>
    </>
  )
}

export default App
