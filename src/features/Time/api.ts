import { EditTime, Time } from './type';
import { apiRoot } from "../../app/api";
import { IListTable } from "@/shared/types";

export const api = {
  getList: (token: string) =>
    apiRoot.get<IListTable<Time>>(`/time/crud/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {
        per_page: 100
      }
    }),

  create: (token: string, subject: EditTime) =>
    apiRoot.post(`/time/crud/`, subject, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  update: (token: string, subject: EditTime, id: number) =>
    apiRoot.put(`/time/crud/${id}/`, subject, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  detail: (token: string, id: number) =>
    apiRoot.get<Time>(`/time/crud/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  delete: (token: string, id: number) =>
    apiRoot.delete(`/time/crud/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
};
