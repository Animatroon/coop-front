import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
    const {data} = await axios.get('news/all/');
    return data;
});

const initialState = {
    items: [],
    error: null,
};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.error = null;
                state.items = [];
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const newsReducer = newsSlice.reducer;
