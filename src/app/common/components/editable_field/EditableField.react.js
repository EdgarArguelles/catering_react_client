import './EditableField.scss';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EnterTextField from 'app/common/components/enter_text_field/EnterTextField.react';

export default class EditableField extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {isEditing: false};
  }

  getNotEdit = () => {
    const {value} = this.props;

    return (
      <div className="not-editing">
        <h1>{value}</h1>
        <IconButton className="edit-button" onClick={() => this.setState({isEditing: true})}>
          <i className="fas fa-pencil-alt" aria-hidden="true"/>
        </IconButton>
      </div>
    );
  };

  handleSave = newValue => {
    const {value, onChange} = this.props;

    onChange(newValue !== '' ? newValue : value);
    this.setState({isEditing: false});
  };

  getEdit = () => {
    const {value, placeholder} = this.props;

    return (
      <EnterTextField className="editing" placeholder={placeholder} initValue={value} autoFocus={true}
                      onSave={this.handleSave}/>
    );
  };

  render() {
    const {isEditing} = this.state;

    return (
      <div className="editable-field">
        {isEditing ? this.getEdit() : this.getNotEdit()}
      </div>
    );
  }
}