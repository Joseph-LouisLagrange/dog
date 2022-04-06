import React, {Component} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {getAllAccounts} from '../api/AccountApi';
export default class AssetAccountDropDownSeletor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
    };
    this.loadAccounts();
  }
  loadAccounts() {
    getAllAccounts().then(accounts => {
      this.setState({accounts: accounts});
    });
  }
  render() {
    // 计算 items
    let items = this.state.accounts.map(account => {
      return {label: account.name, key: account.ID,value:account.ID};
    });
    return (
      <RNPickerSelect
        placeholder={{label: '不计入账户'}}
        onValueChange={value => this.props.onSelect(value)}
        items={items}
      />
    );
  }
}
