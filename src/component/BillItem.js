import React, {Component} from 'react';
import {View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {INCOME} from '../constant/Bills';

export default class BillItem extends Component {
  bill = null;
  constructor(props) {
    super(props);
    bill = props.bill;
  }
  render() {
    return (
      <View
        style={{
          width: '90%',
          height: 300,
          display: 'flex',
          flexDirection: 'row',
        }}>
        <View style={{width: '20%', display: 'flex', flexDirection: 'row'}}>
          <Icon
            type={this.bill.signory.icon.type}
            name={this.bill.signory.icon.name}
            size={20}
          />
          <View>
            <Text>{this.bill.signory.name}</Text>
            <Text>{this.bill.remark}</Text>
          </View>
        </View>
        <View>
          <Text>
            {this.bill.type == INCOME ? '+' : '-'}
            {this.bill.amount}
            {this.bill.coin.symbol}
          </Text>
          <Text>{this.bill.account.name}</Text>
        </View>
      </View>
    );
  }
}
