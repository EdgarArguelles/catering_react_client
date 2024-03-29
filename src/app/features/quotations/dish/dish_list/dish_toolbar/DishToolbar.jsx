import './DishToolbar.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import ExpandBar from 'app/common/components/expand_bar/ExpandBar';
import SearchBox from 'app/common/components/search_box/SearchBox';
import { changeSearch } from 'app/features/quotations/dish/dish_filter/DishFilterReducer';

const DishToolbar = () => {
  const dispatch = useDispatch();
  const search = useSelector(state => state.quotations.dish.filter.search);
  const handleChangeSearch = value => dispatch(changeSearch(value));

  return (
    <ExpandBar shouldMoveNavigation={true}>
      <Toolbar id="dish-toolbar">
        <SearchBox id="dish-search" className="search" initValue={search} onSearch={handleChangeSearch}/>
      </Toolbar>
    </ExpandBar>
  );
};

export default React.memo(DishToolbar);