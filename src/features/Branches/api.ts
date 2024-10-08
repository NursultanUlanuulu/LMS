import { Branch } from "./type";

import { apiRoot } from "../../app/api";

export const api = {
  getList: (token: string) =>
    apiRoot.get<Branch[]>(`/branch/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  create: (token: string, branch: Branch) =>
    apiRoot.post<Branch>(`/branch/`, branch, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  update: (token: string, branch: Branch) =>
    apiRoot.put<Branch>(`/branch/${branch.id}/`, branch, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  delete: (token: string, branchId: number) =>
    apiRoot.delete(`/branch/${branchId}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
};
