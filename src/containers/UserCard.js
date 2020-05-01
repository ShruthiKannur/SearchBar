import React, { PureComponent } from 'react';
import './UserCard.css';

export default class UserCard extends PureComponent {
  constructor() {
    super();
    this.ref = {};
  }

  componentDidMount() {
    window.addEventListener('keydown', () => {
      if (this.props.isActive) {
        this.ref[this.props.userInfo.id] && this.ref[this.props.userInfo.id].scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    });
    window.addEventListener('keyup', () => {
      if (this.props.isActive) {
        this.ref[this.props.userInfo.id] && this.ref[this.props.userInfo.id].scrollIntoView({ block: "end", behavior: "smooth" });
      }
    });
  }

  componentWillUnmount() {
    window.removeListener('keydown');
    window.removeListener('keyup');
    this.ref = null;
  }

  render() {
    const { userInfo, isActive, userIndex, mouseEnterHandler, mouseLeaveHandler } = this.props;

    if (!userInfo) {
      return null;
    }

    const activeCss = isActive ? 'UserCard__li__active' : 'UserCard__li__inActive';

    return (
      <li className={`UserCard__li ${activeCss}`}
        onMouseEnter={() => {
          mouseEnterHandler(userIndex + 1);
        }}
        onMouseLeave={mouseLeaveHandler}
        ref={(ref) => {
          this.ref[userInfo.id] = ref;
        }}
      >
        <h4 className="UserCard__h4"> {userInfo.id} </h4>
        <span> {userInfo.name} </span>
        <p> {userInfo.address} </p>
      </li>
    );
  }
}
