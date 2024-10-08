import { toastError, toastSuccess } from "@/shared/libs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
import { Branch } from "../type";

export const getBranchesList = createAsyncThunk(
  "branch/getList",
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

export const createBranch = createAsyncThunk(
  "branch/create",
  async (branch: Branch, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await api.create(token ?? "", branch);
      toastSuccess("Вы успешно создали новый филиал");
      dispatch(getBranchesList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const updateBranch = createAsyncThunk(
  "branch/update",
  async (branch: Branch, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await api.update(token ?? "", branch);
      toastSuccess("Вы успешно изменили данные филиала");
      dispatch(getBranchesList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const deleteBranch = createAsyncThunk(
  "branch/delete",
  async (branchId: number, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await api.delete(token ?? "", branchId);
      toastSuccess("Вы успешно удалили филиал");
      dispatch(getBranchesList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);
