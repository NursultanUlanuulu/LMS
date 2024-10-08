import { StatusResponse } from '@/shared/enums'
import { IEdit, IGetById, IList } from '@/shared/types'
import { createSlice } from '@reduxjs/toolkit'
import { Graduated, Student, TrialLessons } from '../types'
import {
	addCommentStudent,
	addDebtorSum,
	addStudentToBlacklist,
	addStudentToGroup,
	addToPending,
	changePriceOfStudGroup,
	createStudent,
	deleteFromGroup,
	deleteStudent,
	getGraduated,
	getMoneyForBook,
	getStudentById,
	getStudentsList,
	getTrialLessons,
	transferPayment,
	updateStudent,
} from './actions'

interface InitialState {
	list: IList<Student>
	create: IEdit
	update: IEdit
	detail: IGetById<Student>
	delete: IEdit
	addToGroup: IEdit
	addToBlackList: IEdit
	transferPayment: IEdit
	addComment: IEdit
	addToPending: IEdit
	addDebtorSum: IEdit
	addToTrial: IEdit
	getMoneyForBook: IEdit
	deleteFromGroup: IEdit
	changePriceOfStudGroup: IEdit
	trialLessons: IList<TrialLessons>
	graduated: IList<Graduated>
}

const initialState: InitialState = {
	list: {
		data: [] as Student[],
		amount: 0,
		limit: 0,
		pagesCount: 0,
		message: '',
		status: StatusResponse.INITIAL,
	},
	trialLessons: {
		data: [] as TrialLessons[],
		amount: 0,
		limit: 0,
		pagesCount: 0,
		message: '',
		status: StatusResponse.INITIAL,
	},
	create: {
		status: StatusResponse.INITIAL,
		message: '',
	},
	update: {
		status: StatusResponse.INITIAL,
		message: '',
	},
	detail: {
		status: StatusResponse.INITIAL,
		message: '',
		data: {} as Student,
	},
	addToTrial: {
		status: StatusResponse.INITIAL,
		message: '',
	},
	delete: {
		status: StatusResponse.INITIAL,
		message: '',
	},
	addDebtorSum: {
		status: StatusResponse.INITIAL,
		message: '',
	},
	addToGroup: {
		status: StatusResponse.INITIAL,
		message: '',
	},
	addToBlackList: {
		status: StatusResponse.INITIAL,
		message: '',
	},
	transferPayment: {
		status: StatusResponse.INITIAL,
		message: '',
	},
	addComment: {
		status: StatusResponse.INITIAL,
		message: '',
	},
	addToPending: {
		status: StatusResponse.INITIAL,
		message: '',
	},
	getMoneyForBook: {
		status: StatusResponse.INITIAL,
		message: '',
	},
	deleteFromGroup: {
		status: StatusResponse.INITIAL,
		message: '',
	},
	changePriceOfStudGroup: {
		status: StatusResponse.INITIAL,
		message: '',
	},
	graduated: {
		data: [] as Graduated[],
		amount: 0,
		limit: 0,
		pagesCount: 0,
		message: '',
		status: StatusResponse.INITIAL,
	},
}

export const studentsSlice = createSlice({
	name: 'students',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getStudentsList.fulfilled, (state, action) => {
				state.list.status = StatusResponse.SUCCESS
				state.list.data = action.payload.data as unknown as Student[]
				state.list.amount = action.payload.amount
				state.list.limit = action.payload.limit
				state.list.pagesCount = action.payload.pagesCount
			})
			.addCase(getStudentsList.pending, state => {
				state.list.status = StatusResponse.LOADING
			})
			.addCase(getStudentsList.rejected, (state, action) => {
				state.list.status = StatusResponse.ERROR
				state.list.message = action.payload as string
			}),
			builder
				.addCase(createStudent.fulfilled, state => {
					state.create.status = StatusResponse.SUCCESS
				})
				.addCase(createStudent.pending, state => {
					state.create.status = StatusResponse.LOADING
				})
				.addCase(createStudent.rejected, (state, action) => {
					state.create.status = StatusResponse.ERROR
					state.create.message = action.payload as string
				}),
			builder
				.addCase(updateStudent.fulfilled, state => {
					state.update.status = StatusResponse.SUCCESS
				})
				.addCase(updateStudent.pending, state => {
					state.update.status = StatusResponse.LOADING
				})
				.addCase(updateStudent.rejected, (state, action) => {
					state.update.status = StatusResponse.ERROR
					state.update.message = action.payload as string
				}),
			builder
				.addCase(getStudentById.fulfilled, (state, action) => {
					state.detail.status = StatusResponse.SUCCESS
					state.detail.data = action.payload
				})
				.addCase(getStudentById.pending, state => {
					state.detail.status = StatusResponse.LOADING
				})
				.addCase(getStudentById.rejected, (state, action) => {
					state.detail.status = StatusResponse.ERROR
					state.detail.message = action.payload as string
				})
		builder
			.addCase(deleteStudent.fulfilled, state => {
				state.delete.status = StatusResponse.SUCCESS
			})
			.addCase(deleteStudent.pending, state => {
				state.delete.status = StatusResponse.LOADING
			})
			.addCase(deleteStudent.rejected, (state, action) => {
				state.delete.status = StatusResponse.ERROR
				state.delete.message = action.payload as string
			}),
			builder
				.addCase(addStudentToGroup.fulfilled, state => {
					state.addToGroup.status = StatusResponse.SUCCESS
				})
				.addCase(addStudentToGroup.pending, state => {
					state.addToGroup.status = StatusResponse.LOADING
				})
				.addCase(addStudentToGroup.rejected, (state, action) => {
					state.addToGroup.status = StatusResponse.ERROR
					state.addToGroup.message = action.payload as string
				}),
			builder
				.addCase(addStudentToBlacklist.fulfilled, state => {
					state.addToBlackList.status = StatusResponse.SUCCESS
				})
				.addCase(addStudentToBlacklist.pending, state => {
					state.addToBlackList.status = StatusResponse.LOADING
				})
				.addCase(addStudentToBlacklist.rejected, (state, action) => {
					state.addToBlackList.status = StatusResponse.ERROR
					state.addToBlackList.message = action.payload as string
				}),
			builder
				.addCase(transferPayment.fulfilled, state => {
					state.transferPayment.status = StatusResponse.SUCCESS
				})
				.addCase(transferPayment.pending, state => {
					state.transferPayment.status = StatusResponse.LOADING
				})
				.addCase(transferPayment.rejected, (state, action) => {
					state.transferPayment.status = StatusResponse.ERROR
					state.transferPayment.message = action.payload as string
				}),
			builder
				.addCase(addCommentStudent.fulfilled, state => {
					state.addComment.status = StatusResponse.SUCCESS
				})
				.addCase(addCommentStudent.pending, state => {
					state.addComment.status = StatusResponse.LOADING
				})
				.addCase(addCommentStudent.rejected, (state, action) => {
					state.addComment.status = StatusResponse.ERROR
					state.addComment.message = action.payload as string
				}),
			builder
				.addCase(addDebtorSum.fulfilled, state => {
					state.addDebtorSum.status = StatusResponse.SUCCESS
				})
				.addCase(addDebtorSum.pending, state => {
					state.addDebtorSum.status = StatusResponse.LOADING
				})
				.addCase(addDebtorSum.rejected, (state, action) => {
					state.addDebtorSum.status = StatusResponse.ERROR
					state.addDebtorSum.message = action.payload as string
				}),
			builder
				.addCase(addToPending.fulfilled, state => {
					state.addToPending.status = StatusResponse.SUCCESS
				})
				.addCase(addToPending.pending, state => {
					state.addToPending.status = StatusResponse.LOADING
				})
				.addCase(addToPending.rejected, (state, action) => {
					state.addToPending.status = StatusResponse.ERROR
					state.addToPending.message = action.payload as string
				}),
			builder
				.addCase(getMoneyForBook.fulfilled, state => {
					state.getMoneyForBook.status = StatusResponse.SUCCESS
				})
				.addCase(getMoneyForBook.pending, state => {
					state.getMoneyForBook.status = StatusResponse.LOADING
				})
				.addCase(getMoneyForBook.rejected, (state, action) => {
					state.getMoneyForBook.status = StatusResponse.ERROR
					state.getMoneyForBook.message = action.payload as string
				}),
			builder
				.addCase(deleteFromGroup.fulfilled, state => {
					state.deleteFromGroup.status = StatusResponse.SUCCESS
				})
				.addCase(deleteFromGroup.pending, state => {
					state.deleteFromGroup.status = StatusResponse.LOADING
				})
				.addCase(deleteFromGroup.rejected, (state, action) => {
					state.deleteFromGroup.status = StatusResponse.ERROR
					state.deleteFromGroup.message = action.payload as string
				}),
			builder
				.addCase(changePriceOfStudGroup.fulfilled, state => {
					state.changePriceOfStudGroup.status = StatusResponse.SUCCESS
				})
				.addCase(changePriceOfStudGroup.pending, state => {
					state.changePriceOfStudGroup.status = StatusResponse.LOADING
				})
				.addCase(changePriceOfStudGroup.rejected, (state, action) => {
					state.changePriceOfStudGroup.status = StatusResponse.ERROR
					state.changePriceOfStudGroup.message = action.payload as string
				}),
			builder
				.addCase(getTrialLessons.fulfilled, (state, action) => {
					state.trialLessons.status = StatusResponse.SUCCESS
					state.trialLessons.data = action.payload
						.data as unknown as TrialLessons[]
					state.trialLessons.amount = action.payload.amount
					state.trialLessons.limit = action.payload.limit
					state.trialLessons.pagesCount = action.payload.pagesCount
				})
				.addCase(getTrialLessons.pending, state => {
					state.trialLessons.status = StatusResponse.LOADING
				})
				.addCase(getTrialLessons.rejected, (state, action) => {
					state.trialLessons.status = StatusResponse.ERROR
					state.trialLessons.message = action.payload as string
				}),
			builder
				.addCase(getGraduated.fulfilled, (state, action) => {
					state.graduated.status = StatusResponse.SUCCESS
					state.graduated.data = action.payload.data as unknown as Graduated[]
					state.graduated.amount = action.payload.amount
					state.graduated.limit = action.payload.limit
					state.graduated.pagesCount = action.payload.pagesCount
				})
				.addCase(getGraduated.pending, state => {
					state.graduated.status = StatusResponse.LOADING
				})
				.addCase(getGraduated.rejected, (state, action) => {
					state.graduated.status = StatusResponse.ERROR
					state.graduated.message = action.payload as string
				})
	},
})
export default studentsSlice.reducer
