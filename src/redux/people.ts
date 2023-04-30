import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid';

interface Person {
  id: string
  name: string
  age: string
  date: string
  description: string
}

interface State {
    people: Person[];
}
  
const initialState: State = {
    people: [],
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<Person>) => {
      action.payload.id = uuid();
      state.people.push(action.payload);
    },
    singleDelete: (state, action: PayloadAction<string>) => {
      state.people = state.people.filter(p => p.id !== action.payload)
    },
    groupDelete: (state, action: PayloadAction<string[]>) => {
      state.people = state.people.filter(p => !action.payload.includes(p.id))
    },
    editPerson: (state, action: PayloadAction<{currentId: string, data: Person}>) => {
      const { currentId, data } = action.payload;
      data.id = currentId;
      state.people = state.people.map((p) => p.id === currentId ? data : p)
    }
  },
})

export const {addPerson, singleDelete, groupDelete, editPerson} = peopleSlice.actions

export default peopleSlice.reducer