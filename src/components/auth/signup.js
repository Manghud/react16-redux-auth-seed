import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/auth';
import { Input, Header, Button, Icon } from 'semantic-ui-react';
import { push } from 'connected-react-router';

import './signup.module.scss';

/*eslint-disable-next-line*/
const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const SECURE_PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      errors: {}
    };
    this.onBlurEmail = this.onBlurEmail.bind(this);
    this.onBlurFirstName = this.onBlurFirstName.bind(this);
    this.onBlurLastName = this.onBlurLastName.bind(this);
    this.onBlurPassword = this.onBlurPassword.bind(this);
    this.onBlurPasswordConfirmation = this.onBlurPasswordConfirmation.bind(this);
    this.onSignup = this.onSignup.bind(this);
    this.onRedirectLogin = this.onRedirectLogin.bind(this);
  }

  onChangeFormValue(key, validator, _, data) {
    this.setState({ [key]: data.value }, () => {
      if (this.state.errors[key]) {
        validator();
      }
    });
  }

  onBlurEmail() {
    const { errors, email } = this.state;
    if(!email) {
      this.setState({ errors: { ...errors, email : 'Email is required' } });
    } else if (!(new RegExp(EMAIL_REGEXP).test(email))) {
      this.setState({ errors: { ...errors, email : 'Invalid Email' } });
    } else {
      const { email, ...otherErrors } = errors;
      this.setState({ errors: otherErrors });
    }
  }

  onBlurFirstName() {
    const { errors, firstName } = this.state;
    if(!firstName) {
      this.setState({ errors: { ...errors, firstName: 'First Name is required' } });
    } else if(firstName.length < 2) {
      this.setState({ errors: { ...errors, firstName: 'First Name must have at least 2 characters' } });
    } else {
      const { firstName, ...otherErrors } = errors;
      this.setState({ errors: otherErrors });
    }
  }

  onBlurLastName() {
    const { errors, lastName } = this.state;
    if(!lastName) {
      this.setState({ errors: { ...errors, lastName: 'Last Name is required' } });
    } else if(lastName.length < 2) {
      this.setState({ errors: { ...errors, lastName: 'Last Name must have at least 2 characters' } });
    } else {
      const { lastName, ...otherErrors } = errors;
      this.setState({ errors: otherErrors });
    }
  }

  onBlurPassword(){
    const { errors, password } = this.state;
    if(!password) {
      this.setState({ errors: { ...errors, password : 'Password is required' } });
    } else if (!(new RegExp(SECURE_PASSWORD_REGEXP).test(password))) {
      this.setState({ errors: { ...errors, password : 'Password must have at least 8 characters, include  at least one uppercase letter, one lowercase letter and one number' } });
    } else {
      const { password, ...otherErrors } = errors;
      this.setState({ errors: otherErrors });
    }
  }

  onBlurPasswordConfirmation(){
    const { errors, password, passwordConfirmation } = this.state;
    if(!passwordConfirmation) {
      this.setState({ errors: { ...errors, passwordConfirmation: 'Password confirmation is required' } });
    } else if(passwordConfirmation !== password) {
      this.setState({ errors: { ...errors, passwordConfirmation: 'Password and confirmation do not match' } });
    } else {
      const { passwordConfirmation , ...otherErrors } = errors;
      this.setState({ errors: otherErrors });
    }
  }

  isFormComplete() {
    const { email, password, passwordConfirmation, firstName, lastName, errors } = this.state;
    if (Object.keys(errors).length) {
      return false;
    }
    return !!(email && password && passwordConfirmation && firstName && lastName);
  }

  onSignup() {
    const { email, password, passwordConfirmation, firstName, lastName } = this.state;
    if (!this.isFormComplete()) {
      return;
    }
    this.props.signupUser({ email, password, passwordConfirmation, firstName, lastName });
  }

  onRedirectLogin() {
    this.props.push('/auth/login');
  }

  renderSignupForm() {
    if (this.props.signupSuccess) {
      return this.renderSuccessMessage();
    }
    return (
      <div styleName="signupForm">
        <Header as='h1'>Signup</Header>
        {
          this.renderFormItem({
            placeholder: 'Email Address',
            value: 'email',
            onBlur: this.onBlurEmail
          })
        }
        {
          this.renderFormItem({
            placeholder: 'First Name',
            value: 'firstName',
            onBlur: this.onBlurFirstName
          })
        }
        {
          this.renderFormItem({
            placeholder: 'Last Name',
            value: 'lastName',
            onBlur: this.onBlurLastName
          })
        }
        {
          this.renderFormItem({
            placeholder: 'Password',
            type: 'password',
            value: 'password',
            onBlur: this.onBlurPassword
          })
        }
        {
          this.renderFormItem({
            placeholder: 'Confirm Password',
            type: 'password',
            value: 'passwordConfirmation',
            onBlur: this.onBlurPasswordConfirmation
          })
        }
        <Button
          primary
          onClick={this.onSignup}
          disabled={!this.isFormComplete()}
          loading={this.props.loading}
        >
          Create Account
        </Button>
      </div>
    );
  }

  renderFormItem({ placeholder, type = 'text', value, onBlur }) {
    const errorKeys = Object.keys(this.state.errors) || [];
    return (
      <React.Fragment>
        <Input
          placeholder={placeholder}
          type={type}
          value={this.state[value]}
          error={errorKeys.includes(value)}
          onChange={this.onChangeFormValue.bind(this, value, onBlur)}
          onBlur={onBlur}
        />
        {this.renderError(value)}
      </React.Fragment>
    );
  }

  renderSuccessMessage() {
    return (
      <div styleName='signupSuccess'>
        <Header icon>
          <Icon name='check' />
          Success!
        </Header>
        <Button
          positive
          onClick={this.onRedirectLogin}
        >
          Click here to Login to your account
        </Button>
      </div>
    );
  }

  renderError(value) {
    let errorState = this.state.errors[value];
    const signupError = this.props.signupError;
    if (value === 'email' && signupError === 409) {
      return <div styleName='formError'>
        <span>Email already in use</span>
      </div>;
    }
    if (errorState) {
      return <div styleName='formError'>
        <span>{errorState}</span>
      </div>;
    }
    return null;
  }

  render() {
    return (
      <div styleName="signupContainer">
        {this.renderSignupForm()}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const auth = state.auth || {};
  return {
    signupError: auth.signupError,
    signupSuccess: auth.signupSuccess,
    loading: auth.loading
  };
};

export default connect(
  mapStateToProps,
  {
    signupUser,
    push
  }
)(Signup);
