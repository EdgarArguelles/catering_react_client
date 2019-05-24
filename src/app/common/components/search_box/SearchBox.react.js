import './SearchBox.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

export default class SearchBox extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    initValue: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onSearch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {search: '', focus: false};
  }

  componentWillMount() {
    const {initValue} = this.props;

    initValue && this.setState({search: initValue, focus: true});
  }

  handleSearch = search => {
    const {onSearch} = this.props;
    onSearch(search);
    this.setState({search});
    search === '' && this.setState({focus: false});
  };

  handleFocus = () => {
    const {onFocus} = this.props;
    this.setState({focus: true});
    onFocus && onFocus();
  };

  handleBlur = () => {
    const {onBlur} = this.props;
    this.setState({focus: false});
    onBlur && onBlur();
  };

  getStartAdornment = () => {
    return (
      <InputAdornment position="start" className="search-box-adornment">
        <i className="fas fa-search" aria-hidden="true"/>
      </InputAdornment>
    );
  };

  getEndAdornment = () => {
    const {search} = this.state;

    if (search === '') {
      return null;
    }

    return (
      <InputAdornment position="end" className="search-box-adornment">
        <IconButton className="clear-search-box-btn" onClick={() => this.handleSearch('')}>
          <i className="fas fa-backspace" aria-hidden="true"/>
        </IconButton>
      </InputAdornment>
    );
  };

  render() {
    const {search, focus} = this.state;
    // save all props except className, initValue, onFocus, onBlur, onSearch in rest
    /* eslint-disable no-unused-vars */
    const {id, className, initValue, onFocus, onBlur, onSearch, ...rest} = this.props;
    /* eslint-enable no-unused-vars */

    return (
      <Input id={id} placeholder="Buscar" className={`${className} ${search !== '' || focus ? 'search-active' : ''}`}
             fullWidth={true} value={search}
             onChange={event => this.handleSearch(event.target.value)}
             onFocus={this.handleFocus} onBlur={this.handleBlur}
             startAdornment={this.getStartAdornment()} endAdornment={this.getEndAdornment()} {...rest}/>
    );
  }
}