/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
    determineCorrectIncorrect,
    generateResultNumber,
    // eslint-disable-next-line prettier/prettier
    selectOperator
} from '../../store/reducers/numberSlice';
import { RootState } from '../../store/store';
import NumberButton from '../numberButton/NumberButton';
import Classes from './CalculatorPlate.module.css';

const CalculatorPlate = () => {
    const firstSelectedNumberIndex = useSelector(
        (state: RootState) => state.numbers.firstSelectedNumberIndex
    );
    const secondSelectedNumberIndex = useSelector(
        (state: RootState) => state.numbers.secondSelectedNumberIndex
    );
    const numbers = useSelector((state: RootState) => state.numbers.numbers);
    const operator = useSelector((state: RootState) => state.numbers.operator);
    const resultNumber = useSelector((state: RootState) => state.numbers.resultNumber);
    const score = useSelector((state: RootState) => state.numbers.score);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(selectOperator());

        const getRandomNumber = () => Math.floor(Math.random() * (9 - 0 + 1)) + 0;

        const numberOne = getRandomNumber();
        let numberTwo = getRandomNumber();

        if (numberOne === numberTwo) {
            if (numberTwo + 1 > 9) {
                numberTwo -= 1;
            } else {
                numberTwo += 1;
            }
        }

        let number = numberOne + numberTwo;

        if (operator === '-') {
            number = numberOne - numberTwo;
        } else if (operator === 'x') {
            number = numberOne * numberTwo;
        } else if (operator === '/') {
            number = Math.floor(numberOne / numberTwo);
        }

        dispatch(generateResultNumber({ number }));
    }, [dispatch, operator, score]);

    useEffect(() => {
        if (
            firstSelectedNumberIndex !== undefined &&
            secondSelectedNumberIndex !== undefined &&
            resultNumber !== undefined
        ) {
            const numberOne = numbers[firstSelectedNumberIndex];
            const numberTwo = numbers[secondSelectedNumberIndex];

            let answer = numberOne + numberTwo;

            if (operator === '-') {
                answer = numberOne - numberTwo;
            } else if (operator === 'x') {
                answer = numberOne * numberTwo;
            } else if (operator === '/') {
                answer = Math.floor(numberOne / numberTwo);
            }

            dispatch(determineCorrectIncorrect({ answer, question: resultNumber }));
        }
    }, [
        dispatch,
        firstSelectedNumberIndex,
        numbers,
        operator,
        resultNumber,
        secondSelectedNumberIndex,
    ]);

    return (
        <div className={Classes.plate}>
            <div className={`${Classes.quesContainer}`}>
                <Droppable droppableId="numberContainer-1">
                    {(provided) => (
                        <span
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={Classes.numberContainer}
                        >
                            {firstSelectedNumberIndex !== undefined ? (
                                <NumberButton
                                    number={numbers[firstSelectedNumberIndex]}
                                    index={firstSelectedNumberIndex}
                                />
                            ) : null}
                            {provided.placeholder}
                        </span>
                    )}
                </Droppable>

                <span className={Classes.operator}>{operator}</span>

                <Droppable droppableId="numberContainer-2">
                    {(provided) => (
                        <span
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={Classes.numberContainer}
                        >
                            {secondSelectedNumberIndex !== undefined ? (
                                <NumberButton
                                    number={numbers[secondSelectedNumberIndex]}
                                    index={secondSelectedNumberIndex}
                                />
                            ) : null}
                            {provided.placeholder}
                        </span>
                    )}
                </Droppable>
            </div>

            <span className={Classes.equal}> = </span>

            <div>
                <span className={Classes.numberContainer}>
                    {resultNumber !== undefined ? <NumberButton number={resultNumber} /> : null}
                </span>
            </div>
        </div>
    );
};

export default CalculatorPlate;
