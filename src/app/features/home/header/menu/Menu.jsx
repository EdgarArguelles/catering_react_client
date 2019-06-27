import './Menu.scss';
import React from 'react';

const Menu = () => {
  const createItem = (href, children, className) => {
    return <li key={href} className={className}><a href={href}>{children}</a></li>;
  };

  const items = [
    createItem('#home', 'Home', 'menu-active'),
    createItem('#about', 'Quienes Somos'),
    createItem('#services', 'Servicios'),
    createItem('#quotations', 'Presupuesto'),
    createItem('#contact', 'Contactanos'),
  ];

  return (
    <nav id="nav-menu-container">
      <ul className="nav-menu">{items}</ul>
    </nav>
  );
};

export default React.memo(Menu);