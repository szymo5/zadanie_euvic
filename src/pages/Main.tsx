import { Box, Stack } from '@mui/material'
import React, { useState } from 'react'
import Form from '../components/Form/Form'
import Table from '../components/Table/Table'

const Main = ({language}:any) => {
  const [currentId, setCurrentId] = useState('');

  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="center">
      <Box sx={{width: '500px'}}>
        <Form language={language} setCurrentId={setCurrentId} currentId={currentId}/>
      </Box>
      <Box sx={{width: '1000px'}}>
        <Table language={language} setCurrentId={setCurrentId}/>
      </Box>
    </Stack>
  )
}

export default Main