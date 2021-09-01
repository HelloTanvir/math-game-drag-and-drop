/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import NumberButton from '../numberButton/NumberButton';
import Classes from './NumberPlate.module.css';

const NumberPlate = () => {
    const numbers = useSelector((state: RootState) => state.numbers.numbers);
    const firstSelectedNumberIndex = useSelector(
        (state: RootState) => state.numbers.firstSelectedNumberIndex
    );
    const secondSelectedNumberIndex = useSelector(
        (state: RootState) => state.numbers.secondSelectedNumberIndex
    );

    return (
        <Droppable droppableId="numberPlate" direction="horizontal">
            {(provided) => (
                <div
                    className={Classes.plateGrid}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {numbers.map((number, index) =>
                        index === firstSelectedNumberIndex ||
                        index === secondSelectedNumberIndex ? null : (
                            <NumberButton key={number} number={number} index={index} isDraggable />
                        )
                    )}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default NumberPlate;
