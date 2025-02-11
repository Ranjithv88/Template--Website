import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// user Data Interface Model
interface UserState {
  userName: string
  age: number
  email: string
  phoneNumber: string
  cart: CartItem[]
}

// cart Data Interface Model
interface CartItem {
  id: number
  image: string
  name: string
  price: number
}

// InitialState for userDetails
const initialState: UserState = {
  userName: '',
  age: 0,
  email: '',
  phoneNumber: '',
  cart: [{ id: 1,
    image: "string",
    name: "ranjith",
    price: 20}]
}

// this is Redux Action for userDetails
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
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload
    }
  }
})

export const { setUserName, setAge, setEmail, setPhoneNumber, setCart } = userSlice.actions
export default userSlice.reducer

