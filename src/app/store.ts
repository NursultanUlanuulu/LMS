import { DayOfWeek } from "./../features/DayOfWeek/type";
import authSlice from "./../features/Auth/store/slice";
import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { teacherSlice } from "@/features/Teachers";
import booksSlice from "@/features/Books/store/slice";
import branchesSlice from "@/features/Branches/store/slice";
import managersSlice from "@/features/Managers/store/slice";
import { subjectSlice } from "@/features/Subjects";
import { promoterSlice } from "@/features/Promoters";
import { dayOfWeekSlice } from "@/features/DayOfWeek";
import studentsSlice from "@/features/Students/store/slice";
import { groupSlice } from "@/features/Groups";
import { timeSlice } from "@/features/Time";
import { mainSlice } from "@/features/Main";
import attendanceSlice from "@/features/Attendances/store/slice";
import { attendanceHistorySlice } from "@/features/VisitHistory/ui";

const reducers = {
  auth: authSlice,
  teachers: teacherSlice,
  books: booksSlice,
  branches: branchesSlice,
  managers: managersSlice,
  subjects: subjectSlice,
  promoters: promoterSlice,
  DayOfWeek: dayOfWeekSlice,
  students: studentsSlice,
  group: groupSlice,
  time: timeSlice,
  main: mainSlice,
  attendance: attendanceSlice,
  history: attendanceHistorySlice,
};

const combinedReducer = combineReducers(reducers);

const rootReducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: AnyAction
) => {
  if (action.type === "auth/logout") {
    return combinedReducer(undefined, action);
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.MODE !== "production",
});
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
