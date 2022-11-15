import { createSlice } from '@reduxjs/toolkit'

export const issueSlice = createSlice({
    name: 'issue',
    initialState: {
        issueList: {},
        commendtedIssuesList: {},
        selectedIssue: {},
    },

    reducers: {
        AddIssues: (state, action) => {
            const tmpList = Object.assign(state.issueList, action.payload)
            state.issueList = Object.keys(state.issueList).length === 0 ? action.payload : tmpList
        },
        AddSelectedIssue: (state, action) => {
            state.selectedIssue = {
                ...action.payload,
                comments: [],
            }
        },
        AddCommentToSelectedIssue: (state, action) => {
            state.selectedIssue = {
                ...state.selectedIssue,
                comments: state.selectedIssue.comments.concat(action.payload),
            }
        },
        SaveIssue: (state, action) => {
            state.commendtedIssuesList = Object.assign(state.commendtedIssuesList, { [action.payload.id]: action.payload })
        },
        CleanIssueList: (state) => {
            state.issueList = {}
        },
        CleanSelectedIssue: (state) => {
            state.selectedIssue = {}
        },
    },
})

export const {
    AddIssues,
    AddSelectedIssue,
    AddCommentToSelectedIssue,
    SaveIssue,
    CleanIssueList,
    CleanSelectedIssue,
} = issueSlice.actions

export default issueSlice.reducer
