import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// const initialState = {
//     email: null,
//     token: null,
//     id: null,
// };

// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         setUser(state, action) {
//             state.email = action.payload.email;
//             state.token = action.payload.token;
//             state.id = action.payload.id;
//         },
//         removeUser(state) {
//             state.email = null;
//             state.token = null;
//             state.id = null;
//         },
//     }
// });

// export const { setUser, removeUser } = userSlice.actions;

// export default userSlice.reducer;


const initialState = {
    data: null,
    status: 'loading',
};

export const fetchAuth = createAsyncThunk('authorization/fetchAuth', async (params) => {
    const {data} = await axios.post('/authorization/login/', params);
    return data;
});

// export const fetchAuthGet = createAsyncThunk('authorization/fetchAuthGet', async (params) => {
//     const {data} = await axios.get('/authorization/get/', params);
//     return data;
// });

export const fetchAuthGet = createAsyncThunk('authorization/fetchAuthGet', async (param) => {
    const datas = await axios.get('/authorization/get/', {
        params: {
            id: param 
        }
    });
    return datas.data;
});

// export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
//     const { data } = await axios.post('/authorization/register/', params);
//     return data;
// });



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },
        setUserData: (state, action) => {
            state.data = action.payload;
            state.status = 'loaded'; 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            })
            .addCase(fetchAuthGet.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuthGet.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchAuthGet.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            });
    },
});

export const selectIsAuth = (state) => Boolean(state.auth.data && state.auth);

export const authReducer = authSlice.reducer;

export const {logout, setUserData} = authSlice.actions;


