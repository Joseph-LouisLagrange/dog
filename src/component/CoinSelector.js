import React , { Component } from 'react';
import RNPickerSelect from 'react-native-picker-select';


export default class CoinSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.coins.map(coin => {
      return {label: coin.name+" "+coin.shortName, key: coin.ID, value: coin};
    });
    return (
      <RNPickerSelect
        style={this.props.style}
        placeholder={{label: '选择货币'}}
        value={this.props.selectedCoin}
        onValueChange={value => this.props.onSelect(value)}
        items={items}
      />
    );
  }
}

