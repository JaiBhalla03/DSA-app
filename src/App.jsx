import React from 'react'
import {motion} from 'framer-motion'
import Header from './components/Header'
import Main from './components/Main'
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import InfixPrefix from './pages/InfixPrefix'
import InfixPostfix from './pages/InfixPostfix'
import PostfixEvaluation from './pages/PostfixEvaluation'
import PrefixEvaluation from './pages/PrefixEvaluation'
import TowerOfHanoi from './pages/TowerOfHanoi'
import BalancedParenthesis from './pages/BalancedParenthesis'
import SharedLayout from './pages/SharedLayout'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = '/' element = {<SharedLayout/>}>
        <Route path= "/" index element ={<Main/>}/>
        <Route path = "infix-to-postfix" element={<InfixPostfix/>}/>
        <Route path = "infix-to-prefix" element={<InfixPrefix/>}/>
        <Route path = "postfix-evaluation" element={<PostfixEvaluation/>}/>
        <Route path = "prefix-evaluation" element={<PrefixEvaluation/>}/>
        <Route path = "Tower-of-hanoi" element={<TowerOfHanoi/>}/>
        <Route path = "Balanced-parenthesis" element={<BalancedParenthesis/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App