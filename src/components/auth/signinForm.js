import React from "react";
import { Field, reduxForm } from "redux-form";
import * as actions from '../../actions/actionCreators'
import {connect } from 'react-redux'
const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting, history } = props;
  const printData=(data)=> {
    console.log(props.form)
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit((data)=>{props.signIn({...data,history})})}>
      
     <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>

      <div>
        <label>Password</label>
        <div>
          <label>
            <Field
              name="password"
              component="input"
              type="password"
              
            />
          </label>
          
        </div>
      </div>
      
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Signin
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default connect(null,actions)(reduxForm({
  form: "simple", // a unique identifier for this form
  onSubmit: (data)=>{console.log("-------------------"); console.log(data); console.log("++++++++++++++")}
})(SimpleForm));
