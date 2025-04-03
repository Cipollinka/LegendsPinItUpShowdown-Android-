import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [
        '⚽ Football (Soccer)',
        '🏀 Basketball',
        '🎾 Tennis',
        '🏃 Athletics',
        '🥊 Combat Sports',
        '⭐ Custom Legends',
    ],
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
});

export const selectCategories = (state) => state.categories.categories;
export default categoriesSlice.reducer;
