import { RootState } from "@/app/store";

export const selectListTeachers = (state: RootState) => state.teachers.list
export const selectTeacherById = (state: RootState) => state.teachers.getById;

export const selectListHistoryTeachers = (state: RootState) => state.teachers.history


