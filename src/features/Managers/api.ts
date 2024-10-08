import { EditManager, Manager } from "./type";

import { apiRoot } from "../../app/api";

export const api = {
  getList: (token: string) =>
    apiRoot.get<Manager[]>(`/user/manager/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  create: (token: string, manager: Manager) =>
    apiRoot.post<Manager>(`/user/manager/`, manager, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  update: (token: string, manager: EditManager) =>
    apiRoot.put<EditManager>(`/user/manager/${manager.id}/`, manager, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  delete: (token: string, id: number) =>
    apiRoot.delete(`/user/manager/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
};
