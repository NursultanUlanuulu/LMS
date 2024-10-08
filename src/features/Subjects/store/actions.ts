import { toastError, toastSuccess } from "@/shared/libs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
import { EditSubject, Subject } from "../type";

export const getSubjectsList = createAsyncThunk(
  "subject/getList",
  async (_, { rejectWithValue, dispatch }) => {
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

export const createSubject = createAsyncThunk(
  "subject/create",
  async (subject: EditSubject, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || ""
      const response = await api.create(token, subject);
      toastSuccess("Вы успешно создали новый предмет");
      dispatch(getSubjectsList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const updateSubject = createAsyncThunk(
  "subject/update",
  async ({ id, subject }: { subject: EditSubject, id: number }, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || ""
      const response = await api.update(token, subject, id);
      toastSuccess("Вы успешно изменили данные по предметы");
      dispatch(getSubjectsList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
)

export const getSubjectById = createAsyncThunk(
  "subject/detail",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || ""
      const response = await api.detail(token, id);
      toastSuccess("Вы успешно изменили данные по предметы");
      dispatch(getSubjectsList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);
export const deleteSubject = createAsyncThunk(
  "subject/delete",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || ""
      const response = await api.delete(token, id);
      toastSuccess("Удаление успешно");
      dispatch(getSubjectsList());
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);