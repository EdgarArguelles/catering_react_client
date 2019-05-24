import './Course.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import {CourseContentLoader} from '../../../common/components/content_loaders/ContentLoaders.react';
import DishesLoader from '../../../data/dishes/DishesLoader.react';
import CourseContent from './course_content/CourseContent.react';
import RemoveDialog from './remove_dialog/RemoveDialog.react';

export default class Course extends React.Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {isRemoveDialogOpen: false};
  }

  render() {
    const {isRemoveDialogOpen} = this.state;
    const {course} = this.props;

    return (
      <DishesLoader dishes={course.dishes} loader={<CourseContentLoader/>}>
        <div className="course">
          <Card><CourseContent course={course} onActionClick={() => this.setState({isRemoveDialogOpen: true})}/></Card>
          <RemoveDialog course={course} open={isRemoveDialogOpen}
                        onClose={() => this.setState({isRemoveDialogOpen: false})}/>
        </div>
      </DishesLoader>
    );
  }
}