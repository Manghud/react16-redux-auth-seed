import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    const { user = {} } = this.props;
    return (
      <div>
        Welcome back, {user.firstName} {user.lastName}
      </div>
    );
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
  {}
)(Dashboard);