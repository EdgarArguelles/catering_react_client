import './Menu.scss';
import React from 'react';

export default class Menu extends React.Component {
  static propTypes = {};

  createItem = (href, children, className) => {
    return <li key={href} className={className}><a href={href}>{children}</a></li>;
  };

  render() {
    const items = [
      this.createItem('#home', 'Home', 'menu-active'),
      this.createItem('#about', 'Quienes Somos'),
      this.createItem('#services', 'Servicios'),
      this.createItem('#quotations', 'Presupuesto'),
      this.createItem('#contact', 'Contactanos'),
    ];

    return (
      <nav id="nav-menu-container">
        <ul className="nav-menu">{items}</ul>
      </nav>
    );
  }
}