import { Pending, PendingFilter, TrialFilter } from "./../type";
import { toastError, toastSuccess } from "@/shared/libs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

export const getPendingsList = createAsyncThunk(
  "main/getPendingsList",
  async (filter: PendingFilter, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const { data } = await api.getList(token, filter);
      return {
        data: data.results,
        amount: data.count,
        limit: data.page_size,
        pagesCount: data.num_pages,
      };
    } catch (e: any) {
      toastError(e.response.data.detail);
      return rejectWithValue(e.response.data.detail);
    }
  }
);
export const getDebtorsList = createAsyncThunk(
  "main/getDebtorList",
  async (filter: PendingFilter, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const { data } = await api.getListDebtors(token, filter);
      return {
        data: data.results,
        amount: data.count,
        limit: data.page_size,
        pagesCount: data.num_pages,
      };
    } catch (e: any) {
      toastError(e.response.data.detail);
      return rejectWithValue(e.response.data.detail);
    }
  }
);
export const getTrialsList = createAsyncThunk(
  "main/getTrialsList",
  async (
    {
      page,
      filter,
      search,
      group__time,
    }: {
      page: number;
      filter?: TrialFilter;
      search?: string;
      group__time?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const { data } = await api.getListTrial(
        token,
        page,
        filter,
        search,
        group__time
      );
      console.log(data.results);
      return {
        data: data.results,
        amount: data.count,
        limit: data.page_size,
        pagesCount: data.num_pages,
      };
    } catch (e: any) {
      toastError(e.response.data.detail);
      return rejectWithValue(e.response.data.detail);
    }
  }
);
export const deleteFromTrialsList = createAsyncThunk(
  "main/deleteFromTrialsList",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      await api.deleteFromListTrial(token, id);
      toastSuccess("Вы успешно удалили студента из пробников");
      dispatch(getTrialsList({ page: 1 }));
    } catch (e: any) {
      toastError(e.response.data.detail);
      return rejectWithValue(e.response.data.detail);
    }
  }
);
export const getUnrecordedList = createAsyncThunk(
  "main/getUnrecordedList",
  async (filter: PendingFilter, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const { data } = await api.getUnrecorded(token, filter);
      return {
        data: data.results,
        amount: data.count,
        limit: data.page_size,
        pagesCount: data.num_pages,
      };
    } catch (e: any) {
      toastError(e.response.data.detail);
      return rejectWithValue(e.response.data.detail);
    }
  }
);
