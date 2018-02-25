import React from 'react'
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../actions/actionCreators'
import {connect} from 'react-redux'
const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password !== values.passwordConfirm) {
    errors.password = 'Password Confirmation not match!'
  } 
  return errors
}

const warn = values => {
  const warnings = {}
  if (values.password && values.password.length < 6) {
    warnings.password = 'Short password!'
  }
  return warnings
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning } //touched代表控件被点击后又失去焦点
}) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error &&
          <span>
            {error}
          </span>) ||
          (warning &&
            <span>
              {warning}
            </span>))}
    </div>
  </div>

const SyncValidationForm = props => {
  const { handleSubmit, pristine, reset, submitting, history } = props
  return (
    <form onSubmit={handleSubmit((data)=>{props.signUp({...data,history})})}>

      <Field name="email" type="email" component={renderField} label="Email" />
      <Field name="password" type="password" component={renderField} label="Password" />
      <Field name="passwordConfirm" type="password" component={renderField} label="Comfirm Password" />
      <div>
        <button type="submit" disabled={submitting}>
          Sign Up!
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default connect(null,actions)(reduxForm({
  form: 'signup', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  warn // <--- warning function given to redux-form
})(SyncValidationForm))