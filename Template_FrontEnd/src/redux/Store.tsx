import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./UserSlices"

// this is the Redux Store 
export const store = configureStore({
    devTools: true,
    reducer: {
        user: userSlice
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

