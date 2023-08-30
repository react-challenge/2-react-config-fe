import { configureStore } from '@reduxjs/toolkit'

import globalStateReducer from './globalState'

export const store = configureStore({
  reducer: {
    globalState: globalStateReducer,
  },
})