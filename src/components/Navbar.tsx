import React from 'react'
import { Link } from 'react-router-dom'
import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language';
import {selectLanguage} from '../utils/selectLanguage';
import {navbarText} from '../utils/translateText';

import './Navbar.css';

const Navbar = ({language, setLanguage}: any) => {
  const handleChange = (event: any) => {
    setLanguage(event.target.value);
  };

  return (
    <Stack sx={{width: '100%'}} alignItems="center">
      <Stack sx={{width: '60%', height: '70px', borderBottom: '2px solid #000'}} alignItems="center">
        <Stack sx={{width: '80%', height: '70px'}} direction="row" alignItems="center" justifyContent="space-between">
          <Stack sx={{width: '200px'}} direction="row" alignItems="center" justifyContent="space-between">
            <Link to="/main" className='link'>
              {selectLanguage(navbarText.menuMain, language)}
            </Link>
            <Link to="/view" className='link'>
              {selectLanguage(navbarText.menuView, language)}
            </Link>
          </Stack>
          <Box width="100px" height="30px" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel sx={{color: '#000!important'}}>{selectLanguage(navbarText.select, language)}</InputLabel>
                <Select
                  value={language}
                  label={selectLanguage(navbarText.select, language)}
                  onChange={handleChange}
                  sx={{'& after': {borderBottom: '2px solid #000!important'}}}
                >
                  <MenuItem value="pl">{selectLanguage(navbarText.selectItemPl, language)}</MenuItem>
                  <MenuItem value="en">{selectLanguage(navbarText.selectItemEn, language)}</MenuItem>
                </Select>
              </FormControl>
              <LanguageIcon sx={{marginLeft: '20px', color: '#000'}}/>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Navbar