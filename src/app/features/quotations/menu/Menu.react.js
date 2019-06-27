import './Menu.scss';
import separator from 'assets/img/menu-separator.png';
import title from 'assets/img/menu-title-separator.png';
import logo from 'assets/img/menu-logo.png';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getSortedCourseTypes} from 'app/features/quotations/course_type/CourseType.service';
import {getShareMenuLink} from './Menu.service';
import ShareButton from 'app/common/components/share_button/ShareButton.react';
import MenuCourses from './menu_courses/MenuCourses';

class Menu extends React.Component {
  static propTypes = {
    sortedCourseTypes: PropTypes.array.isRequired,
    menu: PropTypes.object,
  };

  render() {
    const {sortedCourseTypes, menu} = this.props;

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
  }
}

const mapStateToProps = state => {
  return {
    sortedCourseTypes: getSortedCourseTypes(state.data.courseTypes),
    menu: state.quotations.quotation.menus.find(menu => menu.isSelected),
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);