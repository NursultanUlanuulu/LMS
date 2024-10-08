import {
  Attendance,
  AttendanceFilter,
  GroupStudentsAttendances,
  StudentAttendanceFilter,
  StudentAttendancesInGroup,
} from "./type";

import { apiRoot } from "../../app/api";
import { IListTable } from "@/shared/types";

export const api = {

  getJournal: (group_id: number, token: string) =>
    apiRoot.get(`/user/get_journal/${group_id}/`, {
      params: {
        group_id,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  create: (data: Attendance, token: string) =>
    apiRoot.post(`/user/attendance/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  edit: (data: Attendance, id: number, token: string) =>
    apiRoot.put(`/user/attendance/${id}/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  getGroupAttendances: (filter: AttendanceFilter, token: string) =>
    apiRoot.get<IListTable<GroupStudentsAttendances>>(`/user/attendance/`, {
      params: filter,
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  getStudentAttendances: (filter: StudentAttendanceFilter, token: string) =>
    apiRoot.get<IListTable<StudentAttendancesInGroup>>(
      "/user/attendance/student",
      {
        params: filter,
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    ),
};
