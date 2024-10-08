import { EditPromoter, Promoter } from "./type";

import { apiRoot } from "../../app/api";
import { IListTable } from "@/shared/types";

export const api = {
  getList: (token: string) =>
    apiRoot.get<IListTable<Promoter>>(`/promoter/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {
        per_page: 100
      }
    }),

  create: (token: string, subject: EditPromoter) =>
    apiRoot.post(`/promoter/`, subject, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  update: (token: string, subject: EditPromoter, id: number) =>
    apiRoot.put(`/promoter/${id}/`, subject, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  detail: (token: string, id: number) =>
    apiRoot.get<Promoter>(`/promoter/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  delete: (token: string, id: number) =>
    apiRoot.delete(`/promoter/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
};
