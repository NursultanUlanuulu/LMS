import { Promoter } from "../type"
import { createSlice } from "@reduxjs/toolkit"
import { StatusResponse } from "@/shared/enums"
import { getPromotersList, createPromoter, updatePromoter, getPromoterById, deletePromoter } from "./actions"
import { IEdit, IGetById } from "@/shared/types"

interface InitialState {
  getList: {
    status: StatusResponse;
    message?: string;
    data: Promoter[];
  };
  create: IEdit
  update: IEdit
  detail: IGetById<Promoter>
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
    data: {} as Promoter
  },
  delete: {
    status: StatusResponse.INITIAL,
    message: "",
  },
};

export const promoterSlice = createSlice({
  name: "promoter",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getPromotersList.fulfilled,
        (state, action) => {
          state.getList.status = StatusResponse.SUCCESS;
          state.getList.data = action.payload;
        }
      )
      .addCase(getPromotersList.pending, (state) => {
        state.getList.status = StatusResponse.LOADING;
      })
      .addCase(getPromotersList.rejected, (state, action) => {
        state.getList.status = StatusResponse.ERROR;
        state.getList.message = action.payload as string;
      }),
      builder
        .addCase(createPromoter.fulfilled, (state) => {
          state.create.status = StatusResponse.SUCCESS;
        })
        .addCase(createPromoter.pending, (state) => {
          state.create.status = StatusResponse.LOADING;
        })
        .addCase(createPromoter.rejected, (state, action) => {
          state.create.status = StatusResponse.ERROR;
          state.create.message = action.payload as string;
        }),
      builder
        .addCase(updatePromoter.fulfilled, (state) => {
          state.update.status = StatusResponse.SUCCESS;
        })
        .addCase(updatePromoter.pending, (state) => {
          state.update.status = StatusResponse.LOADING;
        })
        .addCase(updatePromoter.rejected, (state, action) => {
          state.update.status = StatusResponse.ERROR;
          state.update.message = action.payload as string;
        }),
      builder
        .addCase(getPromoterById.fulfilled, (state, action) => {
          state.detail.status = StatusResponse.SUCCESS;
          state.detail.data = action.payload
        })
        .addCase(getPromoterById.pending, (state) => {
          state.detail.status = StatusResponse.LOADING;
        })
        .addCase(getPromoterById.rejected, (state, action) => {
          state.detail.status = StatusResponse.ERROR;
          state.detail.message = action.payload as string;
        })
    builder
      .addCase(deletePromoter.fulfilled, (state) => {
        state.delete.status = StatusResponse.SUCCESS;
      })
      .addCase(deletePromoter.pending, (state) => {
        state.delete.status = StatusResponse.LOADING;
      })
      .addCase(deletePromoter.rejected, (state, action) => {
        state.delete.status = StatusResponse.ERROR;
        state.delete.message = action.payload as string;
      })
  },
});
export default promoterSlice.reducer;
