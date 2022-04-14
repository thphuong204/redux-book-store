import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../apiService';

const initialState = {
    books: [],
    status: "idle",
    errorMessage: ""
}

// const fetchUserById = createAsyncThunk(
//     'users/fetchByIdStatus',
//     async (userId: number, thunkAPI) => {
//         const response = await userAPI.fetchById(userId)
//         return response.data
//     }
// )

export const getBooks = createAsyncThunk(
    "books/getBooks",
    async ({ pageNum, limit }, thunkApi) => {
        let url = `/books?_page=${pageNum}&_limit=${limit}`;
        const res = await api.get(url);
        return res.data //[{tile:..}]
    }
)

// const getFavorite = createAsyncThunk({})
//dispatch(getBooks({pageNum:1, limit:10}))


const bookSlice = createSlice({
    name: "books",
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(getBooks.pending, (state, action) => {
            state.status = "loading"
        })
            .addCase(getBooks.fulfilled, (state, action) => {
                //action = {type:"books/getBooks/fulfilled", payload: [{tile:..}]}
                state.status = "idle"
                state.books = action.payload
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.status = "fail"
                state.errorMessage = action.error.message
            })
    }
})

export default bookSlice.reducer

//dipatch function in component
//aciton, reducer: update state in store
//re-render components that have changing state