import { RootState } from "@/app/store";

export const selectBranchesList = (state: RootState) => state.branches.branches;

export const selectGetBranchesStatus = (state: RootState) =>
  state.branches.getBranchesList.status;

export const selectCreateBranchStatus = (state: RootState) =>
  state.branches.create.status;

export const selectEditBranchStatus = (state: RootState) =>
  state.branches.updateBranch.status;

export const selectDeleteBranchStatus = (state: RootState) => {
  return state.branches.deleteBranch.status;
};
