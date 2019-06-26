import './Action.scss';
import React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import Image from 'app/common/components/image/Image';

export default class Action extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired,
  };

  render() {
    const {id, image, className, onClick, children} = this.props;

    return (
      <ButtonBase id={id} focusRipple className={`action ${className}`} onClick={onClick}>
        <Image className="image" src={image} alt={id}/>
        <div className="image-backdrop absolute"/>
        <div className="image-content absolute">
          <div className="image-title">
            {children}
            <div className="image-marked"/>
          </div>
        </div>
      </ButtonBase>
    );
  }
}