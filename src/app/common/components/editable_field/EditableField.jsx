import './EditableField.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EnterTextField from 'app/common/components/enter_text_field/EnterTextField';

const EditableField = ({value, placeholder, onChange}) => {
  const [isEditing, setIsEditing] = useState(false);

  const getNotEdit = () => {
    return (
      <div className="not-editing">
        <h1>{value}</h1>
        <IconButton className="edit-button" onClick={() => setIsEditing(true)}>
          <i className="fas fa-pencil-alt" aria-hidden="true"/>
        </IconButton>
      </div>
    );
  };

  const handleSave = newValue => {
    onChange(newValue !== '' ? newValue : value);
    setIsEditing(false);
  };

  const getEdit = () => {
    return (
      <EnterTextField className="editing" placeholder={placeholder} initValue={value} autoFocus={true}
                      onSave={handleSave}/>
    );
  };

  return <div className="editable-field">{isEditing ? getEdit() : getNotEdit()}</div>;
};

EditableField.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(EditableField);