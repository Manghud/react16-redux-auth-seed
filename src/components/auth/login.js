import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { Input, Header, Button } from 'semantic-ui-react';
import { push } from 'connected-react-router';

import { EMAIL_REGEXP } from './signup';
import './login.module.scss';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.onBlurEmail = this.onBlurEmail.bind(this);
    this.onBlurPassword = this.onBlurPassword.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onRedirectToSignup = this.onRedirectToSignup.bind(this);
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

  onBlurPassword(){
    const { errors, password } = this.state;
    if(!password) {
      this.setState({ errors: { ...errors, password : 'Password is required' } });
    } else {
      const { password, ...otherErrors } = errors;
      this.setState({ errors: otherErrors });
    }
  }

  isFormComplete() {
    const { email, password, errors } = this.state;
    if (Object.keys(errors).length) {
      return false;
    }
    return !!(email && password);
  }

  onLogin() {
    const { email, password } = this.state;
    if (!this.isFormComplete()) {
      return;
    }
    this.props.loginUser({ email, password });
  }

  onRedirectLoginSuccess() {
    this.props.push('/');
  }

  onRedirectToSignup() {
    this.props.push('/auth/signup');
  }

  renderLoginForm() {
    if (this.props.user) {
      return this.onRedirectLoginSuccess();
    }
    return (
      <div styleName="loginForm">
        <Header as='h1'>Login</Header>
        {
          this.renderFormItem({
            placeholder: 'Email Address',
            value: 'email',
            onBlur: this.onBlurEmail
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
        <Button
          primary
          onClick={this.onLogin}
          disabled={!this.isFormComplete()}
          loading={this.props.loading}
        >
          Login
        </Button>
        <div styleName='navLink'>
          <a onClick={this.onRedirectToSignup}>
             Don't have an account?
          </a>
        </div>
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

  renderError(value) {
    let errorState = this.state.errors[value];
    const loginError = this.props.loginError;
    if (value === 'password' && loginError) {
      return <div styleName='formError centered'>
        <span>Invalid email or password</span>
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
      <div styleName="loginContainer">
        {this.renderLoginForm()}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const auth = state.auth || {};
  return {
    loginError: auth.loginError,
    user: auth.user,
    loading: auth.loading
  };
};

export default connect(
  mapStateToProps,
  {
    loginUser,
    push
  }
)(Login);
