import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./slices/userSlice";

const store = configureStore({
    reducer: {
        userReducer: reducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store