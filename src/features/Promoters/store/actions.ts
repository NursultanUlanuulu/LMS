import { EditPromoter } from './../type';
import { toastError, toastSuccess } from "@/shared/libs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

export const getPromotersList = createAsyncThunk(
  "promoters/getList",
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

export const createPromoter = createAsyncThunk(
  "promoters/create",
  async (promoter: EditPromoter, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || ""
      const response = await api.create(token, promoter);
      toastSuccess("Вы успешно добавили рекламный источник");
      dispatch(getPromotersList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const updatePromoter = createAsyncThunk(
  "promoters/update",
  async ({ id, promoter }: { promoter: EditPromoter, id: number }, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || ""
      const response = await api.update(token, promoter, id);
      toastSuccess("Вы успешно изменили данные по источнику");
      dispatch(getPromotersList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
)

export const getPromoterById = createAsyncThunk(
  "promoters/detail",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || ""
      const response = await api.detail(token, id);
      toastSuccess("Вы успешно изменили данные по источнику");
      dispatch(getPromotersList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);
export const deletePromoter = createAsyncThunk(
  "promoters/delete",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || ""
      const response = await api.delete(token, id);
      toastSuccess("Удаление успешно");
      dispatch(getPromotersList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);