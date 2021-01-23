import './Layout.scss';
import loading from 'assets/img/loading-large.gif';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Utils from 'app/common/Utils';
import {useCourseTypes, useDBVersion} from 'app/hooks/data/CourseTypes';
import SelectedDishDialog from './dish/selected_dish_dialog/SelectedDishDialog';
import Header from './header/Header';
import Router from './router/Router';

const Layout = () => {
  const quotation = useSelector(state => state.quotations.quotation);
  const isMenuSelected = !!quotation.menus && !!quotation.menus.find(menu => menu.isSelected);
  const {data: courseTypes} = useCourseTypes();
  useDBVersion(courseTypes);

  useEffect(() => {
    Utils.completeLoading();
  }, []);

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