import './Course.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import { useDishesByIds } from 'app/hooks/data/Dishes';
import Animate from 'app/common/components/animate/Animate';
import CourseContent from './course_content/CourseContent';
import RemoveDialog from './remove_dialog/RemoveDialog';

const Course = ({ course }) => {
  const [animationIn, setAnimationIn] = useState('fadeInLeft');
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [removeAction, setRemoveAction] = useState(null);
  const { isAnyFetching } = useDishesByIds(course.dishes.map(dish => dish.id));
  const onClose = action => {
    const resetRemoveAction = () => {
      action();
      setAnimationIn('');
      setRemoveAction(null);
    };

    typeof action === 'function' && setRemoveAction(() => resetRemoveAction); // () => resetRemoveAction to store func
    setIsRemoveDialogOpen(false);
  };

  const getLoading = () => {
    const getRow = () => (<>
      <Skeleton variant="circle" animation="wave" className="row-circle"/>
      <Skeleton variant="text" animation="wave" className="row-text"/>
    </>);

    return (
      <Paper className="course loader">
        <Skeleton variant="circle" animation="wave" className="loader-left"/>
        <div className="loader-center">{getRow()}{getRow()}{getRow()}</div>
        <div className="loader-right">
          <Skeleton variant="text" animation="wave" className="right-text"/>
          <Skeleton variant="circle" animation="wave" className="right-circle"/>
        </div>
      </Paper>
    );
  };

  if (isAnyFetching) {
    return getLoading();
  }

  return (
    <div className="course">
      <Animate show={!removeAction} animationIn={animationIn} animationOut="fadeOutLeft" onUnmount={removeAction}>
        <Card><CourseContent course={course} onActionClick={() => setIsRemoveDialogOpen(true)}/></Card>
      </Animate>
      <RemoveDialog course={course} open={isRemoveDialogOpen} onClose={onClose}/>
    </div>
  );
};

Course.propTypes = {
  course: PropTypes.object.isRequired,
};

export default React.memo(Course);