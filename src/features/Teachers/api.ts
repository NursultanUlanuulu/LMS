import { HistoryGroup } from "./../Groups/type";
import { TeacherCreate, TeacherStatus } from "./type";
import { Teacher } from "./type";
import { IHeaders, IListTable } from "./../../shared/types/index";
import { apiRoot } from "../../app/api";

export const api = {
  getList: (
    params: {
      page?: number;
      search?: string;
      is_active?: string;
    },
    headers: IHeaders
  ) =>
    apiRoot.get<IListTable<Teacher>>(`/user/teacher/`, {
      headers,
      params,
    }),
  getListHistory: (
    params: {
      page?: number;
      search?: string;
      subject?: string;
      group?: string;
      user: number;
    },
    headers: IHeaders
  ) =>
    apiRoot.get<IListTable<HistoryGroup>>(`/user/my_history/`, {
      headers,
      params,
    }),
  create: (headers: IHeaders, data: TeacherCreate) =>
    apiRoot.post(`/user/teacher/`, data, {
      headers,
    }),
  edit: (headers: IHeaders, id: number, data: TeacherCreate) =>
    apiRoot.patch(`/user/teacher/${id}/`, data, {
      headers,
    }),
  changeStatus: (
    headers: IHeaders,
    id: number,
    data: { comment: string; is_active?: boolean; status: TeacherStatus }
  ) =>
    apiRoot.patch(`/user/teacher/${id}/`, data, {
      headers,
    }),
  delete: (headers: IHeaders, id: number) =>
    apiRoot.delete(`/user/teacher/${id}/`, {
      headers,
    }),
  detail: (headers: IHeaders, id: number) =>
    apiRoot.get<Teacher>(`/user/teacher/${id}/`, {
      headers,
    }),
};
