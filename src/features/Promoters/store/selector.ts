import { RootState } from "@/app/store";

export const selectPromoters = (state: RootState) => state.promoters.getList;


export const selectCreatePromoterStatus = (state: RootState) =>
  state.promoters.create.status;

export const selectEditPromoterStatus = (state: RootState) =>
  state.promoters.create.status
