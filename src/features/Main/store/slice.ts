import { Debtors, Pending, Trial, Unrecorded } from './../type';
import { IList, IListTable } from '@/shared/types/index';
import { createSlice } from "@reduxjs/toolkit"
import { IEdit, IGetById } from "@/shared/types"
import { StatusResponse } from '@/shared/enums';
import { deleteFromTrialsList, getDebtorsList, getPendingsList, getTrialsList, getUnrecordedList } from './actions';

interface InitialState {
  listPendings: IList<Pending>
  listDebtors: IList<Debtors>
  listTrials: IList<Trial>
  listUnrecorded: IList<Unrecorded>
  deleteTrials: IEdit

}

const initialState: InitialState = {
  listPendings: {
    data: [] as Pending[],
    amount: 0,
    limit: 0,
    pagesCount: 0,
    message: "",
    status: StatusResponse.INITIAL,
  },
  listDebtors: {
    data: [] as Debtors[],
    amount: 0,
    limit: 0,
    pagesCount: 0,
    message: "",
    status: StatusResponse.INITIAL,
  },
  listTrials: {
    data: [] as Trial[],
    amount: 0,
    limit: 0,
    pagesCount: 0,
    message: "",
    status: StatusResponse.INITIAL,
  },
  listUnrecorded: {
    data: [] as Unrecorded[],
    amount: 0,
    limit: 0,
    pagesCount: 0,
    message: "",
    status: StatusResponse.INITIAL,
  },
  deleteTrials: {
    status: StatusResponse.INITIAL
  }
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getPendingsList.fulfilled,
        (state, action) => {
          state.listPendings.status = StatusResponse.SUCCESS;
          state.listPendings.data = action.payload.data as unknown as Pending[];
          state.listPendings.amount = action.payload.amount;
          state.listPendings.limit = action.payload.limit;
          state.listPendings.pagesCount = action.payload.pagesCount;
        }
      )
      .addCase(getPendingsList.pending, (state) => {
        state.listPendings.status = StatusResponse.LOADING;
      })
      .addCase(getPendingsList.rejected, (state, action) => {
        state.listPendings.status = StatusResponse.ERROR;
        state.listPendings.message = action.payload as string;
      }),
      builder
        .addCase(
          getDebtorsList.fulfilled,
          (state, action) => {
            state.listDebtors.status = StatusResponse.SUCCESS;
            state.listDebtors.data = action.payload.data as unknown as Debtors[];
            state.listDebtors.amount = action.payload.amount;
            state.listDebtors.limit = action.payload.limit;
            state.listDebtors.pagesCount = action.payload.pagesCount;
          }
        )
        .addCase(getDebtorsList.pending, (state) => {
          state.listDebtors.status = StatusResponse.LOADING;
        })
        .addCase(getDebtorsList.rejected, (state, action) => {
          state.listDebtors.status = StatusResponse.ERROR;
          state.listDebtors.message = action.payload as string;
        }),
      builder
        .addCase(
          getTrialsList.fulfilled,
          (state, action) => {
            state.listTrials.status = StatusResponse.SUCCESS;
            state.listTrials.data = action.payload.data as unknown as Trial[];
            state.listTrials.amount = action.payload.amount;
            state.listTrials.limit = action.payload.limit;
            state.listTrials.pagesCount = action.payload.pagesCount;
          }
        )
        .addCase(getTrialsList.pending, (state) => {
          state.listTrials.status = StatusResponse.LOADING;
        })
        .addCase(getTrialsList.rejected, (state, action) => {
          state.listTrials.status = StatusResponse.ERROR;
          state.listTrials.message = action.payload as string;
        }),
      builder
        .addCase(
          getUnrecordedList.fulfilled,
          (state, action) => {
            state.listUnrecorded.status = StatusResponse.SUCCESS;
            state.listUnrecorded.data = action.payload.data as unknown as Unrecorded[];
            state.listUnrecorded.amount = action.payload.amount;
            state.listUnrecorded.limit = action.payload.limit;
            state.listUnrecorded.pagesCount = action.payload.pagesCount;
          }
        )
        .addCase(getUnrecordedList.pending, (state) => {
          state.listUnrecorded.status = StatusResponse.LOADING;
        })
        .addCase(getUnrecordedList.rejected, (state, action) => {
          state.listUnrecorded.status = StatusResponse.ERROR;
          state.listUnrecorded.message = action.payload as string;
        }),
      builder
        .addCase(
          deleteFromTrialsList.fulfilled,
          (state) => {
            state.deleteTrials.status = StatusResponse.SUCCESS
          }
        )
        .addCase(deleteFromTrialsList.pending, (state) => {
          state.deleteTrials.status = StatusResponse.LOADING;
        })
        .addCase(deleteFromTrialsList.rejected, (state, action) => {
          state.deleteTrials.status = StatusResponse.ERROR;
        })
  },
});
export default mainSlice.reducer;
