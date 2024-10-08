import { RootState } from "@/app/store";

export const selectGroupAttendanceStudentsHistory = (state: RootState) =>
  state.history.groupAttendances;

export const selectGetGroupAttendancesStatusHistory = (state: RootState) =>
  state.history.groupAttendances.status;

