import { toastError, toastSuccess } from "@/shared/libs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
import { Attendance, AttendanceFilter, StudentAttendanceFilter } from "../type";

export const getJournal = createAsyncThunk(
  "attendance/getJournal",
  async (group_id: number, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await api.getJournal(group_id, token ?? "");
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const createAttendance = createAsyncThunk(
  "attendance/create",
  async (data: Attendance, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await api.create(data, token ?? "");
      toastSuccess("Вы успешно добавили посещение");
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const editAttendance = createAsyncThunk(
  "attendance/edit",
  async (
    { id, data }: { id: number; data: Attendance },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await api.edit(data, id, token ?? "");
      toastSuccess("Вы успешно отредактировали посещение");
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const getGroupAttendances = createAsyncThunk(
  "attendance/groupAttendances",
  async (filter: AttendanceFilter, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await api.getGroupAttendances(filter, token ?? "");
      return {
        data: data.results,
        amount: data.count,
        limit: data.page_size,
        pagesCount: data.num_pages,
      };
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const getStudentAttendances = createAsyncThunk(
  "attendance/studentAttendances",
  async (filter: StudentAttendanceFilter, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await api.getStudentAttendances(filter, token ?? "");
      return {
        data: data.results,
        amount: data.count,
        limit: data.page_size,
        pagesCount: data.num_pages,
      };
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);
