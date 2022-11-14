import { createSlice } from '@reduxjs/toolkit'

export const issueSlice = createSlice({
    name: 'issue',
    initialState: {
        issueList: {
        },
        commendtedIssuesList: {},
    },

    reducers: {
        AddIssueToList: (state, action) => {
            const tmpList = Object.assign(action.payload, state.issueList)
            state.issueList = Object.keys(state.issueList).length === 0 ? action.payload : tmpList
        },
    },
})

export const {
    AddIssueToList,
} = issueSlice.actions

export default issueSlice.reducer
