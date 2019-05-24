import './BackToTop.scss';
import jQuery from 'jquery';
import React from 'react';

export default class BackToTop extends React.Component {
  static propTypes = {};

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    jQuery('#back-to-top').click(() => jQuery('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo'));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.pageYOffset > 100) {
      jQuery('#back-to-top').fadeIn('slow');
    } else {
      jQuery('#back-to-top').fadeOut('slow');
    }
  };

  render() {
    return <i id="back-to-top" className="fas fa-chevron-up" aria-hidden="true"/>;
  }
}