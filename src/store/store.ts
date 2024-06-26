import { configureStore } from "@reduxjs/toolkit";
import { reducer as userReducer} from "./slices/userSlice";
import { reducer as productReducer } from "./slices/productSlice";

const store = configureStore({
    reducer: {
        userReducer,
        productReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store