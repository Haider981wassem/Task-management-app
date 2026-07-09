import { createSlice } from "@reduxjs/toolkit";


const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [],
        loading: false
    },
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload.tasks
        },
        clearTasks: (state) => {
            state.tasks = []
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { setTasks, clearTasks, setLoading} = taskSlice.actions
export default taskSlice.reducer