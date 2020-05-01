import React, { PureComponent } from 'react';
import './withScroller.css';

export default function withScroller(ComponentToWrap) {
  class Wrapper extends PureComponent{
    offsetTop = 0;

    render() {
      return (
        <div className="withScroller__div">
          <div className="withScroller__div__div">
            <ComponentToWrap {...this.props}/>
          </div>
        </div>
      );
    }
  }

  return Wrapper;
}
