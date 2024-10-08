import { toastError, toastSuccess } from "@/shared/libs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
import { EditManager, Manager } from "../type";

export const getManagersList = createAsyncThunk(
  "manager/getList",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await api.getList(token ?? "");
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const createManager = createAsyncThunk(
  "manager/create",
  async (manager: Manager, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await api.create(token ?? "", manager);
      toastSuccess("Вы успешно создали нового менеджера");
      dispatch(getManagersList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const updateManager = createAsyncThunk(
  "manager/update",
  async (manager: EditManager, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await api.update(token ?? "", manager);
      toastSuccess("Вы успешно изменили данные менеджера");
      dispatch(getManagersList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const deleteManager = createAsyncThunk(
  "manager/delete",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await api.delete(token ?? "", id);
      toastSuccess("Вы успешно удалили менеджера");
      dispatch(getManagersList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);
