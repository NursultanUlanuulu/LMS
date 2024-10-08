import { Subject } from "../type"
import { createSlice } from "@reduxjs/toolkit"
import { StatusResponse } from "@/shared/enums"
import { getSubjectsList, createSubject, updateSubject, getSubjectById, deleteSubject } from "./actions"
import { IEdit, IGetById } from "@/shared/types"

interface InitialState {
  getList: {
    status: StatusResponse;
    message?: string;
    data: Subject[];
  };
  create: IEdit
  update: IEdit
  detail: IGetById<Subject>
  delete: IEdit
}

const initialState: InitialState = {
  getList: {
    status: StatusResponse.INITIAL,
    message: "",
    data: []
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
    data: {} as Subject
  },
  delete: {
    status: StatusResponse.INITIAL,
    message: "",
  },
};

export const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getSubjectsList.fulfilled,
        (state, action) => {
          state.getList.status = StatusResponse.SUCCESS;
          state.getList.data = action.payload;
        }
      )
      .addCase(getSubjectsList.pending, (state) => {
        state.getList.status = StatusResponse.LOADING;
      })
      .addCase(getSubjectsList.rejected, (state, action) => {
        state.getList.status = StatusResponse.ERROR;
        state.getList.message = action.payload as string;
      }),
      builder
        .addCase(createSubject.fulfilled, (state) => {
          state.create.status = StatusResponse.SUCCESS;
        })
        .addCase(createSubject.pending, (state) => {
          state.create.status = StatusResponse.LOADING;
        })
        .addCase(createSubject.rejected, (state, action) => {
          state.create.status = StatusResponse.ERROR;
          state.create.message = action.payload as string;
        }),
      builder
        .addCase(updateSubject.fulfilled, (state) => {
          state.update.status = StatusResponse.SUCCESS;
        })
        .addCase(updateSubject.pending, (state) => {
          state.update.status = StatusResponse.LOADING;
        })
        .addCase(updateSubject.rejected, (state, action) => {
          state.update.status = StatusResponse.ERROR;
          state.update.message = action.payload as string;
        }),
      builder
        .addCase(getSubjectById.fulfilled, (state, action) => {
          state.detail.status = StatusResponse.SUCCESS;
          state.detail.data = action.payload
        })
        .addCase(getSubjectById.pending, (state) => {
          state.detail.status = StatusResponse.LOADING;
        })
        .addCase(getSubjectById.rejected, (state, action) => {
          state.detail.status = StatusResponse.ERROR;
          state.detail.message = action.payload as string;
        })
    builder
      .addCase(deleteSubject.fulfilled, (state) => {
        state.delete.status = StatusResponse.SUCCESS;
      })
      .addCase(deleteSubject.pending, (state) => {
        state.delete.status = StatusResponse.LOADING;
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.delete.status = StatusResponse.ERROR;
        state.delete.message = action.payload as string;
      })
  },
});
export default subjectSlice.reducer;
