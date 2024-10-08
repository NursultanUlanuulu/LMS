import { HistoryGroup } from './../../Groups/type';
import { Teacher } from "./../type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusResponse } from "@/shared/enums";
import {
  editTeacher,
  fireTeacher,
  getList,
  getTeacherById,
  sendTeacherOnVacation,
  returnTeacherFromVacation,
  getListHistoryTeacher,
} from "./actions";
import { IEdit, IGetById, IList, IPayloadList } from "@/shared/types";

interface InitialState {
  list: IList<Teacher>;
  history: IList<HistoryGroup>;
  getById: IGetById<Teacher>;
  edit: IEdit;
  create: IEdit;
  fire: IEdit;
  sendOnVacation: IEdit;
  returnFromVacation: IEdit;
}

const initialState: InitialState = {
  list: {
    data: [] as Teacher[],
    amount: 0,
    limit: 0,
    pagesCount: 0,
    message: "",
    status: StatusResponse.LOADING,
  },
  history: {
    data: [] as HistoryGroup[],
    amount: 0,
    limit: 0,
    pagesCount: 0,
    message: "",
    status: StatusResponse.LOADING,
  },
  getById: {
    data: {} as Teacher,
    status: StatusResponse.INITIAL,
  },
  edit: {
    message: "",
    status: StatusResponse.INITIAL,
  },
  create: {
    message: "",
    status: StatusResponse.INITIAL,
  },
  fire: {
    message: "",
    status: StatusResponse.INITIAL,
  },
  sendOnVacation: {
    message: "",
    status: StatusResponse.INITIAL,
  },
  returnFromVacation: {
    message: "",
    status: StatusResponse.INITIAL,
  },
};

export const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getList.fulfilled, (state, action) => {
      state.list.status = StatusResponse.SUCCESS;
      state.list.data = action.payload.data as unknown as Teacher[];
      state.list.amount = action.payload.amount;
      state.list.limit = action.payload.limit;
      state.list.pagesCount = action.payload.pagesCount;
    });
    builder.addCase(getList.pending, (state, action) => {
      state.list.status = StatusResponse.LOADING;
    });
    builder.addCase(getList.rejected, (state) => {
      state.list.status = StatusResponse.ERROR;
    });
    builder.addCase(getListHistoryTeacher.fulfilled, (state, action) => {
      state.history.status = StatusResponse.SUCCESS;
      state.history.data = action.payload.data as unknown as HistoryGroup[];
      state.history.amount = action.payload.amount;
      state.history.limit = action.payload.limit;
      state.history.pagesCount = action.payload.pagesCount;
    });
    builder.addCase(getListHistoryTeacher.pending, (state) => {
      state.history.status = StatusResponse.LOADING;
    });
    builder.addCase(getListHistoryTeacher.rejected, (state) => {
      state.history.status = StatusResponse.ERROR;
    });
    builder.addCase(getTeacherById.fulfilled, (state, action) => {
      state.getById.status = StatusResponse.SUCCESS;
      state.getById.data = action.payload as unknown as Teacher;
    });
    builder.addCase(getTeacherById.pending, (state, action) => {
      state.getById.status = StatusResponse.LOADING;
    });
    builder.addCase(getTeacherById.rejected, (state) => {
      state.getById.status = StatusResponse.ERROR;
    });

    builder.addCase(editTeacher.fulfilled, (state) => {
      state.edit.status = StatusResponse.SUCCESS;
    });
    builder.addCase(editTeacher.pending, (state) => {
      state.edit.status = StatusResponse.LOADING;
    });
    builder.addCase(editTeacher.rejected, (state) => {
      state.edit.status = StatusResponse.ERROR;
    });

    builder.addCase(fireTeacher.fulfilled, (state) => {
      state.fire.status = StatusResponse.SUCCESS;
    });
    builder.addCase(fireTeacher.pending, (state) => {
      state.fire.status = StatusResponse.LOADING;
    });
    builder.addCase(fireTeacher.rejected, (state) => {
      state.fire.status = StatusResponse.ERROR;
    });

    builder.addCase(sendTeacherOnVacation.fulfilled, (state) => {
      state.sendOnVacation.status = StatusResponse.SUCCESS;
    });
    builder.addCase(sendTeacherOnVacation.pending, (state) => {
      state.sendOnVacation.status = StatusResponse.LOADING;
    });
    builder.addCase(sendTeacherOnVacation.rejected, (state) => {
      state.sendOnVacation.status = StatusResponse.ERROR;
    });

    builder.addCase(returnTeacherFromVacation.fulfilled, (state) => {
      state.returnFromVacation.status = StatusResponse.SUCCESS;
    });
    builder.addCase(returnTeacherFromVacation.pending, (state) => {
      state.returnFromVacation.status = StatusResponse.LOADING;
    });
    builder.addCase(returnTeacherFromVacation.rejected, (state) => {
      state.returnFromVacation.status = StatusResponse.ERROR;
    });
  },
});
export default teacherSlice.reducer;
