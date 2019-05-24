import './Layout.scss';
import loading from '../../../assets/img/loading-large.gif';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {completeLoading} from '../../Template';
import SelectedDishDialog from './dish/selected_dish_dialog/SelectedDishDialog.react';
import Header from './header/Header.react';
import Router from './router/Router.react';
import CourseTypesActions from '../../data/course_types/CourseTypesActions';
import DataActions from '../../data/DataActions';

class Layout extends React.Component {
  static propTypes = {
    dataVersion: PropTypes.number,
    courseTypes: PropTypes.object,
    isMenuSelected: PropTypes.bool.isRequired,
    fetchCourseTypes: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const {dataVersion, courseTypes, fetchCourseTypes} = this.props;

    completeLoading();
    if (!courseTypes) {
      fetchCourseTypes(dataVersion);
    }
  }

  componentDidMount() {
    if (document.getElementById('mobile-nav-toggle')) {
      document.getElementById('mobile-nav-toggle').classList.add('mobile-nav-hidden');
    }
  }

  render() {
    const {courseTypes, isMenuSelected} = this.props;

    if (!courseTypes) {
      return <div id="loading"><img src={loading}/><h1>Esperando conexión con el servidor.</h1></div>;
    }

    return (
      <div id="layout">
        <Header/>
        <Router isMenuSelected={isMenuSelected}/>
        <SelectedDishDialog/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const quotation = state.quotations.quotation;

  return {
    dataVersion: state.data.version,
    courseTypes: state.data.courseTypes,
    isMenuSelected: !!quotation.menus && !!quotation.menus.find(menu => menu.isSelected),
  };
};

const mapDispatchToProps = dispatch => {
  const fetchCourseTypesTry = async (dataVersion, call) => {
    try {
      const json = await dispatch(CourseTypesActions.fetchCourseTypes());
      if (json.metaData.version !== dataVersion) {
        dispatch(DataActions.changeVersion(json.metaData.version));
      }
    } catch (error) {
      if (call < 5) {
        fetchCourseTypesTry(dataVersion, call + 1);
      } else {
        const courseTypesCached = window.localStorage.getItem('courseTypesCached');
        if (courseTypesCached) {
          dispatch(CourseTypesActions.setCourseTypes(JSON.parse(courseTypesCached)));
        }
      }
    }
  };

  return {
    fetchCourseTypes: dataVersion => {
      fetchCourseTypesTry(dataVersion, 0);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);