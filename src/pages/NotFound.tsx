import { Box, Stack } from '@mui/material'
import React from 'react'

const NotFound = ({language}: {language: string}) => {
  return (
    <Stack sx={{width: '100%', height: "calc(100vh - 72px)", overflow: 'hidden'}} direction="row" justifyContent="center" alignItems="center">
        <Box>
            <h1>{language === 'pl' ? 'Oops! Coś poszło nie tak!' : 'Oops! Something went wrong!'}</h1><br></br>
            <h3 style={{textAlign: 'center'}}>{language === 'pl' ? 'Nie znaleziono strony :(' : 'Page not found :('}</h3>
        </Box>
    </Stack>
  )
}

export default NotFound