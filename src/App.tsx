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
    <Box sx={{width: '100%', height: '100vh'}} m='auto' p='0'>
      <Navbar language={language} setLanguage={setLanguage}/>
      <Routes>
        <Route path='/main' element={<Main/>} />
        <Route path='*' element={<NotFound language={language}/>} />
      </Routes>
    </Box>
  )
}

export default App;
