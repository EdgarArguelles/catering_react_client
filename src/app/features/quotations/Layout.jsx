import './Layout.scss';
import loading from 'assets/img/loading-large.gif';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Utils from 'app/common/Utils';
import SelectedDishDialog from './dish/selected_dish_dialog/SelectedDishDialog';
import Header from './header/Header';
import Router from './router/Router';
import {fetchCourseTypes, setCourseTypesData} from 'app/data/course_types/CourseTypesReducer';
import {changeVersion} from 'app/data/DataReducer';

const Layout = () => {
  const dispatch = useDispatch();
  const dataVersion = useSelector(state => state.data.version);
  const courseTypes = useSelector(state => state.data.courseTypes.data);
  const quotation = useSelector(state => state.quotations.quotation);
  const isMenuSelected = !!quotation.menus && !!quotation.menus.find(menu => menu.isSelected);

  useEffect(() => {
    if (!courseTypes) {
      const fetchCourseTypesTry = async call => {
        try {
          const json = await dispatch(fetchCourseTypes());
          if (json.error) {
            throw json.error;
          }
          if (json.payload.metaData.version !== dataVersion) {
            dispatch(changeVersion(json.payload.metaData.version));
          }
        } catch (error) {
          if (call < 5) {
            fetchCourseTypesTry(call + 1);
          } else {
            const courseTypesCached = window.localStorage.getItem('courseTypesCached');
            if (courseTypesCached) {
              dispatch(setCourseTypesData(JSON.parse(courseTypesCached)));
            }
          }
        }
      };

      fetchCourseTypesTry(0);
    }

    Utils.completeLoading();
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