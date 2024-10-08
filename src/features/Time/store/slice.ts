import { createSlice } from "@reduxjs/toolkit"
import { StatusResponse } from "@/shared/enums"
import { getTimeList, createTime, updateTime, getTimeById, deleteTime } from "./actions"
import { IEdit, IGetById } from "@/shared/types"
import { Time } from "../type";

interface InitialState {
  getList: {
    status: StatusResponse;
    message?: string;
    data: Time[];
  };
  create: IEdit
  update: IEdit
  detail: IGetById<Time>
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
    data: {} as Time
  },
  delete: {
    status: StatusResponse.INITIAL,
    message: "",
  },
};

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getTimeList.fulfilled,
        (state, action) => {
          state.getList.status = StatusResponse.SUCCESS;
          state.getList.data = action.payload;
        }
      )
      .addCase(getTimeList.pending, (state) => {
        state.getList.status = StatusResponse.LOADING;
      })
      .addCase(getTimeList.rejected, (state, action) => {
        state.getList.status = StatusResponse.ERROR;
        state.getList.message = action.payload as string;
      }),
      builder
        .addCase(createTime.fulfilled, (state) => {
          state.create.status = StatusResponse.SUCCESS;
        })
        .addCase(createTime.pending, (state) => {
          state.create.status = StatusResponse.LOADING;
        })
        .addCase(createTime.rejected, (state, action) => {
          state.create.status = StatusResponse.ERROR;
          state.create.message = action.payload as string;
        }),
      builder
        .addCase(updateTime.fulfilled, (state) => {
          state.update.status = StatusResponse.SUCCESS;
        })
        .addCase(updateTime.pending, (state) => {
          state.update.status = StatusResponse.LOADING;
        })
        .addCase(updateTime.rejected, (state, action) => {
          state.update.status = StatusResponse.ERROR;
          state.update.message = action.payload as string;
        }),
      builder
        .addCase(getTimeById.fulfilled, (state, action) => {
          state.detail.status = StatusResponse.SUCCESS;
          state.detail.data = action.payload
        })
        .addCase(getTimeById.pending, (state) => {
          state.detail.status = StatusResponse.LOADING;
        })
        .addCase(getTimeById.rejected, (state, action) => {
          state.detail.status = StatusResponse.ERROR;
          state.detail.message = action.payload as string;
        })
    builder
      .addCase(deleteTime.fulfilled, (state) => {
        state.delete.status = StatusResponse.SUCCESS;
      })
      .addCase(deleteTime.pending, (state) => {
        state.delete.status = StatusResponse.LOADING;
      })
      .addCase(deleteTime.rejected, (state, action) => {
        state.delete.status = StatusResponse.ERROR;
        state.delete.message = action.payload as string;
      })
  },
});
export default timeSlice.reducer;
