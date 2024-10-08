import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { toastError, toastSuccess } from "@/shared/libs";
import { Book } from "../type";

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (filter: { predmet?: number }, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await api.getBooks(token ?? "", filter);
      return data.results;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e);
    }
  }
);

export const createBook = createAsyncThunk(
  "books/create",
  async (book: Book, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await api.create(token ?? "", book);
      toastSuccess("Вы успешно создали новую книгу");
      dispatch(getBooks({}));
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const updateBook = createAsyncThunk(
  "books/update",
  async (book: Book, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await api.update(token ?? "", book);
      toastSuccess("Вы успешно изменили данные книги");
      dispatch(getBooks({}));
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/delete",
  async (bookId: number, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token");
      await api.delete(token ?? "", bookId);
      toastSuccess("Вы успешно удалили книгу");
      dispatch(getBooks({}));
      return;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);
