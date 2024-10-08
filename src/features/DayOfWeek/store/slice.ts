import { DayOfWeek } from "../type"
import { createSlice } from "@reduxjs/toolkit"
import { StatusResponse } from "@/shared/enums"
import { getDayOfWeekList, createDayOfWeek, updateEditDayOfWeek, getDayOfWeekById, deleteDayOfWeek } from "./actions"
import { IEdit, IGetById } from "@/shared/types"

interface InitialState {
  getList: {
    status: StatusResponse;
    message?: string;
    data: DayOfWeek[];
  };
  create: IEdit
  update: IEdit
  detail: IGetById<DayOfWeek>
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
    data: {} as DayOfWeek
  },
  delete: {
    status: StatusResponse.INITIAL,
    message: "",
  },
};

export const dayOfWeekSlice = createSlice({
  name: "dayOfWeek",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getDayOfWeekList.fulfilled,
        (state, action) => {
          state.getList.status = StatusResponse.SUCCESS;
          state.getList.data = action.payload;
        }
      )
      .addCase(getDayOfWeekList.pending, (state) => {
        state.getList.status = StatusResponse.LOADING;
      })
      .addCase(getDayOfWeekList.rejected, (state, action) => {
        state.getList.status = StatusResponse.ERROR;
        state.getList.message = action.payload as string;
      }),
      builder
        .addCase(createDayOfWeek.fulfilled, (state) => {
          state.create.status = StatusResponse.SUCCESS;
        })
        .addCase(createDayOfWeek.pending, (state) => {
          state.create.status = StatusResponse.LOADING;
        })
        .addCase(createDayOfWeek.rejected, (state, action) => {
          state.create.status = StatusResponse.ERROR;
          state.create.message = action.payload as string;
        }),
      builder
        .addCase(updateEditDayOfWeek.fulfilled, (state) => {
          state.update.status = StatusResponse.SUCCESS;
        })
        .addCase(updateEditDayOfWeek.pending, (state) => {
          state.update.status = StatusResponse.LOADING;
        })
        .addCase(updateEditDayOfWeek.rejected, (state, action) => {
          state.update.status = StatusResponse.ERROR;
          state.update.message = action.payload as string;
        }),
      builder
        .addCase(getDayOfWeekById.fulfilled, (state, action) => {
          state.detail.status = StatusResponse.SUCCESS;
          state.detail.data = action.payload
        })
        .addCase(getDayOfWeekById.pending, (state) => {
          state.detail.status = StatusResponse.LOADING;
        })
        .addCase(getDayOfWeekById.rejected, (state, action) => {
          state.detail.status = StatusResponse.ERROR;
          state.detail.message = action.payload as string;
        })
    builder
      .addCase(deleteDayOfWeek.fulfilled, (state) => {
        state.delete.status = StatusResponse.SUCCESS;
      })
      .addCase(deleteDayOfWeek.pending, (state) => {
        state.delete.status = StatusResponse.LOADING;
      })
      .addCase(deleteDayOfWeek.rejected, (state, action) => {
        state.delete.status = StatusResponse.ERROR;
        state.delete.message = action.payload as string;
      })
  },
});
export default dayOfWeekSlice.reducer;
