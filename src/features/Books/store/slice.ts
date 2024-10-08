import { StatusResponse } from "@/shared/enums";
import { Book } from "../type";
import { getBooks, createBook, updateBook, deleteBook } from "./actions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  getBooks: {
    status: StatusResponse;
    message?: string;
  };
  createBook: {
    status: StatusResponse;
    message?: string;
  };
  editBook: {
    status: StatusResponse;
    message?: string;
  };
  deleteBook: {
    status: StatusResponse;
    message?: string;
  };
  books: Book[];
}

const initialState: InitialState = {
  getBooks: {
    status: StatusResponse.INITIAL,
    message: "",
  },
  createBook: {
    status: StatusResponse.INITIAL,
    message: "",
  },
  editBook: {
    status: StatusResponse.INITIAL,
    message: "",
  },
  deleteBook: {
    status: StatusResponse.INITIAL,
    message: "",
  },
  books: [],
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBooks.fulfilled, (state, action) => {
        state.getBooks.status = StatusResponse.SUCCESS;
        state.books = action.payload;
      })
      .addCase(getBooks.pending, (state) => {
        state.getBooks.status = StatusResponse.LOADING;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.getBooks.status = StatusResponse.ERROR;
        state.getBooks.message = action.payload as string;
      }),
      builder
        .addCase(createBook.fulfilled, (state) => {
          state.createBook.status = StatusResponse.SUCCESS;
        })
        .addCase(createBook.pending, (state) => {
          state.createBook.status = StatusResponse.LOADING;
        })
        .addCase(createBook.rejected, (state, action) => {
          state.createBook.status = StatusResponse.ERROR;
          state.createBook.message = action.payload as string;
        }),
      builder
        .addCase(updateBook.fulfilled, (state) => {
          state.editBook.status = StatusResponse.SUCCESS;
        })
        .addCase(updateBook.pending, (state) => {
          state.editBook.status = StatusResponse.LOADING;
        })
        .addCase(updateBook.rejected, (state, action) => {
          state.editBook.status = StatusResponse.ERROR;
          state.editBook.message = action.payload as string;
        }),
      builder
        .addCase(deleteBook.fulfilled, (state) => {
          state.deleteBook.status = StatusResponse.SUCCESS;
        })
        .addCase(deleteBook.pending, (state) => {
          state.deleteBook.status = StatusResponse.LOADING;
        })
        .addCase(deleteBook.rejected, (state, action) => {
          state.deleteBook.status = StatusResponse.ERROR;
          state.deleteBook.message = action.payload as string;
        });
  },
});
export default booksSlice.reducer;
