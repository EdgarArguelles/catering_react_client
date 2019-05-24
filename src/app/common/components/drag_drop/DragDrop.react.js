import React from 'react';
import PropTypes from 'prop-types';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

export default class DragDrop extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    draggableClassName: PropTypes.string,
    data: PropTypes.array.isRequired,
    drawContent: PropTypes.func.isRequired,
    onChangePosition: PropTypes.func,
  };

  reorder = (list, startIndex, endIndex) => {
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

  onDragEnd = result => {
    const {data, onChangePosition} = this.props;
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (onChangePosition) {
      const newCourses = this.reorder(data, result.source.index, result.destination.index);
      onChangePosition(newCourses);
    }
  };

  getDroppable = () => provided => {
    const {data} = this.props;

    return (
      <div ref={provided.innerRef}>
        {data.map((item, index) => (
          <Draggable key={index} draggableId={`id${index}`} index={index}>
            {this.getDraggable(item)}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    );
  };

  getDraggable = item => provided => {
    const {draggableClassName, drawContent} = this.props;

    return (
      <React.Fragment>
        <div ref={provided.innerRef} className={draggableClassName}
             {...provided.draggableProps} {...provided.dragHandleProps}>
          {drawContent(item)}
        </div>
        {provided.placeholder}
      </React.Fragment>
    );
  };

  render() {
    const {id} = this.props;

    return (
      <div id={id}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId={id}>
            {this.getDroppable()}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}