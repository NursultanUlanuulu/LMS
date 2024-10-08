import { RootState } from "@/app/store";

export const selectGroups = (state: RootState) => state.group.list;

export const selectGetGroupsStatus = (state: RootState) =>
  state.group.list.status;

export const selectCreateGroupstatus = (state: RootState) =>
  state.group.create.status;

export const selectEditGroupstatus = (state: RootState) =>
  state.group.update.status;

export const selectGetGroupDetailStatus = (state: RootState) =>
  state.group.detail.status;

export const selectGroup = (state: RootState) => state.group.detail.data;

export const selectStudents = (state: RootState) => state.group.students;

export const selectGetStudentsStatus = (state: RootState) =>
  state.group.students.status;
export const selectHistoryGroup = (state: RootState) => state.group.history;

export const selectGetHistoryGroupStatus = (state: RootState) =>
  state.group.history.status;