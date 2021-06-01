/* eslint-disable max-lines */
import './ShareButton.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faShareAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Utils from 'app/common/Utils';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

const TWITTER_ACCOUNT = 'edgar_bonifacio';

const ShareButton = ({ link, label, description, hashtag }) => {
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [isCopyOpen, setIsCopyOpen] = useState(false);
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

  const toClipboard = () => {
    if (navigator && navigator.clipboard) {
      navigator.vibrate && navigator.vibrate(300);
      navigator.clipboard.writeText(link);
      setIsCopyOpen(true);
    }
  };

  const getShareActions = () => {
    const iconSize = 42;
    return [
      {
        name: 'Copy', icon: (<Fab className="copy-action" onClick={toClipboard}>
          <FontAwesomeIcon className="copy-icon" icon={faClipboard}/></Fab>),
      },
      {
        name: 'Email', icon: (<EmailShareButton url={link} subject={label} body={description} separator=" link: ">
          <EmailIcon size={iconSize} round/></EmailShareButton>),
      },
      {
        name: 'Telegram', icon: (<TelegramShareButton url={link} title={label}>
          <TelegramIcon size={iconSize} round/></TelegramShareButton>),
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
    <>
      <SpeedDial ariaLabel="share" icon={speedDialIcon} open={isSpeedDialOpen} onClick={toggle} onClose={close}
        className="floating-button share-button animate__animated animate__zoomIn animate__delay-1s"
        onMouseEnter={open} onMouseLeave={close}>
        {getShareActions().map(({ name, icon }) =>
          <SpeedDialAction key={name} icon={icon} title={name} tooltipTitle={name}/>)}
      </SpeedDial>
      <Snackbar open={isCopyOpen} TransitionComponent={Slide} autoHideDuration={3000}
        onClose={() => setIsCopyOpen(false)} message="Se copió el link al portapapeles."/>
    </>
  );
};

ShareButton.propTypes = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  hashtag: PropTypes.string,
};

export default React.memo(ShareButton);