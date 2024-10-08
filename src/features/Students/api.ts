import {
  CreateStudent,
  Student,
  EditStudent,
  AddToPending,
  TrialLessons,
  Graduated,
} from "./types";

import { apiRoot } from "../../app/api";
import { IListTable } from "@/shared/types";

export const api = {
  getList: (
    token: string,
    params: {
      page: number;
      search: string;
      blacklist?: boolean;
    }
  ) =>
    apiRoot.get<IListTable<Student>>(`/user/student/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    }),

  create: (token: string, student: CreateStudent) =>
    apiRoot.post(`/user/student/`, student, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  update: (token: string, student: EditStudent, id: number) =>
    apiRoot.patch(`/user/student/${id}/`, student, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  detail: (token: string, id: number) =>
    apiRoot.get<Student>(`/user/student/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  delete: (token: string, id: number) =>
    apiRoot.delete(`/user/student/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  addToGroup: (
    token: string,
    data: { tarif_sum: number; group: number; student: number }
  ) =>
    apiRoot.post(`/user/add/to/group/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  blacklist: (
    token: string,
    data: { studentId: number; comment: string; blacklist: boolean }
  ) =>
    apiRoot.patch(
      `/user/student/${data.studentId}/`,
      { blacklist: data.blacklist, comment: data.comment },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    ),
  addDebtorSum: (
    token: string,
    data: { student: number; comment: string; amount: number }
  ) =>
    apiRoot.post(`/payment_v_dolg-create/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  addToTrial: (token: string, data: { student: number; group: number, lesson_date: string }) =>
    apiRoot.post(`/user/trial_lesson/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  deleteFromGroup: (token: string, data: { student: number; group: number }) =>
    apiRoot.patch(
      `/user/otpiska/ot/gruppy/${data.student}/`,
      { group: data.group },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    ),
  getMoneyForBook: (token: string, data: { student: number; group: number }) =>
    apiRoot.post(`/user/oplata_za_knigu/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  addComment: (token: string, data: { studentId: number; comment: string }) =>
    apiRoot.patch(
      `/user/student/${data.studentId}/`,
      { comment: data.comment },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    ),
  transferPayment: (
    token: string,
    data: { studentId: number; phone: string; comment: string; balance: string }
  ) => {
    return apiRoot.patch(
      `/tranfer-balance/${data.studentId}/`,
      {
        comment: data.comment,
        balance: data.balance,
        phone: data.phone,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  changePriceOfStudGroup: (
    token: string,
    data: { student: number; group: number; tarif_sum: string; tarif: number; tarif_type: string }
  ) =>
    apiRoot.patch(`/user/add/to/group/${data.tarif}/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  addToPending: (token: string, data: AddToPending) => {
    return apiRoot.post(`/user/pending/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getTrialLessons: (
    token: string,
    params: { page?: number; student: number }
  ) =>
    apiRoot.get<IListTable<TrialLessons>>("/user/trial_lesson", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    }),
  getGraduated: (
    token: string,
    params: { page?: number; group__subject?: string }
  ) =>
    apiRoot.get<IListTable<Graduated>>("/user/graduates/tab/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    }),
};
