import dayjs from 'dayjs';
import React, {Component} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import BillItem from './BillItem';
import {MoneyView} from './MoneyView';

export default class BillItemBlock extends Component {
  constructor(props) {
    super(props);
    this.billItemRefs = {};
    this.props.bills.forEach(
      bill => (this.billItemRefs[bill.ID] = React.createRef()),
    );
  }

  selectAll() {
    Object.values(this.billItemRefs).forEach(ref => ref.current.select());
  }

  unselectAll() {
    Object.values(this.billItemRefs).forEach(ref => ref.current.unselect());
  }

  render() {
    return (
      <View style={this.props.style}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18}}>
            {this.props.dateTime && dayjs(this.props.dateTime).format('MM.DD')}
          </Text>
          <Text style={{fontSize: 18}}>
            总计: <MoneyView money={this.props.total} />
            {this.props.coin && this.props.coin.symbol}
          </Text>
        </View>
        <View style={{marginVertical: 10}}>
          {this.props.bills.map(bill => (
            <BillItem
              ref={this.billItemRefs[bill.ID]}
              disabled={this.props.disabled}
              selectMode={this.props.selectMode}
              key={bill.ID}
              bill={bill}
              onSelect={bill => {
                if (this.props.onSelectBill) {
                  this.props.onSelectBill(bill);
                }
              }}
              onUnselect={bill => {
                if (this.props.onUnselectBill) {
                  this.props.onUnselectBill(bill);
                }
              }}
              onPress={b => this.props.onPressItem(b)}
            />
          ))}
        </View>
      </View>
    );
  }
}
