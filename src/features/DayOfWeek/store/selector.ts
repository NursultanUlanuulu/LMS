import { RootState } from "@/app/store";

export const selectDayOfWeek = (state: RootState) => state.DayOfWeek.getList;


export const selectCreateDayOfWeekStatus = (state: RootState) =>
  state.DayOfWeek.create.status;

export const selectEditDayOfWeekStatus = (state: RootState) =>
  state.DayOfWeek.create.status
