import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  userName: string
  age: number
  email: string
  phoneNumber: string
}

const initialState: UserState = {
  userName: '',
  age: 0,
  email: '',
  phoneNumber: ''
}

export const userSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload
    }
  }
})

export const { setUserName, setAge, setEmail, setPhoneNumber } = userSlice.actions
export default userSlice.reducer

