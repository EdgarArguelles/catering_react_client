import React from 'react';
import PropTypes from 'prop-types';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

const DragDrop = ({id, draggableClassName, data, drawContent, onChangePosition}) => {
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    const newResult = [];
    result.forEach((item, index) => {
      if (!item.position) {
        newResult.push({...item});
      }

      newResult.push({...item, position: index + 1});
    });

    return newResult;
  };

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (onChangePosition) {
      const newCourses = reorder(data, result.source.index, result.destination.index);
      onChangePosition(newCourses);
    }
  };

  const getDraggable = item => provided => {
    return (
      <>
        <div ref={provided.innerRef} className={draggableClassName}
             {...provided.draggableProps} {...provided.dragHandleProps}>
          {drawContent(item)}
        </div>
        {provided.placeholder}
      </>
    );
  };

  const getDroppable = () => provided => {
    return (
      <div ref={provided.innerRef}>
        {/* eslint-disable-next-line react/prop-types */}
        {data.map((item, index) => (
          <Draggable key={index} draggableId={`id${index}`} index={index}>
            {getDraggable(item)}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    );
  };

  return (
    <div id={id}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={id}>
          {getDroppable()}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

DragDrop.propTypes = {
  id: PropTypes.string.isRequired,
  draggableClassName: PropTypes.string,
  data: PropTypes.array.isRequired,
  drawContent: PropTypes.func.isRequired,
  onChangePosition: PropTypes.func,
};

export default React.memo(DragDrop);