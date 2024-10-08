import {
  Attendance,
  StudentAttendancesInGroup,
  GroupStudentsAttendances,
  Journal,
} from "./../type";
import { createSlice } from "@reduxjs/toolkit";
import { StatusResponse } from "@/shared/enums";
import {
  createAttendance,
  getGroupAttendances,
  getStudentAttendances,
  getJournal,
  editAttendance,
} from "./actions";
import { IEdit } from "@/shared/types";
import { IList } from "@/shared/types";

interface InitialState {
  journal: {
    data: Journal;
    status: StatusResponse;
    message: string;
  };
  groupAttendances: IList<GroupStudentsAttendances>;
  create: IEdit;
  edit: IEdit;
  getStudentAttendances: IList<StudentAttendancesInGroup>;
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
  journal: {
    data: {
      current_teacher_id: 0,
      current_teacher_name: "",
      day_of_the_week: [],
      id: 0,
      name: "",
      students: [],
      subject: "",
      time: "",
      trial_students: [],
    },
    message: "",
    status: StatusResponse.INITIAL,
  },
  create: {
    status: StatusResponse.INITIAL,
    message: "",
  },
  edit: {
    status: StatusResponse.INITIAL,
    message: "",
  },
  getStudentAttendances: {
    amount: 0,
    data: [],
    limit: 0,
    pagesCount: 0,
    status: StatusResponse.INITIAL,
    message: "",
  },
};

export const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAttendance.fulfilled, (state, action) => {
        state.create.status = StatusResponse.SUCCESS;
      })
      .addCase(createAttendance.pending, (state) => {
        state.create.status = StatusResponse.LOADING;
      })
      .addCase(createAttendance.rejected, (state) => {
        state.create.status = StatusResponse.ERROR;
      }),
      builder
        .addCase(getGroupAttendances.fulfilled, (state, action) => {
          state.groupAttendances.status = StatusResponse.SUCCESS;
          state.groupAttendances.data = action.payload
            .data as unknown as GroupStudentsAttendances[];
          state.groupAttendances.amount = action.payload.amount;
          state.groupAttendances.limit = action.payload.limit;
          state.groupAttendances.pagesCount = action.payload.pagesCount;
        })
        .addCase(getGroupAttendances.pending, (state) => {
          state.groupAttendances.status = StatusResponse.LOADING;
        })
        .addCase(getGroupAttendances.rejected, (state, action) => {
          state.groupAttendances.status = StatusResponse.ERROR;
          state.groupAttendances.message = action.payload as string;
        }),
      builder
        .addCase(getStudentAttendances.fulfilled, (state, action) => {
          state.getStudentAttendances.status = StatusResponse.SUCCESS;
          state.getStudentAttendances.data = action.payload
            .data as unknown as StudentAttendancesInGroup[];
          state.getStudentAttendances.amount = action.payload.amount;
          state.getStudentAttendances.limit = action.payload.limit;
          state.getStudentAttendances.pagesCount = action.payload.pagesCount;
        })
        .addCase(getStudentAttendances.pending, (state) => {
          state.getStudentAttendances.status = StatusResponse.LOADING;
        })
        .addCase(getStudentAttendances.rejected, (state, action) => {
          state.getStudentAttendances.status = StatusResponse.ERROR;
          state.getStudentAttendances.message = action.payload as string;
        }),
      builder
        .addCase(getJournal.fulfilled, (state, action) => {
          state.journal.data = action.payload;
          state.journal.status = StatusResponse.SUCCESS;
        })
        .addCase(getJournal.pending, (state) => {
          state.journal.status = StatusResponse.LOADING;
        })
        .addCase(getJournal.rejected, (state, action) => {
          state.journal.status = StatusResponse.ERROR;
          state.journal.message = action.payload as string;
        });

    builder
      .addCase(editAttendance.fulfilled, (state, action) => {
        state.edit.status = StatusResponse.SUCCESS;
      })
      .addCase(editAttendance.pending, (state) => {
        state.edit.status = StatusResponse.LOADING;
      })
      .addCase(editAttendance.rejected, (state, action) => {
        state.edit.status = StatusResponse.ERROR;
        state.edit.message = action.payload as string;
      });
  },
});
export default attendanceSlice.reducer;
