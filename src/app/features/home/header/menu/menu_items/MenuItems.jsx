import './MenuItems.scss';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const MENU_ITEMS = {
  home: { label: 'Home' },
  about: { label: 'Quienes Somos' },
  services: { label: 'Servicios' },
  quotations: { label: 'Presupuesto' },
  social: { label: 'Comunidad' },
  contact: { label: 'Contactanos' },
};

export const selectItem = () => {
  let selected = 'home';
  if (window.pageYOffset > 0) {
    Object.keys(MENU_ITEMS).forEach(key => {
      if (window.pageYOffset >= document.getElementById(key).offsetTop - 65) {
        selected = key;
      }
    });
  }

  [].forEach.call(document.querySelectorAll('li.menu-active'), element => {
    element.classList.remove('menu-active');
  });

  [].forEach.call(document.querySelectorAll(`.menu-items li[aria-label='${selected}']`), element => {
    element.classList.add('menu-active');
  });
};

const MenuItems = ({ onClick }) => {
  useEffect(() => {
    selectItem();
  }, []);

  const handleClick = id => {
    const fixValue = id === 'contact' ? 0 : 60;
    window.scroll({ top: document.getElementById(id).offsetTop - fixValue, left: 0, behavior: 'smooth' });
    onClick && onClick();
  };

  return (
    <ul className="menu-items">{Object.entries(MENU_ITEMS).map(([key, value]) => (
      <li key={key} aria-label={key}><a onClick={() => handleClick(key)}>{value.label}</a></li>
    ))}</ul>
  );
};

MenuItems.propTypes = {
  onClick: PropTypes.func,
};

export default React.memo(MenuItems);