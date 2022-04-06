import dayjs from 'dayjs';
import React, {Component} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import BillItem from './BillItem';

export default class BillItemBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={this.props.style}>
        <View>
          <Text>
            {dayjs(this.props.dateTime).format('MM.DD')}
            <Text>
              总计: {this.props.total>=0?'+':'-'}{this.props.total}
              {this.props.coin.symbol}
            </Text>
          </Text>
        </View>
        <View>
          {this.props.bills.map(bill => (
            <View>
              <BillItem bill={bill} />
            </View>
          ))}
        </View>
      </View>
    );
  }
}
