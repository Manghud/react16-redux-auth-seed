import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';

class Loading extends Component {
  render() {
    const { active, dimmed, message = '' } = this.props;
    return (
      <div>
        <Loader size="huge" active={active} dimmed={dimmed ? '' : undefined}/>
        <div>{message}</div>
      </div>
    );
  }
}

Loading.defaultProps = {
  active: true,
  dimmed: false
};

export default Loading;