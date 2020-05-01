import React, { PureComponent } from 'react';

export default function withKeyboardAndMouse(ComponentToWrap) {
  class KeyboardMouseWrapper extends PureComponent {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      window.addEventListener('keydown', this.handleDownArrow);
      window.addEventListener('keyup', this.handleUpArrow);
    }

    componentWillUnmount() {
      window.removeListener('keydown');
      window.removeListener('keyup');
    }

    handleDownArrow = (evt) => {
      if (evt.keyCode == 40) {
        this.props.keyDownHandler();
      }
    }

    handleUpArrow = (evt) => {
      if (evt.keyCode == 38) {
        this.props.keyUpHandler();
      }
    }

    render() {
      return (
        <React.Fragment>
          <ComponentToWrap {...this.props} />
        </React.Fragment>
      );
    }
  }

  return KeyboardMouseWrapper;
}
