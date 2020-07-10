import './ShareButton.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShareAlt, faTimes} from '@fortawesome/free-solid-svg-icons';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Utils from 'app/common/Utils';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

const TWITTER_ACCOUNT = 'edgar_bonifacio';

const ShareButton = ({link, label, description, hashtag}) => {
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const speedDialIcon = <FontAwesomeIcon id="share-icon" icon={isSpeedDialOpen ? faTimes : faShareAlt}/>;
  const animateIcon = () => Utils.animateIcon('share-icon');
  const open = () => {
    animateIcon();
    setIsSpeedDialOpen(true);
  };

  const close = () => {
    animateIcon();
    setIsSpeedDialOpen(false);
  };

  const toggle = () => {
    animateIcon();
    setIsSpeedDialOpen(!isSpeedDialOpen);
  };

  const getShareActions = () => {
    const iconSize = 42;
    return [
      {
        name: 'Email', icon: (<EmailShareButton url={link} subject={label} body={description} separator=" link: ">
          <EmailIcon size={iconSize} round/></EmailShareButton>),
      },
      {
        name: 'Whatsapp', icon: (<WhatsappShareButton url={link} title={label}>
          <WhatsappIcon size={iconSize} round/></WhatsappShareButton>),
      },
      {
        name: 'Facebook', icon: (<FacebookShareButton url={link} quote={label} hashtag={`#${hashtag}`}>
          <FacebookIcon size={iconSize} round/></FacebookShareButton>),
      },
      {
        name: 'Twitter', icon: (<TwitterShareButton url={link} title={label} hashtags={[hashtag]} via={TWITTER_ACCOUNT}>
          <TwitterIcon size={iconSize} round/></TwitterShareButton>),
      },
      {
        name: 'Pinterest', icon: (<PinterestShareButton url={link} description={description}
                                                        media={`${window.location.origin}/assets/menu-logo.png`}>
          <PinterestIcon size={iconSize} round/></PinterestShareButton>),
      },
    ];
  };

  return (
    <SpeedDial ariaLabel="share" icon={speedDialIcon} open={isSpeedDialOpen} onClick={toggle} onClose={close}
               className="floating-button share-button animate__animated animate__zoomIn animate__delay-1s"
               onMouseEnter={open} onMouseLeave={close}>
      {getShareActions().map(({name, icon}) => <SpeedDialAction key={name} tooltipTitle={name} icon={icon}/>)}
    </SpeedDial>
  );
};

ShareButton.propTypes = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  hashtag: PropTypes.string,
};

export default React.memo(ShareButton);