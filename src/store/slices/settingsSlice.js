import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    musicEnabled: true,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleMusic: (state) => {
            state.musicEnabled = !state.musicEnabled;
        },
    },
});

export const { toggleMusic } = settingsSlice.actions;
export const selectMusicEnabled = state => state.settings.musicEnabled;

export default settingsSlice.reducer;
