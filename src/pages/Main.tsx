import { Box, Stack } from '@mui/material'
import React, { useState } from 'react'
import Form from '../components/Form'
import Table from '../components/Table'

const Main = ({language}:any) => {
  const [currentId, setCurrentId] = useState('');

  return (
    <Stack  direction="row">
      <Box sx={{width: '30%'}}>
        <Form language={language} setCurrentId={setCurrentId} currentId={currentId}/>
      </Box>
      <Box sx={{width: '70%'}}>
        <Table language={language} setCurrentId={setCurrentId}/>
      </Box>
    </Stack>
  )
}

export default Main