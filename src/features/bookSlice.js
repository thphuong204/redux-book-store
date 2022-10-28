import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./bookApi";

const initialState ={
    isLoading: false,
    errorMessage: null,
    books:[],
    readingList:[],
    removedBookId:"",
    }

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
          },

          hasError(state, action) {
            state.isLoading = false;
            state.errorMessage = action.payload;
          },

        getBookSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            state.books = action.payload
        }
    
    },
  })

  export default bookSlice.reducer;

  export const fetchBook = (pageNum,limit,query) => async (dispatch) => {
    dispatch(bookSlice.actions.startLoading());
    try {
        const response = await fetchData(pageNum,limit,query);
        console.log("response Phuong",response)
        dispatch(bookSlice.actions.getBookSuccess(response.data));
    }
    catch (error) {
        console.log("error Phuong",error)
        dispatch(bookSlice.actions.hasError(error.message));
    }
  }


 