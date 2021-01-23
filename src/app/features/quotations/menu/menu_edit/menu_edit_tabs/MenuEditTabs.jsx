import './MenuEditTabs.scss';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDollarSign} from '@fortawesome/free-solid-svg-icons';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Utils from 'app/common/Utils';
import {useCourseTypes} from 'app/hooks/data/CourseTypes';
import {getSortedCourseTypes} from 'app/features/quotations/course_type/CourseType.service';
import {resetBarsTop} from 'app/common/components/expand_bar/ExpandBar';
import ExpandTabs from 'app/common/components/expand_bar/expand_tabs/ExpandTabs';
import CourseType from 'app/features/quotations/course_type/CourseType';
import MenuSummary from 'app/features/quotations/menu/menu_summary/MenuSummary';
import {changeMenuTab} from 'app/features/quotations/QuotationsReducer';

const tabsElementId = 'expand-bar';
const slideClassName = 'swipeable';

const MenuEditTabs = () => {
  const dispatch = useDispatch();
  const tab = useSelector(state => state.quotations.selectedTab);
  const selectedMenu = useSelector(state => state.quotations.quotation.menus.find(m => m.isSelected));
  const {data: courseTypes} = useCourseTypes();
  const sortedCourseTypes = getSortedCourseTypes(courseTypes);
  const menuCourses = selectedMenu?.courses;

  const changeTapValue = newValue => {
    if (newValue === sortedCourseTypes.length) {
      Utils.animateIcon('menu-edit-price-icon');
    }
    dispatch(changeMenuTab(newValue));
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
            <FontAwesomeIcon id="menu-edit-price-icon" icon={faDollarSign}/>
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