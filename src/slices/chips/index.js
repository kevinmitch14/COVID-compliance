import { createSlice } from '@reduxjs/toolkit'
import { current } from 'immer'

export const chipSlice = createSlice({
    name: 'counter',
    initialState: {
        values: {
            Restaurants: { id: 0, category: "Restaurants", active: false, google_name: 'rest' },
            Hotels: { id: 1, category: "Hotel", active: false, google_name: 'lodging' },
            Landmarks: { id: 2, category: "Landmarks", active: false, google_name: 'landmark' },
            'Most Reviewed': { id: 3, category: "Most Reviewed", active: false, google_name: 'reviewed' },
            Bars: { id: 4, category: "Bars", active: false, google_name: 'bar' },
            Retail: { id: 5, category: "Retail", active: false, google_name: 'retail' }
        },
        activeCats: []
    },

    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        onSelect: (state, action) => {
            let newArr = [];
            console.log(current(state.values[action.payload]))
            state.values[action.payload].active = true

            newArr = [...state.activeCats, action.payload]
            newArr = [...new Set(newArr)]
            state.activeCats = newArr

        },
        onRemove: (state, action) => {
            state.values[action.payload].active = false
            let newArr = state.activeCats.filter((item) => item !== action.payload)
            state.activeCats = newArr
        }
    }
})

// Action creators are generated for each case reducer function
export const { incrementByAmount, onSelect, onRemove } = chipSlice.actions

export default chipSlice.reducer