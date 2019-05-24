import './ShareButton.scss';
import React from 'react';
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

export default class ShareButton extends React.Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
    label: PropTypes.string,
    description: PropTypes.string,
    hashtag: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {isSpeedDialOpen: false};
  }

  getShareActions = () => {
    const {link, label, description, hashtag} = this.props;
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

  render() {
    const {isSpeedDialOpen} = this.state;
    const speedDialIcon = isSpeedDialOpen
      ? <i className="fas fa-times" aria-hidden="true"/>
      : <i className="fas fa-share-alt" aria-hidden="true"/>;
    const open = () => this.setState({isSpeedDialOpen: true});
    const close = () => this.setState({isSpeedDialOpen: false});
    const toggle = () => this.setState({isSpeedDialOpen: !isSpeedDialOpen});

    return (
      <SpeedDial ariaLabel="share" className="floating-button share-button animated zoomIn delay-1s"
                 icon={speedDialIcon} open={isSpeedDialOpen} onClick={toggle} onClose={close}
                 onMouseEnter={open} onMouseLeave={close}>
        {this.getShareActions().map(({name, icon}) => <SpeedDialAction key={name} tooltipTitle={name} icon={icon}/>)}
      </SpeedDial>
    );
  }
}