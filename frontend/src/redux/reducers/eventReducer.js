import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true
}

export const eventReducer = createReducer(initialState, (builder) => {
    builder.addCase('eventCreateRequest', (state) => {
        state.isLoading = true
    })
    .addCase('eventCreateSuccess', (state, action) => {
        state.isLoading = false
        state.event = action.payload
        state.success = true
    })
    .addCase('eventCreateFailed', (state, action) => {
        state.isLoading = false;
        state.error = action.payload
        state.success = false
    })
    .addCase('getAllEventsShopRequest', (state) => {
        state.isLoading = true
    })
    .addCase('getAllEventsShopSuccess', (state, action) => {
        state.isLoading = false 
        state.events = action.payload
    })
    .addCase('getAllEventsShopFailed', (state, action) => {
        state.isLoading = false 
        state.error = action.payload
    })
    .addCase('deleteEventRequest', (state) => {
        state.isLoading = true
    })
    .addCase('deleteEventSuccess', (state, action) => {
        state.isLoading = false,
        state.message = action.payload
    })
    .addCase('deleteEventFailed', (state, action) => {
        state.isLoading = false 
        state.error = action.payload
    })
    .addCase('getAllEventsRequest', (state) => {
        state.isLoading = true
    })
    .addCase('getAllEventsSuccess', (state, action) => {
        state.isLoading = false
        state.allEvents = action.payload
    })
    .addCase("getAllEventsFailed", (state, action) => {
        state.isLoading = false 
        state.error = action.payload
    })
    .addCase("clearErrors", (state) => {
        state.error = null
    })
})