import { Box, Stack } from '@mui/material'
import React from 'react'
import Form from '../components/Form'

const Main = ({language}:any) => {
  return (
    <Stack sx={{width: '100%', height: "calc(100vh - 72px)"}} direction="row" alignItems="center" justifyContent="center">
      <Stack sx={{width: '30%',height: '100%', border: '2px solid red'}} direction="column" alignItems="center" justifyContent="center">
        <Form language={language}/>
      </Stack>
      <Stack sx={{width: '70%', height: '100%', border: '2px solid green'}}>

      </Stack>
    </Stack>
  )
}

export default Main