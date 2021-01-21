import './Menu.scss';
import separator from 'assets/img/menu-separator.png';
import title from 'assets/img/menu-title-separator.png';
import logo from 'assets/img/menu-logo.png';
import React from 'react';
import {useSelector} from 'react-redux';
import {useCourseTypes} from 'app/data_hooks/CourseTypes';
import {getSortedCourseTypes} from 'app/features/quotations/course_type/CourseType.service';
import {getShareMenuLink} from './Menu.service';
import ShareButton from 'app/common/components/share_button/ShareButton';
import MenuCourses from './menu_courses/MenuCourses';

const Menu = () => {
  const menu = useSelector(state => state.quotations.quotation.menus.find(m => m.isSelected));
  const {data: courseTypes} = useCourseTypes();
  const sortedCourseTypes = getSortedCourseTypes(courseTypes);

  if (!menu) {
    return null;
  }

  return (
    <div id="menu-view">
      <img id="start-separator" className="edge-separator" src={separator} alt="separator"/>
      <div id="title">
        <p>{menu.name}</p>
        <img src={title} alt="title"/>
      </div>
      {sortedCourseTypes.map(courseType => <MenuCourses key={courseType.id} courseType={courseType}/>)}
      <img id="end-separator" className="edge-separator" src={separator} alt="separator"/>
      <img id="logo" src={logo} alt="logo"/>
      <ShareButton link={getShareMenuLink(menu)} label="Banquetes Areli" hashtag="banquetesareli"
                   description="Diseña el mejor banquete para tu evento"/>
    </div>
  );
};

export default React.memo(Menu);