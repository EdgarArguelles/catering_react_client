import './Offline.scss';
import React from 'react';
import Slide from '@material-ui/core/Slide';

export default class Offline extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {isOffline: false};
  }

  componentDidMount() {
    window.addEventListener('online', () => this.setState({isOffline: false}));
    window.addEventListener('offline', () => this.setState({isOffline: true}));
  }

  render() {
    const {isOffline} = this.state;

    return (
      <Slide direction="right" in={isOffline}>
        <div id="offline">
        <span className="fa-stack">
          <i className="fas fa-wifi fa-stack-1x" aria-hidden="true"/>
          <i className="fas fa-slash fa-stack-1x" aria-hidden="true"/>
        </span>
          Sin Conexión
        </div>
      </Slide>
    );
  }
}