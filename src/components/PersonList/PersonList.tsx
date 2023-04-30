import React from 'react'
import { Person } from '../../redux/people'
import './PersonList.scss'

import { Avatar, Box, Stack, Typography, Tooltip } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';

import { selectLanguage } from '../../utils/selectLanguage';
import { generalText } from '../../utils/translateText';

interface IProps {
    people: Person[];
    language: string
}

const StyledTypography = ({text}: {text: string}) => {
    return (
        <Typography sx={{ml: '15px', fontFamily: 'Lato', fontSize: '16px'}}>
            {text}
        </Typography>
    )
}

const PersonList = ({people, language}: IProps) => {
  return (
    <Box className='person-grid'>
        {people.map((person) => (
            <Box>
                <Box className="person-content">
                    <Stack direction="row" alignItems="center">
                        <Avatar sx={{background: '#555', width: '32px', height: '32px'}}>
                            {person.name.charAt(0)}
                        </Avatar>
                        <StyledTypography text={person.name}/>
                    </Stack>
                    <Stack direction="row" alignItems="center" mt="5px">
                        <Tooltip title={selectLanguage(generalText.textAge, language)}>
                            <PersonIcon sx={{fontSize: '32px', color: '#555'}}/>
                        </Tooltip>
                        <StyledTypography text={person.age}/>
                    </Stack>
                    <Stack direction="row" alignItems="center" mt="5px">
                        <Tooltip title={selectLanguage(generalText.textDate, language)}>
                            <CalendarMonthIcon sx={{fontSize: '32px', color: '#555'}}/>
                        </Tooltip>
                        <StyledTypography text={person.date}/>
                    </Stack>
                    <Stack direction="row" alignItems="center" mt="5px">
                        <Tooltip title={selectLanguage(generalText.textBio, language)}>
                            <DescriptionIcon sx={{fontSize: '32px', color: '#555'}}/>
                        </Tooltip>
                        <Typography sx={{ml: '15px', fontFamily: 'Lato', fontSize: '16px'}}>
                            {selectLanguage(generalText.textBio, language)}:
                        </Typography>
                    </Stack>
                    <textarea value={person.description} disabled className='text-field'/>
                </Box>
            </Box>
        ))}
    </Box>
  )
}

export default PersonList