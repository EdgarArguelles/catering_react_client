import './QuotationToolbar.scss';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import ExpandBar from 'app/common/components/expand_bar/ExpandBar';
import QuotationsActions from 'app/data/quotations/QuotationsActions';

const QuotationToolbar = () => {
  const dispatch = useDispatch();
  const metaData = useSelector(state => state.data.metaData.quotations);
  const [isCompact, setIsCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const sort = metaData ? metaData.pagination.sort[0] : '';
  const SORT_LABEL = {createdAt: 'Fecha', name: 'Nombre', price: 'Precio'};
  const handleClose = () => setOpen(false);

  const handleClick = event => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleChangeSort = newSort => {
    if (metaData.pagination.sort[0] !== newSort) {
      dispatch(QuotationsActions.cleanQuotations());
      dispatch(QuotationsActions.fetchQuotations({
        ...metaData.pagination,
        sort: [newSort, 'createdAt'],
        direction: newSort === 'createdAt' ? 'DESC' : 'ASC',
        page: 0,
      }));
    }

    handleClose();
  };

  return (
    <ExpandBar shouldMoveNavigation={true} onChange={top => setIsCompact(top < 40)}>
      <Toolbar id="quotation-toolbar">
        <Button className={`sort-button${isCompact ? ' compact' : ''}`} onClick={handleClick}>
          Ordenado por {SORT_LABEL[sort]} <i className="fas fa-chevron-down" aria-hidden="true"/>
        </Button>
        <Popover className="sort-menu" open={open} anchorEl={anchorEl} onClose={handleClose}
                 anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
          {Object.keys(SORT_LABEL).map(key => (
            <MenuItem key={key} onClick={() => handleChangeSort(key)}>
              <Radio color="primary" checked={sort === key}/> Ordenar por {SORT_LABEL[key]}
            </MenuItem>
          ))}
        </Popover>
      </Toolbar>
    </ExpandBar>
  );
};

export default React.memo(QuotationToolbar);