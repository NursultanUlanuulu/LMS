import { RootState } from "@/app/store";

export const selectTime = (state: RootState) => state.time.getList;


export const selectCreateTimeStatus = (state: RootState) =>
  state.time.create.status;

export const selectEditTimeStatus = (state: RootState) =>
  state.time.create.status
