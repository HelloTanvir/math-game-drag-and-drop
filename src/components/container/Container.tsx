import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CalculatorPlate from '../calculatorPlate/CalculatorPlate';
import NumberPlate from '../numberPlate/NumberPlate';
import Score from '../score/Score';
import Classes from './Container.module.css';

const Container = () => {
    const checkAnswer = useSelector((state: RootState) => state.numbers.checkAnswer);
    const score = useSelector((state: RootState) => state.numbers.score);

    const [remainingTime, setRemainingTime] = useState(60);

    const getRemainingTime = () => setRemainingTime((prev) => prev - 1);

    useEffect(() => {
        if (remainingTime < 1) {
            return;
        }
        const intervalId = setInterval(getRemainingTime, 1000);
        // eslint-disable-next-line consistent-return
        return () => clearInterval(intervalId);
    }, [remainingTime]);

    return remainingTime > 0 ? (
        <div className={Classes.container}>
            {checkAnswer ? (
                <div
                    className={`${Classes.resultMsg} ${
                        checkAnswer === 'correct' ? Classes.resultSuccess : Classes.resultFail
                    }`}
                >
                    {checkAnswer}
                </div>
            ) : null}

            <CalculatorPlate />

            <Score />

            <NumberPlate />

            <div className={`${Classes.timeLeft}`}>time left: {remainingTime} seconds</div>
        </div>
    ) : (
        <span className={Classes.finish}>your score - {score}</span>
    );
};

export default Container;
