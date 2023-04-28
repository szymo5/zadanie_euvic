import React from 'react'
import { Box, Stack } from '@mui/material'
import {selectLanguage} from '../utils/selectLanguage';
import {notFoundPage} from '../utils/translateText';

const NotFound = ({language}: {language: string}) => {
  return (
    <Stack sx={{width: '100%', height: "calc(100vh - 72px)", overflow: 'hidden'}} direction="row" justifyContent="center" alignItems="center">
        <Box>
            <h1>{selectLanguage(notFoundPage.firstHeader, language)}</h1><br></br>
            <h3 style={{textAlign: 'center'}}>{selectLanguage(notFoundPage.secondHeader, language)}</h3>
        </Box>
    </Stack>
  )
}

export default NotFound