import {
  Debtors,
  Pending,
  PendingFilter,
  Trial,
  TrialFilter,
  Unrecorded,
} from "./type";

import { apiRoot } from "../../app/api";
import { IListTable } from "@/shared/types";

export const api = {
  getList: (token: string, filter: PendingFilter) =>
    apiRoot.get<IListTable<Pending>>(`/user/pending/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: filter,
    }),
  getListDebtors: (token: string, filter: PendingFilter) =>
    apiRoot.get<IListTable<Debtors>>(`/doljniki/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: filter,
    }),
  getListTrial: (
    token: string,
    page: number,
    filter?: TrialFilter,
    search?: string,
    group__time?: string
  ) =>
    apiRoot.get<IListTable<Trial>>(`/user/trial_lesson/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {
        page,
        search: search?.trim(),
        group__time,
        ...filter,
      },
    }),
  getUnrecorded: (token: string, filter: PendingFilter) =>
    apiRoot.get<IListTable<Unrecorded>>(`/user/unrecorded/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: filter,
    }),
  addToUnrecorded: (token: string, id: number) =>
    apiRoot.post(
      `/user/add/to/unrecorded/`,
      { id },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    ),
  deleteFromListTrial: (token: string, id: number) =>
    apiRoot.delete(`/user/trial_lesson/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
};
