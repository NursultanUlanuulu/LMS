import { EditTime } from './../type';
import { toastError, toastSuccess } from "@/shared/libs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

export const getTimeList = createAsyncThunk(
  "time/getList",
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

export const createTime = createAsyncThunk(
  "time/create",
  async (time: EditTime, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || ""
      const response = await api.create(token, time);
      toastSuccess("Вы успешно добавили время");
      dispatch(getTimeList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const updateTime = createAsyncThunk(
  "time/update",
  async ({ id, time }: { time: EditTime, id: number }, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || ""
      const response = await api.update(token, time, id);
      toastSuccess("Вы успешно изменили данные по времени");
      dispatch(getTimeList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
)

export const getTimeById = createAsyncThunk(
  "time/detail",
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
export const deleteTime = createAsyncThunk(
  "time/delete",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || ""
      const response = await api.delete(token, id);
      toastSuccess("Удаление успешно");
      dispatch(getTimeList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);