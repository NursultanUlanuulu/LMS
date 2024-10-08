import { getGroupList } from "@/features/Groups/store/actions";
import { toastError, toastSuccess } from "@/shared/libs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
import { AddToPending, CreateStudent, EditStudent } from "../types";

export const getStudentsList = createAsyncThunk(
  "students/getList",
  async (
    params: { search: string; page: number; blacklist?: boolean },
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

export const createStudent = createAsyncThunk(
  "students/create",
  async (student: CreateStudent, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const response = await api.create(token, student);
      toastSuccess("Вы успешно создали нового студента");
      dispatch(getStudentsList({ page: 1, search: "" }));
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const getStudentById = createAsyncThunk(
  "students/detail",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const response = await api.detail(token, id);
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const updateStudent = createAsyncThunk(
  "students/update",
  async (
    { id, student }: { student: EditStudent; id: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const response = await api.update(token, student, id);
      toastSuccess("Вы успешно изменили данные студента");
      dispatch(getStudentById(id));
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const response = await api.delete(token, id);
      toastSuccess("Удаление успешно");
      dispatch(getStudentsList({ page: 1, search: "" }));
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const addStudentToGroup = createAsyncThunk(
  "students/addToGroup",
  async (
    data: { tarif_sum: number; group: number; student: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const response = await api.addToGroup(token, data);
      toastSuccess("Вы успешно добавили студента в группу");
      dispatch(
        getGroupList({ page: 1, filter: { student: String(data.student), archived: "false" } })
      );
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const addStudentToBlacklist = createAsyncThunk(
  "students/blacklist",
  async (
    data: { comment: string; studentId: number; blacklist: boolean },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const response = await api.blacklist(token, data);
      toastSuccess(
        data.blacklist
          ? "Вы добавили студента в черный список"
          : "Вы убрали студента из черного списка"
      );
      dispatch(getStudentById(data.studentId));
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const addDebtorSum = createAsyncThunk(
  "students/addDebtorSum",
  async (
    data: { comment: string; student: number; amount: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const response = await api.addDebtorSum(token, data);
      toastSuccess("Вы добавили долг студенту");
      dispatch(getStudentById(data.student));
      return response.data;
    } catch (e: any) {
      toastError(e.response.data);
      return rejectWithValue(e.response.data);
    }
  }
);
export const addToTrial = createAsyncThunk(
  "students/addToTrial",
  async (
    data: { group: number; student: number, lesson_date: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const response = await api.addToTrial(token, data);
      toastSuccess("Вы добавили студента в пробники");
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message || "Ошибка при добавлении в пробники");
      return rejectWithValue(e.response.data.message);
    }
  }
);
export const addCommentStudent = createAsyncThunk(
  "students/addCommentStudent",
  async (
    data: { comment: string; studentId: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const response = await api.addComment(token, data);
      toastSuccess("Вы добавили комментарий");
      dispatch(getStudentById(data.studentId));
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);
export const transferPayment = createAsyncThunk(
  "students/transferPayment",
  async (
    data: {
      studentId: number;
      phone: string;
      comment: string;
      balance: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const response = await api.transferPayment(token, data);
      toastSuccess("Вы перевели счет студента");
      dispatch(getStudentById(data.studentId));
      return response.data;
    } catch (e: any) {
      toastError(e.response.data[0]);
      return rejectWithValue(e.response.data[0]);
    }
  }
);

export const addToPending = createAsyncThunk(
  "students/addToPending",
  async (data: AddToPending, { rejectWithValue, dispatch }) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const response = await api.addToPending(token, data);
      toastSuccess("Вы успешно добавили студента в список ожидаемых");
      return response.data;
    } catch (e: any) {
      toastError(e.response.data[0]);
      return rejectWithValue(e.response.data[0]);
    }
  }
);

export const getMoneyForBook = createAsyncThunk(
  "students/getMoneyForBook",
  async (
    data: { group: number; student: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const response = await api.getMoneyForBook(token, data);
      toastSuccess("Вы сняли оплату за книгу");
      dispatch(
        getGroupList({ filter: { student: String(data.student), archived: "false" }, page: 1 })
      );
      return response.data;
    } catch (e: any) {
      toastError(e.response.data);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const deleteFromGroup = createAsyncThunk(
  "students/deleteFromGroup",
  async (
    data: { group: number; student: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const response = await api.deleteFromGroup(token, data);
      toastSuccess("Вы отписали студента из группы");
      dispatch(
        getGroupList({ filter: { student: String(data.student), archived: "false" }, page: 1 })
      );
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);
export const changePriceOfStudGroup = createAsyncThunk(
  "students/changePriceOfStudGroup",
  async (
    data: { group: number; tarif: number; student: number; tarif_sum: string; tarif_type: string },
    { rejectWithValue }
  ) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const response = await api.changePriceOfStudGroup(token, data);
      toastSuccess("Вы поменяли цену обучения");
      return response.data;
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const getTrialLessons = createAsyncThunk(
  "students/getTrialLessons",
  async (data: { page?: number; student: number }, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const response = await api.getTrialLessons(token, data);
      return {
        data: response.data.results,
        amount: response.data.count,
        limit: response.data.page_size,
        pagesCount: response.data.num_pages,
      };
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const getGraduated = createAsyncThunk(
  "students/getGraduated",
  async (data: { page?: number; group__subject?: string }, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      const response = await api.getGraduated(token, data);
      return {
        data: response.data.results,
        amount: response.data.count,
        limit: response.data.page_size,
        pagesCount: response.data.num_pages,
      };
    } catch (e: any) {
      toastError(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);