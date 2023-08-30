import { createSlice } from '@reduxjs/toolkit'

export const globalStateSlice = createSlice({
    name: 'globalState',
    initialState: {
        accountInfo: {},
        count: 0,
    },
    reducers: {
        setAccoutInfo: (state, action) => {
            state.accountInfo = action.payload
        },
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload
        },
    },
})

export const { increment, decrement, incrementByAmount, setAccoutInfo } = globalStateSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount))
    }, 1000)
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.globalState.count
export const selectAccoutInfo = (state) => state.globalState.accountInfo

export default globalStateSlice.reducer
