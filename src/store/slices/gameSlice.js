import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    teams: [],
    numRounds: 0,
    timePerTurn: 60,
    currentRound: 0,
    currentTeamIndex: 0,
    scores: [],
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, action) => {
            const { teams, numRounds, timePerTurn } = action.payload;
            state.teams = teams;
            state.numRounds = numRounds;
            state.timePerTurn = timePerTurn;
            state.currentRound = 0;
            state.currentTeamIndex = 0;
            state.scores = Array.from({ length: numRounds }, () => Array(teams.length).fill(0));
        },
        finishTurn: (state, action) => {
            const wasCorrect = action.payload;
            if (wasCorrect) {
                state.scores[state.currentRound][state.currentTeamIndex] += 1;
            }
            if (state.currentTeamIndex < state.teams.length - 1) {
                state.currentTeamIndex += 1;
            } else {
                state.currentTeamIndex = 0;
                state.currentRound += 1;
            }
        },
    },
});

export const { startGame, finishTurn } = gameSlice.actions;
export const selectTeams = (state) => state.game.teams;
export const selectNumRounds = (state) => state.game.numRounds;
export const selectTimePerTurn = (state) => state.game.timePerTurn;
export const selectCurrentRound = (state) => state.game.currentRound;
export const selectCurrentTeamIndex = (state) => state.game.currentTeamIndex;
export const selectScores = (state) => state.game.scores;
export default gameSlice.reducer;
