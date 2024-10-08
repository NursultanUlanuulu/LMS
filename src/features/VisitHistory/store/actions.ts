import { toastError, toastSuccess } from "@/shared/libs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
import { AttendanceFilter } from "../types";

export const getGroupAttendancesHistory = createAsyncThunk(
  "history/group",
  async (filter: AttendanceFilter, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await api.getGroupAttendancesHistoryService(
        filter,
        token ?? ""
      );
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
