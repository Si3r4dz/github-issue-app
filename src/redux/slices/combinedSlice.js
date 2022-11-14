/* eslint-disable import/no-named-as-default */
import { combineReducers } from '@reduxjs/toolkit';
import issueSlice from './issueSlice';

const rootReducer = combineReducers({
    issue: issueSlice,
})

export default rootReducer
