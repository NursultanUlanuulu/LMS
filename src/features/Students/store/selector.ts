import { RootState } from "@/app/store";

export const selectStudents = (state: RootState) => state.students.list;

export const selectGetStudentsStatus = (state: RootState) =>
  state.students.list.status;

export const selectCreateStudentStatus = (state: RootState) =>
  state.students.create.status;

export const selectEditStudentStatus = (state: RootState) =>
  state.students.update.status;

export const selectGetStudentDetailStatus = (state: RootState) =>
  state.students.detail.status;

export const selectStudent = (state: RootState) => state.students.detail.data;

export const selectAddStudentToGroupStatus = (state: RootState) =>
  state.students.addToGroup.status;

export const selectTransferPaymentStatus = (state: RootState) =>
  state.students.transferPayment.status;
export const selectAddCommentStatus = (state: RootState) =>
  state.students.addComment.status;

export const selectAddToPending = (state: RootState) =>
  state.students.addToPending.status;
export const selectAddDebtor = (state: RootState) =>
  state.students.addDebtorSum.status;

export const selectTrialLessons = (state: RootState) =>
  state.students.trialLessons;

export const selectGetTrialStudentsStatus = (state: RootState) =>
  state.students.trialLessons.status;

export const selectGraduated = (state: RootState) =>
  state.students.graduated;