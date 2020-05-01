import React, { PureComponent } from 'react';
import './SearchResult.css';
import withScroller from '../hoc/withScroller.js';
import ListItems from './ListItems.js';

export class SearchResult extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cursorPosition: 0,
    };
  }

  keyDownHandler = () => {
    if (this.state.cursorPosition < this.props.filteredData.length) {
      this.setState((state) => {
        return {cursorPosition: state.cursorPosition + 1}
      });
    }
  }

  keyUpHandler = () => {
    if (this.state.cursorPosition > 0) {
      this.setState((state) => {
        return {cursorPosition: state.cursorPosition - 1}
      })
    }
  }

  mouseEnterHandler = (index) => {
    this.setState({cursorPosition: index});
  }

  mouseLeaveHandler = (index) => {
    this.setState({cursorPosition: 0});
  }

  render() {
    return (
      <ul className="SearchResult__ul">
        <ListItems
          filteredData={this.props.filteredData}
          keyDownHandler={this.keyDownHandler}
          keyUpHandler={this.keyUpHandler}
          mouseEnterHandler={this.mouseEnterHandler}
          mouseLeaveHandler={this.mouseLeaveHandler}
          itemIndex={this.state.cursorPosition}
        />
      </ul>
    );
  }
}

export default withScroller(SearchResult);
