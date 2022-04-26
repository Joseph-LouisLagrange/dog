import React, {Component} from 'react';
import {View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {INCOME} from '../constant/Const';
import {MoneyView} from './MoneyView';

export default class BillItem extends Component {
  constructor(props) {
    super(props);
    this.bill = this.props.bill;
  }
  render() {
    return (
      <View
        style={{
          ...this.props.style,
          borderColor: 'pink',
          borderWidth: 2,
          borderRadius: 10,
          width: '100%',
          //height: 60,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: '20%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon
            iconStyle={{padding: 10}}
            type={this.bill.signory.icon.type}
            name={this.bill.signory.icon.name}
            size={30}
          />
          <View>
            <Text style={{fontSize:20,fontWeight:'bold'}}>{this.bill.signory.name}</Text>
            <Text>{this.bill.remark}</Text>
          </View>
        </View>
        <View style={{alignSelf: 'center', padding: 10}}>
          <Text h4>
            {this.bill.type == INCOME ? '+' : '-'}
            <MoneyView money={Math.abs(this.bill.amount)} />{' '}
            {this.bill.coin.symbol}
          </Text>
          <Text style={{textAlign: 'right'}}>
            {this.bill.account ? this.bill.account.name : '不计入账户'}
          </Text>
        </View>
      </View>
    );
  }
}
