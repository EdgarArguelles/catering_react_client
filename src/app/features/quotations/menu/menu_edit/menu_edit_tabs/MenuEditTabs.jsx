import './MenuEditTabs.scss';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import {getSortedCourseTypes} from 'app/features/quotations/course_type/CourseType.service';
import {resetBarsTop} from 'app/common/components/expand_bar/ExpandBar';
import ExpandTabs from 'app/common/components/expand_bar/expand_tabs/ExpandTabs';
import CourseType from 'app/features/quotations/course_type/CourseType';
import MenuSummary from 'app/features/quotations/menu/menu_summary/MenuSummary';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

const tabsElementId = 'expand-bar';
const slideClassName = 'swipeable';

const MenuEditTabs = () => {
  const dispatch = useDispatch();
  const tab = useSelector(state => state.quotations.selectedTab);
  const courseTypes = useSelector(state => state.data.courseTypes);
  const selectedMenu = useSelector(state => state.quotations.quotation.menus.find(m => m.isSelected));
  const sortedCourseTypes = getSortedCourseTypes(courseTypes);
  const menuCourses = selectedMenu ? selectedMenu.courses : null;

  const changeTapValue = newValue => {
    dispatch(QuotationsActions.changeMenuTab(newValue));
    resetBarsTop(tabsElementId);
  };

  const getTabLabel = courseType => {
    const courses = menuCourses.filter(course => course.type.id === courseType.id);

    const label = (
      <>
        {courses.length > 0 && <Avatar className="avatar">{courses.length}</Avatar>}
        {courseType.name}
      </>
    );

    return <Tab key={courseType.id} className="course-type-tab" label={label}/>;
  };

  return (
    <div id="menu-edit-tabs">
      <Tabs centered id={tabsElementId} classes={{indicator: 'indicator'}} variant="fullWidth" value={tab}
            onChange={(event, newValue) => changeTapValue(newValue)}>
        {sortedCourseTypes.map(courseType => getTabLabel(courseType))}
        <Tab className="summary-tab" icon={
          <Badge badgeContent={menuCourses.length} invisible={menuCourses.length === 0} color="secondary">
            <i className="fas fa-dollar-sign" aria-hidden="true"/>
          </Badge>
        }/>
      </Tabs>
      <SwipeableViews index={tab} className="swipeable-views" slideClassName={slideClassName}
                      onChangeIndex={changeTapValue}>
        {sortedCourseTypes.map(courseType => (
          <ExpandTabs key={courseType.id} tabsElementId={tabsElementId} slideClassName={slideClassName}>
            <CourseType className="tab-content" courseType={courseType}/>
          </ExpandTabs>
        ))}
        <ExpandTabs tabsElementId={tabsElementId} slideClassName={slideClassName}><MenuSummary/></ExpandTabs>
      </SwipeableViews>
    </div>
  );
};

export default React.memo(MenuEditTabs);