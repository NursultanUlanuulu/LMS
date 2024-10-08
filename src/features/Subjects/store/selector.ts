import { RootState } from "@/app/store";

export const selectSubjects = (state: RootState) => state.subjects.getList;


export const selectCreateSubjectStatus = (state: RootState) =>
  state.subjects.create.status;

export const selectEditSubjectStatus = (state: RootState) =>
  state.subjects.create.status
