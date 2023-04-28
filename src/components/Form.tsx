import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from 'react-redux'
import  {addPerson} from '../redux/people'
import {selectLanguage} from '../utils/selectLanguage';
import {formText} from '../utils/translateText';

import './Form.css';

import { Box } from '@mui/material'
import { RootState } from '../redux/store';

const Form = ({language}:any) => {
  const {people} = useSelector((state: RootState) => state.people)
  console.log(people);

  const [data, setData] = useState({
    name: '', age: '', date: '', description: '',
  });

  const schema = yup.object().shape({
    name: yup.string().required(),
    age: yup.number().positive().integer().required(),
    date: yup.string().required(),
    description: yup.string()
  });

  const { register, handleSubmit, formState: { errors }, }: any = useForm({
    resolver: yupResolver(schema),
  });

  const handleDate = (e: any) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toLocaleDateString();
    setData({...data, date: formattedDate});
  }

  const dispatch = useDispatch()

  const onSubmit = (data: any) => {
    dispatch(addPerson(data));
  };

  return (
    <Box sx={{width: '320px', padding: '20px 10px', border: '1px solid #ccc', textAlign: 'center'}}>
      <h3 style={{marginBottom: '20px'}}>{selectLanguage(formText.headerText, language)}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {(errors.name?.message) && <label className="create-label">{selectLanguage(formText.inputTextError, language)}</label>}
        <input type="text" placeholder={selectLanguage(formText.inputPlaceholderName, language)} className='form-input' {...register("name")} value={data.name}  onChange={(e) => setData({...data, name: e.target.value})}/>
        {(errors.age?.message) && <label className="create-label">{selectLanguage(formText.inputTextError, language)}</label>}
        <input type="number" placeholder={selectLanguage(formText.inputPlaceholderAge, language)} className='form-input' {...register("age")} value={data.age} onChange={(e) => setData({...data, age: e.target.value})}/>
        {(errors.date?.message) && <label className="create-label">{selectLanguage(formText.inputTextError, language)}</label>}
        <input type="date" placeholder="Date" className='form-input' {...register("date")}  onChange={handleDate}/>
        <textarea placeholder={selectLanguage(formText.inputPlaceholderDescription, language)} className='form-input textField' {...register("description")} value={data.description} onChange={(e) => setData({...data, description: e.target.value})}/>
        <input type="submit" className='form-btn' value={selectLanguage(formText.formButton, language)}/>
      </form>
    </Box>
  )
}

export default Form

//https://github.com/machadop1407/React-Beginner-Course-2022/tree/episode11