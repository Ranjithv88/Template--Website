import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./UserSlices"

export default configureStore({
    devTools: true,
    reducer: {
        user: userSlice
    }
})

