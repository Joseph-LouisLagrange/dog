import dayjs from 'dayjs';
import React, {Component} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import BillItem from './BillItem';
import { MoneyView } from './MoneyView';

export default class BillItemBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={this.props.style}>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:18}}>
            {this.props.dateTime&&dayjs(this.props.dateTime).format('MM.DD')}
          </Text>
          <Text style={{fontSize:18}}>
              总计: <MoneyView money={this.props.total}/>
              {this.props.coin&&this.props.coin.symbol}
            </Text>
        </View>
        <View>
          {this.props.bills.map(bill => (
            <View style={{marginVertical:10}} key={bill.ID}>
              <BillItem bill={bill} onPress={b=>this.props.onPressItem(b)} />
            </View>
          ))}
        </View>
      </View>
    );
  }
}
