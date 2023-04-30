import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { RootState } from '../redux/store'
import PersonList from '../components/PersonList/PersonList'


const View = ({language}: {language: string}) => {
  const {people} = useSelector((state: RootState) => state.people)

  return (
    <Box width="100%">
      <PersonList people={people} language={language}/>
    </Box>
  )
}

export default View