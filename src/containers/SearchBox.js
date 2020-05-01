import React, { PureComponent } from 'react';
import './SearchBox.css';
import SearchResult from './SearchResult';
const data = require('../userData.json');

export default class SearchBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      enteredVal: '',
    }
    this.filteredData = [];
    this.cache = {}; //store the searched result to avoid repeated iteration
  }

  debounceFn = (fn) => {
    let debounceTime;
    return function (args) {
      const fnArguments = args.currentTarget.value; //hold only the value instead of persisting the synthetic event.
      clearTimeout(debounceTime);
      debounceTime = setTimeout(() => {
        fn(fnArguments); //context will be held properly as fn is the arrow function
      }, 500);
    }
  }

  getFilteredData = (val) => {
    const value = val.toLowerCase();

    if (this.cache[value]) {
      return this.cache[value];
    }

    const regExp = new RegExp(value, 'g');
    const filteredData = data.filter((item) => {
      if (item.id.toLowerCase().search(regExp) != -1 ||
        item.name.toLowerCase().search(regExp) != -1 ||
        item.items.join(',').toLowerCase().search(regExp) != -1 ||
        item.address.toLowerCase().search(regExp) != -1 ||
        item.pincode.toLowerCase().search(regExp) != -1
      ) {
        return true;
      }
      return false;
    });

    this.cache[value] = filteredData;
    return filteredData;
  }

  onChange = (val) => {
    this.filteredData = this.getFilteredData(val);
    this.setState({enteredVal: val});
  }

  render() {
    const handleChange = this.debounceFn(this.onChange);
    return (
      <div className="SearchBox__div">
        <input type="text" onChange={handleChange} className="SearchBox__Input" placeholder="search user by Id, Address, name"/>
        {this.state.enteredVal && <SearchResult filteredData={this.filteredData}/>}
      </div>
    )
  }
}
