import { RootState } from "@/app/store";

export const selectBooks = (state: RootState) => state.books.books;

export const selectGetBooksStatus = (state: RootState) =>
  state.books.getBooks.status;

export const selectCreateBookStatus = (state: RootState) =>
  state.books.createBook.status;

export const selectEditBookStatus = (state: RootState) =>
  state.books.editBook.status;
