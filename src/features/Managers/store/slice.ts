import { Manager } from "../type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusResponse } from "@/shared/enums";
import {
  getManagersList,
  createManager,
  updateManager,
  deleteManager,
} from "./actions";

interface InitialState {
  getManagersList: {
    status: StatusResponse;
    message?: string;
  };
  createManager: {
    status: StatusResponse;
    message?: string;
  };
  updateManager: {
    status: StatusResponse;
    message?: string;
  };
  deleteManager: {
    status: StatusResponse;
    message?: string;
  };
  managers: Manager[];
}

const initialState: InitialState = {
  getManagersList: {
    status: StatusResponse.INITIAL,
    message: "string",
  },
  createManager: {
    status: StatusResponse.INITIAL,
    message: "",
  },
  updateManager: {
    status: StatusResponse.INITIAL,
    message: "",
  },
  deleteManager: {
    status: StatusResponse.INITIAL,
    message: "",
  },
  managers: [],
};

export const managersSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getManagersList.fulfilled,
        (state, action: PayloadAction<Manager[]>) => {
          state.getManagersList.status = StatusResponse.SUCCESS;
          state.managers = action.payload;
        }
      )
      .addCase(getManagersList.pending, (state) => {
        state.getManagersList.status = StatusResponse.LOADING;
      })
      .addCase(getManagersList.rejected, (state, action) => {
        state.getManagersList.status = StatusResponse.ERROR;
        state.getManagersList.message = action.payload as string;
      }),
      builder
        .addCase(createManager.fulfilled, (state) => {
          state.createManager.status = StatusResponse.SUCCESS;
        })
        .addCase(createManager.pending, (state) => {
          state.createManager.status = StatusResponse.LOADING;
        })
        .addCase(createManager.rejected, (state, action) => {
          state.createManager.status = StatusResponse.ERROR;
          state.createManager.message = action.payload as string;
        }),
      builder
        .addCase(updateManager.fulfilled, (state) => {
          state.updateManager.status = StatusResponse.SUCCESS;
        })
        .addCase(updateManager.pending, (state) => {
          state.updateManager.status = StatusResponse.LOADING;
        })
        .addCase(updateManager.rejected, (state, action) => {
          state.updateManager.status = StatusResponse.ERROR;
          state.updateManager.message = action.payload as string;
        }),
      builder
        .addCase(deleteManager.fulfilled, (state) => {
          state.deleteManager.status = StatusResponse.SUCCESS;
        })
        .addCase(deleteManager.pending, (state) => {
          state.deleteManager.status = StatusResponse.LOADING;
        })
        .addCase(deleteManager.rejected, (state, action) => {
          state.deleteManager.status = StatusResponse.ERROR;
          state.deleteManager.message = action.payload as string;
        });
  },
});
export default managersSlice.reducer;
