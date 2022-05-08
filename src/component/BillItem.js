import React, {Component} from 'react';
import {View, TouchableHighlight} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {INCOME} from '../constant/Const';
import {MoneyView} from './MoneyView';

export default class BillItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => this.props.onPress(this.props.bill)}>
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
              type={this.props.bill.signory.icon.type}
              name={this.props.bill.signory.icon.name}
              size={30}
            />
            <View>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {this.props.bill.signory.name}
              </Text>
              <Text>{this.props.bill.remark}</Text>
            </View>
          </View>
          <View style={{alignSelf: 'center', padding: 10}}>
            <Text h4>
              {this.props.bill.type == INCOME ? '+' : '-'}
              <MoneyView money={Math.abs(this.props.bill.amount)} />{' '}
              {this.props.bill.coin.symbol}
            </Text>
            <Text style={{textAlign: 'right'}}>
              {this.props.bill.account ? this.props.bill.account.name : '不计入账户'}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
