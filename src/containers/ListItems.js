import React, { PureComponent } from 'react';
import UserCard from './UserCard.js';
import './ListItems.css';
import withKeyboardAndMouse from '../hoc/withKeyboardAndMouse.js';

export class ListItems extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderEmptyList = () => {
    return (
      <div className='ListItems__div'>
        No user found
      </div>
    );
  }

  render() {
    const { filteredData, itemIndex, mouseEnterHandler, mouseLeaveHandler } = this.props;
    const userList = filteredData.map((user, index) => {
      return (
        <UserCard
          userInfo={user}
          key={user.id}
          userIndex={index}
          isActive={(itemIndex - 1) === index}
          mouseEnterHandler={mouseEnterHandler}
          mouseLeaveHandler={mouseLeaveHandler}
        />
      );
    });

    return (
      <React.Fragment>
        {userList.length ? userList : this.renderEmptyList()}
      </React.Fragment>
    )
  }
}

export default withKeyboardAndMouse(ListItems);
