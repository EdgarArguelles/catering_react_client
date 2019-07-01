import './Layout.scss';
import loading from 'assets/img/loading-large.gif';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {completeLoading} from 'app/Template';
import SelectedDishDialog from './dish/selected_dish_dialog/SelectedDishDialog';
import Header from './header/Header';
import Router from './router/Router';
import CourseTypesActions from 'app/data/course_types/CourseTypesActions';
import DataActions from 'app/data/DataActions';

const Layout = () => {
  const dispatch = useDispatch();
  const dataVersion = useSelector(state => state.data.version);
  const courseTypes = useSelector(state => state.data.courseTypes);
  const quotation = useSelector(state => state.quotations.quotation);
  const isMenuSelected = !!quotation.menus && !!quotation.menus.find(menu => menu.isSelected);

  useEffect(() => {
    if (!courseTypes) {
      const fetchCourseTypesTry = async call => {
        try {
          const json = await dispatch(CourseTypesActions.fetchCourseTypes());
          if (json.metaData.version !== dataVersion) {
            dispatch(DataActions.changeVersion(json.metaData.version));
          }
        } catch (error) {
          if (call < 5) {
            fetchCourseTypesTry(call + 1);
          } else {
            const courseTypesCached = window.localStorage.getItem('courseTypesCached');
            if (courseTypesCached) {
              dispatch(CourseTypesActions.setCourseTypes(JSON.parse(courseTypesCached)));
            }
          }
        }
      };

      fetchCourseTypesTry(0);
    }

    completeLoading();
    if (document.getElementById('mobile-nav-toggle')) {
      document.getElementById('mobile-nav-toggle').classList.add('mobile-nav-hidden');
    }
  }, [courseTypes, dataVersion, dispatch]);

  if (!courseTypes) {
    return <div id="loading"><img src={loading} alt="loading"/><h1>Esperando conexión con el servidor.</h1></div>;
  }

  return (
    <div id="layout">
      <Header/>
      <Router isMenuSelected={isMenuSelected}/>
      <SelectedDishDialog/>
    </div>
  );
};

export default React.memo(Layout);