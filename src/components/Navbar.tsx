import React from 'react'
import { Link } from 'react-router-dom'
import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language';

import './Navbar.css';

const Navbar = ({language, setLanguage}: any) => {
  const handleChange = (event: any) => {
    setLanguage(event.target.value);
  };

  return (
    <Stack sx={{width: '100%'}} alignItems="center">
      <Stack sx={{width: '60%', height: '70px', borderBottom: '2px solid #ccc'}} alignItems="center">
        <Stack sx={{width: '80%', height: '70px'}} direction="row" alignItems="center" justifyContent="space-between">
          <Stack sx={{width: '200px'}} direction="row" alignItems="center" justifyContent="space-between">
            <Link to="/main" className='link'>
              {language === 'pl' ? "Główna" : "Main"}
            </Link>
            <Link to="/view" className='link'>
              {language === "pl" ? "Widok" : "View"}
            </Link>
          </Stack>
          <Box width="100px" height="30px" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>{language === 'pl' ? "Język" : "Language"}</InputLabel>
                <Select
                  value={language}
                  label={language === 'pl' ? "Język" : "Language"}
                  onChange={handleChange}
                >
                  <MenuItem value="pl">Polski</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                </Select>
              </FormControl>
              <LanguageIcon sx={{marginLeft: '20px', color: '#555'}}/>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Navbar