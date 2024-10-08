import { EditDayOfWeek, DayOfWeek } from "./type";
import { apiRoot } from "../../app/api";
import { IListTable } from "@/shared/types";

export const api = {
  getList: (token: string) =>
    apiRoot.get<IListTable<DayOfWeek>>(`/days/of/week/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {
        per_page: 100
      }
    }),

  create: (token: string, subject: EditDayOfWeek) =>
    apiRoot.post(`/days/of/week/`, subject, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  update: (token: string, subject: EditDayOfWeek, id: number) =>
    apiRoot.put(`/days/of/week/${id}/`, subject, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  detail: (token: string, id: number) =>
    apiRoot.get<DayOfWeek>(`/days/of/week/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  delete: (token: string, id: number) =>
    apiRoot.delete(`/days/of/week/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
};
