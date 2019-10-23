import './Course.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import {useAreDishesLoaded} from 'app/common/Hooks';
import {CourseContentLoader} from 'app/common/components/content_loaders/ContentLoaders';
import Animate from 'app/common/components/animate/Animate';
import CourseContent from './course_content/CourseContent';
import RemoveDialog from './remove_dialog/RemoveDialog';

const Course = ({course}) => {
  const [animationIn, setAnimationIn] = useState('fadeInLeft');
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [removeAction, setRemoveAction] = useState(null);
  const areDishesLoaded = useAreDishesLoaded(course.dishes);
  const onClose = action => {
    const resetRemoveAction = () => {
      action();
      setAnimationIn('');
      setRemoveAction(null);
    };

    typeof action === 'function' && setRemoveAction(() => resetRemoveAction); // () => resetRemoveAction to store func
    setIsRemoveDialogOpen(false);
  };

  if (!areDishesLoaded) {
    return <CourseContentLoader/>;
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