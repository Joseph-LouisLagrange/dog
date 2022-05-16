import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import Toast from 'react-native-easy-toast';
import {Avatar, Icon, ListItem, Text} from 'react-native-elements';
import {queryDeletedAccountCount} from '../api/AccountApi';
import {queryDeletedBillCount} from '../api/BillApi';
import {queryDeletedLedgerCount} from '../api/LedgerApi';

export default class RecycleBinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailCount: 0,
      ledgerCount: 0,
      accountCount: 0,
    };
    this.load();
    this.toastRef = React.createRef();
  }

  async load() {
    let [l, o, v] = await Promise.all([
      queryDeletedAccountCount(),
      queryDeletedBillCount(),
      queryDeletedLedgerCount(),
    ]);
    this.setState({
      detailCount: o,
      ledgerCount: v,
      accountCount: l,
    });
  }

  render() {
    return (
      <View>
        <Toast
          ref={this.toastRef}
          position="top"
          positionValue={30}
          textStyle={{textAlign: 'center'}}
          style={{backgroundColor: '#FFB90F', width: '90%'}}
        />
        <Text h3 h3Style={{textAlign: 'center', paddingVertical: 30}}>
          回收站
        </Text>
        <ListItem
          bottomDivider
          onPress={() => {
            if (this.state.detailCount == 0) {
              this.toastRef.current.show('没有删除的账单,旺');
              return;
            }
            this.props.navigation.navigate('Recover-Bill-Page', {
              billsCount: this.state.detailCount,
              updateBillsCount: billsCount => {
                this.setState({
                  detailCount: billsCount,
                });
              },
            });
          }}>
          <Icon type="ant-design" name="minussquareo" size={40} />
          <ListItem.Content>
            <ListItem.Title>明细</ListItem.Title>
            <ListItem.Subtitle>
              {this.state.detailCount}条内容
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider>
          <Icon type="ant-design" name="wallet" size={40} />
          <ListItem.Content>
            <ListItem.Title>账户资产</ListItem.Title>
            <ListItem.Subtitle>
              {this.state.accountCount}条内容
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem
          onPress={() => {
            if (this.state.ledgerCount == 0) {
              this.toastRef.current.show('没有删除的账本,旺');
              return;
            }
            this.props.navigation.navigate('Recover-Ledger-Page', {
              ledgersCount: this.state.ledgerCount,
              updateLedgersCount: ledgersCount => {
                this.setState({
                  ledgerCount: ledgersCount,
                });
              },
            });
          }}>
          <Icon type="ant-design" name="switcher" size={40} />
          <ListItem.Content>
            <ListItem.Title>账本</ListItem.Title>
            <ListItem.Subtitle>
              {this.state.ledgerCount}条内容
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    );
  }
}
