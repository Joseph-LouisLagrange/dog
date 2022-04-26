import React, {Component} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {getAllAccounts} from '../api/AccountApi';
export default class AssetAccountDropDownSeletor extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // 计算 items
    let items = this.props.accounts.map(account => {
      return {label: account.name, key: account.ID, value: account};
    });
    return (
      <RNPickerSelect
        value={this.props.selectedAccount}
        placeholder={{label: '不计入账户'}}
        onValueChange={value => this.props.onSelect(value)}
        items={items}
      />
    );
  }
}
