import { configureStore } from "@reduxjs/toolkit";
import { reducer as userReducer} from "./slices/userSlice";
import { reducer as productReducer } from "./slices/productSlice";
import { reducer as orderReducer } from "./slices/orderSlice";

const store = configureStore({
    reducer: {
        userReducer,
        productReducer,
        orderReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store