import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from 'react-redux'

import  {Person, addPerson, editPerson} from '../../redux/people'
import {selectLanguage} from '../../utils/selectLanguage';
import {formText, generalText} from '../../utils/translateText';

import './Form.scss';

import { Box } from '@mui/material'
import { RootState } from '../../redux/store';

interface FormProps {
  language: string,
  setCurrentId: (id: string) => void;
  currentId: string;
}

const Form = ({language, setCurrentId, currentId}: FormProps) => {
  const {people} = useSelector((state: RootState) => state.people)
  const person = people?.find(p => p.id === currentId);

  const [data, setData] = useState({
    id: '', name: '', age: '', date: '', description: '',
  });

  useEffect(() => {
    if(person) {
      setData(person);
      reset({
        name: person.name,
        age: person.age,
        date: person.date,
        description: person.description
      });
    };
    
  }, [person]);

  const schema = yup.object().shape({
    name: yup.string().required(),
    age: yup.number().positive().integer().required(),
    date: yup.string().required(),
    description: yup.string().max(250),
  });

  const { register, handleSubmit, formState: { errors }, reset}: any = useForm({
    resolver: yupResolver(schema),
  });

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toISOString().slice(0,10);
    setData({...data, date: formattedDate});
  }

  const dispatch = useDispatch()

  const onSubmit = (data: Person) => {
    if(currentId){
      dispatch(editPerson({currentId, data}));
      setCurrentId('');
      reset({});
    } else {
      dispatch(addPerson(data));
      reset({});
    }
    setData({id: '', name: '', age: '', date: '', description: ''});
    
  };

  return (
    <Box className="form-container">
      <h3 style={{marginBottom: '20px'}}>{currentId ? selectLanguage(formText.headerTextEdit, language) : selectLanguage(formText.headerTextAdd, language)}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {(errors.name?.message) && <label className="error-label">{selectLanguage(formText.inputTextError, language)}</label>}
        <input type="text" placeholder={selectLanguage(generalText.textName, language)} className='form-input' {...register("name")} value={data.name}  onChange={(e) => setData({...data, name: e.target.value})}/>
        {(errors.age?.message) && <label className="error-label">{selectLanguage(formText.inputTextError, language)}</label>}
        <input type="number" placeholder={selectLanguage(generalText.textAge, language)} className='form-input' {...register("age")} value={data.age} onChange={(e) => setData({...data, age: e.target.value})}/>
        {(errors.date?.message) && <label className="error-label">{selectLanguage(formText.inputTextError, language)}</label>}
        <input type="date" placeholder="Date" className='form-input' {...register("date")} value={data.date} onChange={handleDate}/>
        <textarea placeholder={selectLanguage(generalText.textBio, language)} className='form-input textField' {...register("description")} value={data.description} onChange={(e) => setData({...data, description: e.target.value})}/>
        {(errors.description?.message) && <label className="error-label">{selectLanguage(formText.textfieldError, language)}</label>}
        <input type="submit" className='form-btn' value={currentId ? selectLanguage(generalText.textEdit, language) : selectLanguage(generalText.textAdd, language)}/>
      </form>
    </Box>
  )
}

export default Form