import { EditDayOfWeek } from './../type';
import { toastError, toastSuccess } from "@/shared/libs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

export const getDayOfWeekList = createAsyncThunk(
  "dayOfWeek/getList",
  async (_, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("token") || ""
      const response = await api.getList(token);
      return response.data.results;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const createDayOfWeek = createAsyncThunk(
  "dayOfWeek/create",
  async (dayOfWeek: EditDayOfWeek, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || ""
      const response = await api.create(token, dayOfWeek);
      toastSuccess("Вы успешно добавили день недели");
      dispatch(getDayOfWeekList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const updateEditDayOfWeek = createAsyncThunk(
  "dayOfWeek/update",
  async ({ id, dayOfWeek }: { dayOfWeek: EditDayOfWeek, id: number }, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || ""
      const response = await api.update(token, dayOfWeek, id);
      toastSuccess("Вы успешно изменили данные по дню недели");
      dispatch(getDayOfWeekList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
)

export const getDayOfWeekById = createAsyncThunk(
  "dayOfWeek/detail",
  async (id: number, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("token") || ""
      const response = await api.detail(token, id);
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);
export const deleteDayOfWeek = createAsyncThunk(
  "dayOfWeek/delete",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || ""
      const response = await api.delete(token, id);
      toastSuccess("Удаление успешно");
      dispatch(getDayOfWeekList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);