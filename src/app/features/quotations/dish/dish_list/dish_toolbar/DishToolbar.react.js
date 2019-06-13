import './DishToolbar.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import ExpandBar from 'app/common/components/expand_bar/ExpandBar';
import SearchBox from 'app/common/components/search_box/SearchBox.react';
import DishFilterActions from 'app/features/quotations/dish/dish_filter/DishFilterActions';

class DishToolbar extends React.Component {
  static propTypes = {
    search: PropTypes.string.isRequired,
    changeSearch: PropTypes.func.isRequired,
  };

  render() {
    const {search, changeSearch} = this.props;

    return (
      <ExpandBar shouldMoveNavigation={true}>
        <Toolbar id="dish-toolbar">
          <SearchBox id="dish-search" className="search" initValue={search} onSearch={changeSearch}/>
        </Toolbar>
      </ExpandBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    search: state.quotations.dish.filter.search,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSearch: search => {
      dispatch(DishFilterActions.changeSearch(search));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DishToolbar);