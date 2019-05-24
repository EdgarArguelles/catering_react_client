import './MenuEditTabs.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import {getSortedCourseTypes} from '../../../course_type/CourseType.service';
import {resetBarsTop} from '../../../../../common/components/expand_bar/ExpandBar.react';
import ExpandTabs from '../../../../../common/components/expand_bar/expand_tabs/ExpandTabs.react';
import CourseType from '../../../course_type/CourseType.react';
import MenuSummary from '../../menu_summary/MenuSummary.react';
import QuotationsActions from '../../../QuotationsActions';

const tabsElementId = 'expand-bar';
const slideClassName = 'swipeable';

class MenuEditTabs extends React.Component {
  static propTypes = {
    tab: PropTypes.number.isRequired,
    sortedCourseTypes: PropTypes.array.isRequired,
    menuCourses: PropTypes.array.isRequired,
    changeTab: PropTypes.func.isRequired,
  };

  changeTapValue = tab => {
    const {changeTab} = this.props;
    changeTab(tab);
    resetBarsTop(tabsElementId);
  };

  getTabLabel = courseType => {
    const {menuCourses} = this.props;
    const courses = menuCourses.filter(course => course.type.id === courseType.id);

    return (
      <React.Fragment>
        {courses.length > 0 && <Avatar className="avatar">{courses.length}</Avatar>}
        {courseType.name}
      </React.Fragment>
    );
  };

  render() {
    const {tab, sortedCourseTypes, menuCourses} = this.props;

    return (
      <div id="menu-edit-tabs">
        <Tabs centered id={tabsElementId} classes={{indicator: 'indicator'}} variant="fullWidth" value={tab}
              onChange={(event, newValue) => this.changeTapValue(newValue)}>
          {sortedCourseTypes.map(courseType => (<Tab key={courseType.id} label={this.getTabLabel(courseType)}/>))}
          <Tab className="summary-tab" icon={
            <Badge badgeContent={menuCourses.length} invisible={menuCourses.length === 0} color="secondary">
              <i className="fas fa-dollar-sign" aria-hidden="true"/>
            </Badge>
          }/>
        </Tabs>
        <SwipeableViews index={tab} className="swipeable-views" slideClassName={slideClassName}
                        onChangeIndex={this.changeTapValue}>
          {sortedCourseTypes.map(courseType => (
            <ExpandTabs key={courseType.id} tabsElementId={tabsElementId} slideClassName={slideClassName}>
              <CourseType className="tab-content" courseType={courseType}/>
            </ExpandTabs>
          ))}
          <ExpandTabs tabsElementId={tabsElementId} slideClassName={slideClassName}><MenuSummary/></ExpandTabs>
        </SwipeableViews>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const selectedMenu = state.quotations.quotation.menus.find(menu => menu.isSelected);

  return {
    tab: state.quotations.selectedTab,
    sortedCourseTypes: getSortedCourseTypes(state.data.courseTypes),
    menuCourses: selectedMenu ? selectedMenu.courses : null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeTab: tab => {
      dispatch(QuotationsActions.changeMenuTab(tab));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuEditTabs);