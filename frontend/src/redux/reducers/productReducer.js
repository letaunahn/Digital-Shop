import { createReducer } from "@reduxjs/toolkit";

const inititalState = {
    isLoading: true
}

export const productReducer = createReducer(inititalState, (builder) => {
    builder.addCase('productCreateRequest', (state) => {
        state.isLoading = true
    })
    .addCase('productCreateSuccess', (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.success = true;
    })
    .addCase('productCreateFailed', (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    })
    .addCase('getAllProductsShopRequest', (state) => {
        state.isLoading = true
    })
    .addCase('getAllProductsShopSuccess', (state, action) => {
        state.isLoading = false;
        state.products = action.payload
    })
    .addCase('getAllProductsShopFailed', (state, action) => {
        state.isLoading = false;
        state.error = action.payload
    })
    .addCase('getAllProductsRequest', (state) => {
        state.isLoading = true;
    })
    .addCase('getAllProductsSuccess', (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload
    })
    .addCase('getAllProductsFailed', (state, action) => {
        state.isLoading = false 
        state.error = action.payload
    })
    .addCase('clearErrors', (state) => {
        state.error = null
    })
})