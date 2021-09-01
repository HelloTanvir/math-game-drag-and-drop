/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const operators = ['+', '-', 'x', '/'];

const initialState: {
    numbers: number[];
    firstSelectedNumberIndex?: number;
    secondSelectedNumberIndex?: number;
    operator: string;
    resultNumber?: number;
    checkAnswer?: string;
    score: number;
} = { numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], operator: '', score: 0 };

export const numberSlice = createSlice({
    name: 'number',
    initialState,
    reducers: {
        rearrange: (
            state,
            action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>
        ) => {
            [
                state.numbers[action.payload.sourceIndex],
                state.numbers[action.payload.destinationIndex],
            ] = [
                state.numbers[action.payload.destinationIndex],
                state.numbers[action.payload.sourceIndex],
            ];
        },

        selectFirstNumber: (state, action: PayloadAction<{ index?: number }>) => {
            state.firstSelectedNumberIndex = action.payload.index;
        },

        selectSecondNumber: (state, action: PayloadAction<{ index?: number }>) => {
            state.secondSelectedNumberIndex = action.payload.index;
        },

        selectOperator: {
            reducer: (state, action: PayloadAction<{ operator: string }>) => {
                state.operator = action.payload.operator;
            },
            prepare: () => {
                // random integer btwn min & max where both are included
                // Math.floor(Math.random() * (max - min + 1)) + min;
                const index = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
                const operator = operators[index];
                return { payload: { operator } };
            },
        },

        generateResultNumber: (state, action: PayloadAction<{ number: number }>) => {
            state.resultNumber = action.payload.number;
        },

        determineCorrectIncorrect: (
            state,
            action: PayloadAction<{ answer: number; question: number }>
        ) => {
            if (action.payload.answer === action.payload.question) {
                state.checkAnswer = 'correct';
                // eslint-disable-next-line no-plusplus
                state.score++;
                state.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                state.firstSelectedNumberIndex = undefined;
                state.secondSelectedNumberIndex = undefined;
            } else {
                state.checkAnswer = 'incorrect';
            }
        },
    },
});

export const {
    rearrange,
    selectFirstNumber,
    selectSecondNumber,
    selectOperator,
    generateResultNumber,
    determineCorrectIncorrect,
} = numberSlice.actions;

const numberReducer = numberSlice.reducer;

export default numberReducer;
