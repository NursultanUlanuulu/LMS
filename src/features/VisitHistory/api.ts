import {
    AttendanceFilter,
    GroupStudentsAttendances,
  } from "./types";
  
  import { apiRoot } from "../../app/api";
  import { IListTable } from "@/shared/types";
  
  export const api = {
    getGroupAttendancesHistoryService: (filter: AttendanceFilter, token: string) =>
      apiRoot.get<IListTable<GroupStudentsAttendances>>(`/user/attendance/`, {
        params: filter,
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
  };
  