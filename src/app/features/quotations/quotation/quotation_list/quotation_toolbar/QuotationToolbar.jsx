import './QuotationToolbar.scss';
import React, {useState} from 'react';
import {useQueryClient} from 'react-query';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import Utils from 'app/common/Utils';
import {QUOTATIONS_KEY, useQuotations} from 'app/hooks/data/Quotations';
import ExpandBar from 'app/common/components/expand_bar/ExpandBar';

const QuotationToolbar = () => {
  const queryClient = useQueryClient();
  const {metaData} = useQuotations();
  const [isCompact, setIsCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const sort = metaData?.pagination.sort[0];
  const SORT_LABEL = {createdAt: 'Fecha', name: 'Nombre', price: 'Precio'};
  const handleClose = () => setOpen(false);

  const animateIcon = () => Utils.animateIcon('quotation-toolbar-sort-icon');
  const handleClick = event => {
    animateIcon();
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleChangeSort = newSort => {
    if (metaData.pagination.sort[0] !== newSort) {
      Utils.resetInfiniteQuery(queryClient, QUOTATIONS_KEY, {
        ...metaData.pagination,
        sort: [newSort, 'createdAt'],
        direction: newSort === 'createdAt' ? 'DESC' : 'ASC',
        page: 0,
      });
    }

    handleClose();
  };

  return (
    <ExpandBar shouldMoveNavigation={true} onChange={top => setIsCompact(top < 40)}>
      <Toolbar id="quotation-toolbar">
        <Button className={`sort-button${isCompact ? ' compact' : ''}`} onClick={handleClick}
                onMouseEnter={animateIcon}>
          Ordenado por {SORT_LABEL[sort]} <FontAwesomeIcon id="quotation-toolbar-sort-icon" icon={faChevronDown}/>
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