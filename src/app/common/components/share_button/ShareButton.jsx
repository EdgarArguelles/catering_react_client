import './ShareButton.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
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
  const speedDialIcon = isSpeedDialOpen
    ? <i className="fas fa-times" aria-hidden="true"/>
    : <i className="fas fa-share-alt" aria-hidden="true"/>;
  const open = () => setIsSpeedDialOpen(true);
  const close = () => setIsSpeedDialOpen(false);
  const toggle = () => setIsSpeedDialOpen(!isSpeedDialOpen);

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
    <SpeedDial ariaLabel="share" className="floating-button share-button animated zoomIn delay-1s"
               icon={speedDialIcon} open={isSpeedDialOpen} onClick={toggle} onClose={close}
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