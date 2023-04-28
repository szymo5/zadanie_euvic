import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Person {
  name: string
  age: number
  date: string
  description?: string
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
        state.people.push(action.payload);
    },
  },
})

export const {addPerson} = peopleSlice.actions

export default peopleSlice.reducer