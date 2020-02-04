import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { fetchCurrentUTCTime } from '../actions/time';
import './TimeDisplay.module.scss';

class TimeDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    if (!this.props.UTCTime && !this.props.loading && !this.state.loading) {
      this.props.fetchCurrentUTCTime();
    }
  }

  render() {
    return (
      this.props.loading ? <React.Fragment>Loading</React.Fragment> :
        <React.Fragment>
          <Header as="h2" styleName="mainTitle">GMT: <b>{new Date(this.props.UTCTime).toString()}</b> </Header>
          <h2 styleName="subTitle">Local: <b>{new Date().toString()}</b> </h2>
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    UTCTime: state.time.UTCTime,
    loading: state.time.loading
  };
};

export default connect(
  mapStateToProps,
  { fetchCurrentUTCTime },
)(TimeDisplay);
