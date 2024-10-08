import { EditSubject, Subject } from "./type";

import { apiRoot } from "../../app/api";
import { IListTable } from "@/shared/types";

export const api = {
  getList: (token: string) =>
    apiRoot.get<IListTable<Subject>>(`/predmet/crud/`, {
      headers: {
        Authorization: `Token ${token}`,

      },
      params: {
        per_page: 100
      }
    }),

  create: (token: string, subject: EditSubject) =>
    apiRoot.post(`/predmet/crud/`, subject, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  update: (token: string, subject: EditSubject, id: number) =>
    apiRoot.put(`/predmet/crud/${id}/`, subject, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  detail: (token: string, id: number) =>
    apiRoot.get<Subject>(`/predmet/crud/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  delete: (token: string, id: number) =>
    apiRoot.delete(`/predmet/crud/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
};
