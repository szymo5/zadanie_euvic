import { Stack } from '@mui/material'
import React from 'react'

const Main = () => {
  return (
    <Stack sx={{width: '100%', height: "calc(100vh - 72px)"}} direction="row" alignItems="center" justifyContent="center">
      <Stack sx={{width: '30%',height: '100%', border: '2px solid red'}}>

      </Stack>
      <Stack sx={{width: '70%', height: '100%', border: '2px solid green'}}>

      </Stack>
    </Stack>
  )
}

export default Main