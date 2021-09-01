import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Classes from './Score.module.css';

const Score = () => {
    const score = useSelector((state: RootState) => state.numbers.score);

    return (
        <div className={Classes.score}>
            Your Score: <span className={Classes.point}>{score}</span>
        </div>
    );
};

export default Score;
