import React from 'react';
import PropTypes from 'prop-types';

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type='text'
          name='name'
          placeholder='Item name' />
        <input
          type='number'
          name='price'
          placeholder='Enter price per oz' />
        <input
          type='number'
          name='quantity'
          placeholder='Enter quantity in oz' />
        <input
          type='text'
          name='description'
          placeholder='Describe Item' />
        <button type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;