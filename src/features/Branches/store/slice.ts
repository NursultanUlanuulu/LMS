import { Branch } from "../type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusResponse } from "@/shared/enums";
import { getBranchesList, createBranch, updateBranch,deleteBranch } from "./actions";

interface InitialState {
  getBranchesList: {
    status: StatusResponse;
    message?: string;
  };
  create: {
    status: StatusResponse;
    message?: string;
  };
  updateBranch: {
    status: StatusResponse;
    message?: string;
  };
  deleteBranch: {
    status: StatusResponse;
    message?: string;
  };
  branches: Branch[];
}

const initialState: InitialState = {
  getBranchesList: {
    status: StatusResponse.INITIAL,
    message: "string",
  },
  create: {
    status: StatusResponse.INITIAL,
    message: "",
  },
  updateBranch: {
    status: StatusResponse.INITIAL,
    message: "",
  },
  deleteBranch: {
    status: StatusResponse.INITIAL,
    message: "",
  },
  branches: [],
};

export const branchesSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getBranchesList.fulfilled,
        (state, action: PayloadAction<Branch[]>) => {
          state.getBranchesList.status = StatusResponse.SUCCESS;
          state.branches = action.payload;
        }
      )
      .addCase(getBranchesList.pending, (state) => {
        state.getBranchesList.status = StatusResponse.LOADING;
      })
      .addCase(getBranchesList.rejected, (state, action) => {
        state.getBranchesList.status = StatusResponse.ERROR;
        state.getBranchesList.message = action.payload as string;
      }),
      builder
        .addCase(createBranch.fulfilled, (state) => {
          state.create.status = StatusResponse.SUCCESS;
        })
        .addCase(createBranch.pending, (state) => {
          state.create.status = StatusResponse.LOADING;
        })
        .addCase(createBranch.rejected, (state, action) => {
          state.create.status = StatusResponse.ERROR;
          state.create.message = action.payload as string;
        }),
      builder
        .addCase(updateBranch.fulfilled, (state) => {
          state.updateBranch.status = StatusResponse.SUCCESS;
        })
        .addCase(updateBranch.pending, (state) => {
          state.updateBranch.status = StatusResponse.LOADING;
        })
        .addCase(updateBranch.rejected, (state, action) => {
          state.create.status = StatusResponse.ERROR;
          state.updateBranch.message = action.payload as string;
        }),
      builder
        .addCase(deleteBranch.fulfilled, (state) => {
          state.updateBranch.status = StatusResponse.SUCCESS;
        })
        .addCase(deleteBranch.pending, (state) => {
          state.updateBranch.status = StatusResponse.LOADING;
        })
        .addCase(deleteBranch.rejected, (state, action) => {
          state.create.status = StatusResponse.ERROR;
          state.updateBranch.message = action.payload as string;
        });
  },
});

export default branchesSlice.reducer;
