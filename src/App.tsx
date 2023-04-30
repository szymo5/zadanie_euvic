import React, {useState} from 'react';

import {Routes, Route, Navigate} from 'react-router-dom'
import {Box} from '@mui/material'

import './App.css';

import Main from './pages/Main';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';


const App = () => {
  const [language, setLanguage] = useState('en');

  return (
    <Box sx={{width: '100%'}} m='auto' p='0'>
      <Navbar language={language} setLanguage={setLanguage}/>
      <Routes>
        <Route path='/main' element={<Main language={language}/>} />
        <Route path='/404' element={<NotFound language={language}/>}/>
        <Route path='/' element={ <Navigate replace to="/main"/>} />
        <Route path='*' element={ <Navigate replace to="/404"/>} />
      </Routes>
    </Box>
  )
}

export default App;
