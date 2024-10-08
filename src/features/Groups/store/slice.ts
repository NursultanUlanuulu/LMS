import { HistoryGroup } from "./../type";
import {
  createGroup,
  editGroup,
  getGroupById,
  getGroupList,
  getGroupStudents,
  changeTeacher,
  getGroupHistory,
  archiveGroup,
} from "./actions";
import { createSlice } from "@reduxjs/toolkit";
import { StatusResponse } from "@/shared/enums";
import { IList } from "@/shared/types";
import { IEdit, IGetById } from "@/shared/types";
import { Group } from "../type";
import { Student } from "@/features/Students/types";

interface InitialState {
  list: IList<Group>;
  history: IList<HistoryGroup>;
  create: IEdit;
  update: IEdit;
  detail: IGetById<Group>;
  delete: IEdit;
  changeTeacher: IEdit;
  archive: IEdit;
  students: IList<Student>;
}

const initialState: InitialState = {
  list: {
    data: [] as Group[],
    amount: 0,
    limit: 0,
    pagesCount: 0,
    message: "",
    status: StatusResponse.INITIAL,
  },
  history: {
    data: [] as HistoryGroup[],
    amount: 0,
    limit: 0,
    pagesCount: 0,
    message: "",
    status: StatusResponse.INITIAL,
  },
  create: {
    status: StatusResponse.INITIAL,
    message: "",
  },
  update: {
    status: StatusResponse.INITIAL,
    message: "",
  },
  detail: {
    status: StatusResponse.INITIAL,
    message: "",
    data: {} as Group,
  },
  delete: {
    status: StatusResponse.INITIAL,
    message: "",
  },
  changeTeacher: {
    status: StatusResponse.INITIAL,
    message: "",
  },
  archive: {
    status: StatusResponse.INITIAL,
    message: "",
  },
  students: {
    data: [] as Student[],
    amount: 0,
    limit: 0,
    pagesCount: 0,
    message: "",
    status: StatusResponse.INITIAL,
  },
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getGroupList.fulfilled, (state, action) => {
        state.list.status = StatusResponse.SUCCESS;
        state.list.data = action.payload.data as unknown as Group[];
        state.list.amount = action.payload.amount;
        state.list.limit = action.payload.limit;
        state.list.pagesCount = action.payload.pagesCount;
      })
      .addCase(getGroupList.pending, (state) => {
        state.list.status = StatusResponse.LOADING;
      })
      .addCase(getGroupList.rejected, (state, action) => {
        state.list.status = StatusResponse.ERROR;
        state.list.message = action.payload as string;
      }),
      builder
        .addCase(getGroupHistory.fulfilled, (state, action) => {
          state.history.status = StatusResponse.SUCCESS;
          state.history.data = action.payload.data as unknown as HistoryGroup[];
          state.history.amount = action.payload.amount;
          state.history.limit = action.payload.limit;
          state.history.pagesCount = action.payload.pagesCount;
        })
        .addCase(getGroupHistory.pending, (state) => {
          state.history.status = StatusResponse.LOADING;
        })
        .addCase(getGroupHistory.rejected, (state, action) => {
          state.history.status = StatusResponse.ERROR;
          state.history.message = action.payload as string;
        }),
      builder
        .addCase(createGroup.fulfilled, (state, action) => {
          state.create.status = StatusResponse.SUCCESS;
        })
        .addCase(createGroup.pending, (state) => {
          state.create.status = StatusResponse.LOADING;
        })
        .addCase(createGroup.rejected, (state, action) => {
          state.create.status = StatusResponse.ERROR;
          state.create.message = action.payload as string;
        }),
      builder
        .addCase(getGroupById.fulfilled, (state, action) => {
          state.detail.status = StatusResponse.SUCCESS;
          state.detail.data = action.payload;
        })
        .addCase(getGroupById.pending, (state) => {
          state.detail.status = StatusResponse.LOADING;
        })
        .addCase(getGroupById.rejected, (state, action) => {
          state.detail.status = StatusResponse.ERROR;
          state.detail.message = action.payload as string;
        }),
      builder
        .addCase(editGroup.fulfilled, (state, action) => {
          state.update.status = StatusResponse.SUCCESS;
        })
        .addCase(editGroup.pending, (state) => {
          state.update.status = StatusResponse.LOADING;
        })
        .addCase(editGroup.rejected, (state, action) => {
          state.update.status = StatusResponse.ERROR;
          state.update.message = action.payload as string;
        }),
      builder
        .addCase(changeTeacher.fulfilled, (state, action) => {
          state.changeTeacher.status = StatusResponse.SUCCESS;
        })
        .addCase(changeTeacher.pending, (state) => {
          state.changeTeacher.status = StatusResponse.LOADING;
        })
        .addCase(changeTeacher.rejected, (state, action) => {
          state.changeTeacher.status = StatusResponse.ERROR;
          state.changeTeacher.message = action.payload as string;
        }),
      builder
        .addCase(getGroupStudents.fulfilled, (state, action) => {
          state.students.status = StatusResponse.SUCCESS;
          state.students.data = action.payload.data;
          state.students.amount = action.payload.amount;
          state.students.limit = action.payload.limit;
          state.students.pagesCount = action.payload.pagesCount;
        })
        .addCase(getGroupStudents.pending, (state) => {
          state.students.status = StatusResponse.LOADING;
        })
        .addCase(getGroupStudents.rejected, (state, action) => {
          state.students.status = StatusResponse.ERROR;
          state.students.message = action.payload as string;
        }),
      builder
        .addCase(archiveGroup.fulfilled, (state, action) => {
          state.archive.status = StatusResponse.SUCCESS;
        })
        .addCase(archiveGroup.pending, (state) => {
          state.archive.status = StatusResponse.LOADING;
        })
        .addCase(archiveGroup.rejected, (state, action) => {
          state.archive.status = StatusResponse.ERROR;
          state.archive.message = action.payload as string;
        });
  },
});
export default groupSlice.reducer;
