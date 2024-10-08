import { RootState } from "@/app/store";

export const selectPendings = (state: RootState) => state.main.listPendings
export const selectDebtors = (state: RootState) => state.main.listDebtors
export const selectTrials = (state: RootState) => state.main.listTrials
export const selectUnrecorded = (state: RootState) => state.main.listUnrecorded

export const selectTimeForTrails = (state: RootState) => state.time.getList;


