import './Course.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import {useAreDishesLoaded} from 'app/common/Hooks';
import {CourseContentLoader} from 'app/common/components/content_loaders/ContentLoaders';
import CourseContent from './course_content/CourseContent';
import RemoveDialog from './remove_dialog/RemoveDialog';

const Course = ({course}) => {
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const areDishesLoaded = useAreDishesLoaded(course.dishes);

  if (!areDishesLoaded) {
    return <CourseContentLoader/>;
  }

  return (
    <div className="course animated fadeInLeft">
      <Card><CourseContent course={course} onActionClick={() => setIsRemoveDialogOpen(true)}/></Card>
      <RemoveDialog course={course} open={isRemoveDialogOpen} onClose={() => setIsRemoveDialogOpen(false)}/>
    </div>
  );
};

Course.propTypes = {
  course: PropTypes.object.isRequired,
};

export default React.memo(Course);