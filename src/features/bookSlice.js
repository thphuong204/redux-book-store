import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addFavorite, fetchData, fetchFavorite } from "./bookApi";

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
        },

        addFavoriteBookSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            state.readingList.push(action.payload) ;
        }
    
    },
  })

  export default bookSlice.reducer;

  export const fetchBook = (pageNum,limit,query) => async (dispatch) => {
    dispatch(bookSlice.actions.startLoading());
    try {
        const response = await fetchData(pageNum,limit,query);
        dispatch(bookSlice.actions.getBookSuccess(response.data));
    }
    catch (error) {
        dispatch(bookSlice.actions.hasError(error.message));
    }
  }

  export const addReadingList = (addingBook) => async (dispatch) => {
    dispatch(bookSlice.actions.startLoading());
    try {
        const response = await addFavorite(addingBook);
        dispatch(bookSlice.actions.addFavoriteBookSuccess(response.data));
        toast.success("The book has been added to the reading list!");
    }
    catch (error) {
        console.log("error Phuong",error)
        dispatch(bookSlice.actions.hasError(error.message));
        toast.error(error.message);
    }
  }
 