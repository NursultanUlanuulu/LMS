import { RootState } from "@/app/store";

export const selectManagersList = (state: RootState) => state.managers.managers;

export const selectGetManagersStatus = (state: RootState) =>
  state.managers.getManagersList.status;

export const selectCreateManagerStatus = (state: RootState) =>
  state.managers.createManager.status;

export const selectEditManagerStatus = (state: RootState) =>
  state.managers.updateManager.status;

export const selectDeleteManagerStatus = (state: RootState) =>
  state.managers.deleteManager.status;
