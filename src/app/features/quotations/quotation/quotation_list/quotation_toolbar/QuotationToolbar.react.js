import './QuotationToolbar.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import ExpandBar from 'app/common/components/expand_bar/ExpandBar.react';
import QuotationsActions from 'app/data/quotations/QuotationsActions';

class QuotationToolbar extends React.Component {
  static propTypes = {
    metaData: PropTypes.object,
    changeSort: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {isCompact: false, open: false, anchorEl: null};
  }

  handleClick = event => {
    this.setState({open: true, anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChangeSort = sort => {
    const {metaData, changeSort} = this.props;

    if (metaData.pagination.sort[0] !== sort) {
      changeSort(metaData.pagination, sort);
    }
    this.handleClose();
  };

  render() {
    const {isCompact, open, anchorEl} = this.state;
    const {metaData} = this.props;
    const sort = metaData ? metaData.pagination.sort[0] : '';
    const SORT_LABEL = {createdAt: 'Fecha', name: 'Nombre', price: 'Precio'};

    return (
      <ExpandBar shouldMoveNavigation={true} onChange={top => this.setState({isCompact: top < 40})}>
        <Toolbar id="quotation-toolbar">
          <Button className={`sort-button${isCompact ? ' compact' : ''}`} onClick={this.handleClick}>
            Ordenado por {SORT_LABEL[sort]} <i className="fas fa-chevron-down" aria-hidden="true"/>
          </Button>
          <Popover className="sort-menu" open={open} anchorEl={anchorEl} onClose={this.handleClose}
                   anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
            {Object.keys(SORT_LABEL).map(key => (
              <MenuItem key={key} onClick={() => this.handleChangeSort(key)}>
                <Radio color="primary" checked={sort === key}/> Ordenar por {SORT_LABEL[key]}
              </MenuItem>
            ))}
          </Popover>
        </Toolbar>
      </ExpandBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    metaData: state.data.metaData.quotations,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSort: (pagination, sort) => {
      dispatch(QuotationsActions.cleanQuotations());
      dispatch(QuotationsActions.fetchQuotations({
        ...pagination,
        sort: [sort, 'createdAt'],
        direction: sort === 'createdAt' ? 'DESC' : 'ASC',
        page: 0,
      }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationToolbar);