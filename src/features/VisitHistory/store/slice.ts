import { GroupStudentsAttendances, Journal } from "./../types";
import { createSlice } from "@reduxjs/toolkit";
import { StatusResponse } from "@/shared/enums";
import { getGroupAttendancesHistory } from "./actions";
import { IList } from "@/shared/types";

interface InitialState {
  groupAttendances: IList<GroupStudentsAttendances>;
}

const initialState: InitialState = {
  groupAttendances: {
    amount: 0,
    data: [],
    limit: 0,
    pagesCount: 0,
    status: StatusResponse.INITIAL,
    message: "",
  },
};

export const attendanceHistorySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroupAttendancesHistory.fulfilled, (state, action) => {
        state.groupAttendances.status = StatusResponse.SUCCESS;
        state.groupAttendances.data = action.payload
          .data as unknown as GroupStudentsAttendances[];
        state.groupAttendances.amount = action.payload.amount;
        state.groupAttendances.limit = action.payload.limit;
        state.groupAttendances.pagesCount = action.payload.pagesCount;
      })
      .addCase(getGroupAttendancesHistory.pending, (state) => {
        state.groupAttendances.status = StatusResponse.LOADING;
      })
      .addCase(getGroupAttendancesHistory.rejected, (state, action) => {
        state.groupAttendances.status = StatusResponse.ERROR;
        state.groupAttendances.message = action.payload as string;
      });
  },
});
export default attendanceHistorySlice.reducer;
