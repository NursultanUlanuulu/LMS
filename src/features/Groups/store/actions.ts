import { HistoryGroupFilter } from "./../type";
import { toastSuccess } from "./../../../shared/libs/utils/toastify";
import { toastError } from "@/shared/libs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
import { EditGroup, Filter } from "../type";

export const getGroupList = createAsyncThunk(
  "group/getList",
  async (
    params: { page: number; filter: Filter; per_page?: number },
    { rejectWithValue }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const { data } = await api.getList(token, params);
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
export const getGroupHistory = createAsyncThunk(
  "group/getGroupHistory",
  async (params: HistoryGroupFilter, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const { data } = await api.getHistory(token, params);
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
export const createGroup = createAsyncThunk(
  "group/create",
  async (
    { values, onClose }: { values: EditGroup; onClose: () => void },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      await api.create(token, values);
      onClose();
      const filter: Filter = {
        subject: "",
        day_of_the_week: "",
        time: "",
        current_teacher: "",
        group_status: "false",
      };
      dispatch(getGroupList({ filter, page: 1 }));
      toastSuccess("Вы успешно создали группу");
    } catch (e: any) {
      toastError(e.response.data.detail || "Ошибка при создании группы");
      return rejectWithValue(e.response.data.detail);
    }
  }
);
export const editGroup = createAsyncThunk(
  "group/edit",
  async (
    {
      req,
      id,
    }: {
      req: EditGroup | { is_active: boolean } | { comment: string };
      id: number;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      await api.update(token, req, id);
      dispatch(getGroupById(id));
      toastSuccess("Вы успешно изменили данные группы");
    } catch (e: any) {
      toastError(
        e.response.data.detail || "Ошибка при попытке изменения данных группы"
      );
      return rejectWithValue(e.response.data.detail);
    }
  }
);
export const changeTeacher = createAsyncThunk(
  "group/changeTeacher",
  async (
    { teacherId, id }: { teacherId: number; id: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      await api.changeTeacher(token, teacherId, id);
      dispatch(getGroupById(id));
      toastSuccess("Вы успешно сменили преподавателя");
    } catch (e: any) {
      toastError(e.response.data.detail);
      return rejectWithValue(e.response.data.detail);
    }
  }
);
export const getGroupById = createAsyncThunk(
  "group/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const { data } = await api.detail(token, id);
      return data;
    } catch (e: any) {
      toastError(e.response.data.detail);
      return rejectWithValue(e.response.data.detail);
    }
  }
);

export const getGroupStudents = createAsyncThunk(
  "group/getStudents",
  async (req: { group: number; page?: number, }, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("token") || "";

      const { data } = await api.getStudents(token, req);
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

export const archiveGroup = createAsyncThunk(
  "group/archive",
  async (
    data: { archived: boolean; groupId: number; is_active: boolean },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      await api.archive(token, data);
      dispatch(getGroupById(data.groupId));
      toastSuccess(
        data.archived
          ? "Вы успешно архивировали группу"
          : "Вы успешно разархивировали группу"
      );
    } catch (e: any) {
      toastError(e.response.data.detail);
      return rejectWithValue(e.response.data.detail);
    }
  }
);
