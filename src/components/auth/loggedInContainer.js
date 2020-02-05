import { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

class LoggedInContainer extends Component {
  render() {
    const { user } = this.props;
    if (!user) {
      this.props.push('/auth/login');
      return null;
    }
    return this.props.children;
  }
}

const mapStateToProps = (state, props) => {
  const auth = state.auth || {};
  return {
    user: auth.user
  };
};

export default connect(
  mapStateToProps,
  { push }
)(LoggedInContainer);