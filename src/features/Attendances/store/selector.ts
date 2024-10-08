import { RootState } from "@/app/store";

export const selectJournal = (state: RootState) =>
  state.attendance.journal.data;

export const selectGetJournalStatus = (state: RootState) =>
  state.attendance.journal.status;

export const selectListTeachers = (state: RootState) => state.teachers.list;

export const selectGroupAttendanceStudents = (state: RootState) =>
  state.attendance.groupAttendances;

export const selectGetGroupAttendancesStatus = (state: RootState) =>
  state.attendance.groupAttendances.status;

export const selectCreateAttendanceStatus = (state: RootState) => {
  return state.attendance.create.status;
};

export const selectEditAttendanceStatus = (state: RootState) => {
  return state.attendance.edit.status;
};

export const selectStudentAttendances = (state: RootState) => {
  return state.attendance.getStudentAttendances;
};

export const selectGetStudentsAttendancesStatus = (state: RootState) => {
  return state.attendance.getStudentAttendances.status;
};
export const selectTime = (state: RootState) => state.time.getList;
