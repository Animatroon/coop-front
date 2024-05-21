import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from './slices/userSlice';
import { newsReducer } from "./slices/newsSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        news: newsReducer,
    }
});


