/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Classes from './NumberButton.module.css';

interface Props {
    number: number;
    index?: number;
    isDraggable?: boolean;
}

const NumberButton: React.FC<Props> = ({ number, index, isDraggable }) =>
    isDraggable && index !== undefined ? (
        <Draggable draggableId={`number-${number}`} index={index}>
            {(provided) => (
                <div
                    className={Classes.number}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {number}
                </div>
            )}
        </Draggable>
    ) : (
        <div className={Classes.number}>{number}</div>
    );

export default NumberButton;
