import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import Container from './components/container/Container';
import { rearrange, selectFirstNumber, selectSecondNumber } from './store/reducers/numberSlice';

const App = () => {
    const dispatch = useDispatch();

    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (
            !destination ||
            (destination.droppableId === source.droppableId && destination.index === source.index)
        ) {
            return;
        }

        if (destination.droppableId === 'numberPlate') {
            dispatch(rearrange({ sourceIndex: source.index, destinationIndex: destination.index }));
        } else if (destination.droppableId === 'numberContainer-1') {
            dispatch(selectFirstNumber({ index: source.index }));
        } else if (destination.droppableId === 'numberContainer-2') {
            dispatch(selectSecondNumber({ index: source.index }));
        }

        if (source.droppableId === 'numberContainer-1') {
            dispatch(selectFirstNumber({ index: undefined }));
        } else if (source.droppableId === 'numberContainer-2') {
            dispatch(selectSecondNumber({ index: undefined }));
        }
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Container />
        </DragDropContext>
    );
};

export default App;
