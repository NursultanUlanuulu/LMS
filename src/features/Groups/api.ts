import { EditGroup, Filter, Group, HistoryGroupFilter } from "./type";
import { apiRoot } from "../../app/api";
import { IListTable } from "@/shared/types";
import { Student } from "../Students/types";

export const api = {
  getList: (
    token: string,
    params: {
      page?: number;
      filter: Filter;
    }
  ) =>
    apiRoot.get<IListTable<Group>>(`/user/group/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {
        page: params.page,
        ...params.filter,
      },
    }),
  getHistory: (token: string, params: HistoryGroupFilter) =>
    apiRoot.get<IListTable<Group>>(`/user/group_histories/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    }),
  create: (token: string, group: EditGroup) =>
    apiRoot.post(`/user/group/`, group, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  update: (
    token: string,
    req: EditGroup | { is_active: boolean } | { comment: string },
    id: number
  ) =>
    apiRoot.patch(`/user/group/${id}/`, req, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  detail: (token: string, id: number) =>
    apiRoot.get<Group>(`/user/group/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  delete: (token: string, id: number) =>
    apiRoot.delete(`/user/group/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  changeTeacher: (token: string, teacherId: number, id: number) =>
    apiRoot.patch(
      `/user/group/${id}/`,
      { current_teacher: teacherId },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    ),

  getStudents: (token: string, params: { group: number; page?: number }) =>
    apiRoot.get<IListTable<Student>>(`/user/student/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    }),
  getStudentsTrials: (token: string, params: { group: number }) =>
    apiRoot.get(`/user/trial/students/${params.group}`, {
      headers: {
        Authorization: `Token ${token}`,
      }
    }),
  getStudentsUnsubscribed: (token: string, params: { group: number }) =>
    apiRoot.get(`/user/unsubscribed/from/the/group/${params.group}`, {
      headers: {
        Authorization: `Token ${token}`,
      }
    }),
  getStudentsGraduate: (token: string, params: { group: number }) =>
    apiRoot.get(`/user/graduates/${params.group}`, {
      headers: {
        Authorization: `Token ${token}`,
      }
    }),
  archive: (
    token: string,
    data: { archived: boolean; groupId: number; is_active: boolean }
  ) => {
    return apiRoot.patch(
      `/user/group/${data.groupId}/`,
      { archived: data.archived, is_active: data.is_active },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
};
