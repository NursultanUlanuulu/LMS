import { TeacherCreate, TeacherStatus } from "./../type";
import { toastError, toastSuccess } from "@/shared/libs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

export const getList = createAsyncThunk(
  "teachers/getList",
  async (
    params: {
      search?: string;
      page?: number;
      is_active?: string;
      per_page?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await api.getList(params, {
        Authorization: `Token ${token}`,
      });
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

export const getListHistoryTeacher = createAsyncThunk(
  "teachers/getListHistoryTeacher",
  async (
    params: {
      page?: number;
      search?: string;
      subject?: string;
      group?: string;
      user: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await api.getListHistory(params, {
        Authorization: `Token ${token}`,
      });
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

export const getTeacherById = createAsyncThunk(
  "teacher/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const { data } = await api.detail(
        {
          Authorization: `Token ${token}`,
        },
        id
      );
      return data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.detail);
    }
  }
);

export const editTeacher = createAsyncThunk(
  "teacher/edit",
  async (
    {
      id,
      req,
      onClose,
    }: { id: number; req: TeacherCreate; onClose: () => void },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      await api.edit(
        {
          Authorization: `Token ${token}`,
        },
        id,
        req
      );
      toastSuccess("Преподаватель успешно изменен");
      dispatch(getTeacherById(id));
      onClose();
      return "";
    } catch (e: any) {
      toastError("Ошибка при изменении");
      return rejectWithValue(e.response.data.detail);
    }
  }
);
export const fireTeacher = createAsyncThunk(
  "teacher/fire",
  async (
    {
      id,
      req,
    }: {
      id: number;
      req: { comment: string; is_active: boolean; status: TeacherStatus };
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      await api.changeStatus(
        {
          Authorization: `Token ${token}`,
        },
        id,
        req
      );
      toastSuccess("Преподаватель уволен");
      dispatch(getTeacherById(id));
      dispatch(getList({ page: 1, search: "", is_active: "true" }));
      return "";
    } catch (e: any) {
      toastError("Ошибка при увольнении");
      return rejectWithValue(e.response.data.detail);
    }
  }
);

export const sendTeacherOnVacation = createAsyncThunk(
  "teacher/sentToVacation",
  async (
    {
      id,
      req,
    }: {
      id: number;
      req: { comment: string; is_active: boolean; status: TeacherStatus };
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      await api.changeStatus(
        {
          Authorization: `Token ${token}`,
        },
        id,
        req
      );
      toastSuccess("Преподаватель отправлен в отпуск");
      dispatch(getTeacherById(id));
      dispatch(getList({ page: 1, search: "", is_active: "true" }));
      return "";
    } catch (e: any) {
      toastError("Ошибка при отправке в отпуск");
      return rejectWithValue(e.response.data.detail);
    }
  }
);

export const returnTeacherFromVacation = createAsyncThunk(
  "teacher/returnTeacherFromVacation",
  async (
    {
      id,
      req,
    }: {
      id: number;
      req: { comment: string; is_active: boolean; status: TeacherStatus };
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      await api.changeStatus(
        {
          Authorization: `Token ${token}`,
        },
        id,
        req
      );
      toastSuccess("Преподаватель возвращен из отпуска");
      dispatch(getTeacherById(id));
      dispatch(getList({ page: 1, search: "", is_active: "true" }));
      return "";
    } catch (e: any) {
      toastError("Ошибка при возвращении из отпуска");
      return rejectWithValue(e.response.data.detail);
    }
  }
);

export const createTeacher = createAsyncThunk(
  "teacher/create",
  async (
    { req, onClose }: { req: TeacherCreate; onClose: () => void },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      await api.create(
        {
          Authorization: `Token ${token}`,
        },
        req
      );
      dispatch(getList({ page: 1, search: "", is_active: "true" }));
      toastSuccess("Преподаватель успешно добавлен");
      onClose();
      return "";
    } catch (e: any) {
      toastError("Ошибка при создании");
      return rejectWithValue(e.response.data.detail);
    }
  }
);
