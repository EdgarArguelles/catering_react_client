import './Navigation.scss';
import Logo from 'assets/img/logo.svg';
import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import IconButton from '@material-ui/core/IconButton';
import History from 'app/router/History';
import Utils from 'app/common/Utils';

const Navigation = () => {
  const timeout = useRef(null); // don't initialize timeout to null each render
  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []); // Clean timeout on Unmount

  const navigation = useSelector(state => state.quotations.navigation);
  const latestNavigation = useRef(navigation);
  const processed = useRef(false);
  useEffect(() => {
    if (navigation.title === '') {
      Utils.animateIcon('navigation-logo', {strokeWidth: 1, duration: 75, animation: 'delayed'});
    }
  }, [navigation.title]);

  useEffect(() => {
    if (latestNavigation.current.closeDialog !== navigation.closeDialog
      || latestNavigation.current.backLink !== navigation.backLink) {
      // overwrite browser back button only when closeDialog or backLink change
      window.onpopstate = () => {
        // prevent onpopstate trigger twice
        if (!processed.current) {
          processed.current = true;
          if (navigation.closeDialog) {
            navigation.closeDialog();
            History.go(1);
          } else {
            History.navigate(navigation.backLink);
          }

          clearTimeout(timeout.current);
          timeout.current = setTimeout(() => (processed.current = false), 500);
        }
      };
    }

    latestNavigation.current = navigation;
  }, [navigation]);

  if (navigation.title === '') {
    return <Logo id="navigation-logo" width="80px" height="80px" onClick={() => History.navigate('/')}/>;
  }

  const handleClick = () => {
    Utils.animateIcon('menu-back-icon', {duration: 30});
    History.navigate(navigation.backLink);
  };

  return (
    <div id="navigation">
      <IconButton onClick={handleClick}><FontAwesomeIcon id="menu-back-icon" icon={faArrowLeft}/></IconButton>
      <p>{navigation.title}</p>
    </div>
  );
};

export default React.memo(Navigation);