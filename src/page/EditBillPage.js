import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {Avatar, Button, ButtonGroup, Input, Icon} from 'react-native-elements';
import BillSignoryTable from '../component/BillSignoryTable';
import {getBillSignoriesByType} from '../service/BillService';
import AssetAccountDropDownSeletor from '../component/AssetAccountDropDownSeletor';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import LedgerSelector from '../component/LedgerSelector';
import {INCOME} from '../config/Constant';
import {EXPENSE} from '../constant/Const';
import {queryAllLedgers} from '../api/LedgerApi';
import {showSibling} from '../util/ViewUtil';
import Loading from '../component/Loading';
import {queryAllCoins} from '../api/CoinApi';
import {queryAllAccount} from '../api/AccountApi';
import {createBill, updateBill} from '../api/BillApi';
import CoinSelector from '../component/CoinSelector';
import dayjs from 'dayjs';

export default class EditBillPage extends Component {
  static name = 'Book-Keeping';
  constructor(props) {
    super(props);
    let {bill} = this.props.route.params;
    this.bill = bill;
    this.state = {
      signories: [],
      ledgers: [],
      coins: [],
      accounts: [],

      selectedLedger: bill.ledger,
      selectedSignory: bill.signory,
      selectedAccount: bill.account,
      selectedCoin: bill.coin,

      billType: bill.type,
      dateTime: dayjs(bill.dateTime, 'YYYY-MM-DD HH:mm:ss').toDate(),
      amount: Math.abs(bill.amount),
      remark: bill.remark,

      isVisibleDatePicker: false,
    };
    this.incomeSignories = [];
    this.expenseSignories = [];
    this.load();
  }

  async load() {
    const love = showSibling(<Loading />);
    const [a, b, c, d, e] = await Promise.all([
      getBillSignoriesByType(INCOME),
      getBillSignoriesByType(EXPENSE),
      queryAllLedgers(),
      queryAllCoins(),
      queryAllAccount(),
    ]);
    this.incomeSignories = a;
    this.expenseSignories = b;
    this.setState({
      ledgers: c.ledgers,
      signories:
        this.state.billType == EXPENSE
          ? this.expenseSignories
          : this.incomeSignories,
      coins: d,
      accounts: e,
    });
    love.destroy();
  }

  doUpdateBill() {
    const love = showSibling(<Loading />);
    updateBill({
      billID: this.bill.ID,
      ledgerID: this.state.selectedLedger.ID,
      signoryID: this.state.selectedSignory.ID,
      remark: this.state.remark,
      amount:  Number.parseFloat(this.state.amount),
      dateTime: dayjs(this.state.dateTime).format('YYYY-MM-DD HH:mm:ss'),
      type: this.state.billType,
      coinID: this.state.selectedCoin.ID,
      accountID: this.state.selectedAccount?.ID || null,
    })
      .then(bill => {
        if (bill) {
          this.props.navigation.navigate({
            name: 'Bill-Detail-Page',
            params: {bill: bill},
          });
        }
      })
      .finally(() => {
        love.destroy();
      });
  }

  doCreateBill() {
    createBill({
      accountID: this.state.selectedAccount
        ? this.state.selectedAccount.ID
        : null,
      amount: Number.parseFloat(this.state.amount),
      coinID: this.state.selectedCoin.ID,
      ledgerID: this.state.selectedLedger.ID,
      remark: this.state.remark,
      signoryID: this.state.selectedSignory.ID,
      type: this.state.billType,
      dateTime: dayjs(this.state.dateTime || new Date()).format(
        'YYYY-MM-DD HH:mm:ss',
      ),
    }).then(rsp => {
      this.props.navigation.goBack();
    });
  }

  changeBillType(billType) {
    if (this.state.billType != billType) {
      this.setState({
        billType: billType,
        signories:
          billType == INCOME ? this.incomeSignories : this.expenseSignories,
        selectedSignory: null,
      });
    }
  }

  hideDatePicker = () => {
    this.setState({isVisibleDatePicker: false});
  };
  setBillDate = date => {
    this.setState({dateTime: date});
    this.hideDatePicker();
  };

  render() {
    return (
      <View style={{height: '100%', width: '100%'}}>
        <View style={{flex: 1}}>
          <View>
            <LedgerSelector
              ledgers={this.state.ledgers}
              selectedLedger={this.state.selectedLedger}
              onSelect={ledger => {
                this.setState({
                  selectedLedger: ledger,
                });
              }}
            />
          </View>
          <View
            style={{
              marginVertical: 10,
            }}>
            <ButtonGroup
              selectedIndex={this.state.billType}
              buttons={['支出', '收入']}
              onPress={index => this.changeBillType(index)}
              containerStyle={{marginBottom: 10}}
            />
          </View>
          <ScrollView style={{height: '30%'}}>
            <BillSignoryTable
              selectedSignory={this.state.selectedSignory}
              onSelect={signory => this.setState({selectedSignory: signory})}
              signories={this.state.signories}
            />
          </ScrollView>
          <ScrollView style={{marginVertical: 5}}>
            <AssetAccountDropDownSeletor
              selectedAccount={this.state.selectedAccount}
              accounts={this.state.accounts}
              onSelect={account => {
                this.setState({selectedAccount: account});
              }}
            />
            <Input
              label="备注"
              value={this.state.remark}
              onChangeText={v => this.setState({remark: v})}
              labelStyle={{color: '#99cc66'}}
              placeholder="点击输入备注"
            />
            <Input
              label="金额"
              value={this.state.amount.toString()}
              onChangeText={v => this.setState({amount: v})}
              keyboardType="decimal-pad"
              placeholder="点击输入金额"
            />
            <CoinSelector
              coins={this.state.coins}
              selectedCoin={this.state.selectedCoin}
              onSelect={coin => {
                this.setState({
                  selectedCoin: coin,
                });
              }}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Button
                type="clear"
                icon={<Icon name="date" type="fontisto" />}
                titleStyle={{fontSize: 12, paddingLeft: 5}}
                title={
                  this.state.dateTime
                    ? dayjs(this.state.dateTime).format('YYYY-MM-DD\nHH:mm')
                    : '现在'
                }
                onPress={() => {
                  this.setState({isVisibleDatePicker: true});
                }}
              />
              <DateTimePickerModal
                date={this.state.dateTime || new Date()}
                mode="datetime"
                onConfirm={this.setBillDate}
                onCancel={this.hideDatePicker}
                isVisible={this.state.isVisibleDatePicker}
              />
              <Button
                title={'保存'}
                onPress={() => this.doUpdateBill()}
                buttonStyle={{backgroundColor: 'rgba(214, 61, 57, 1)'}}
                containerStyle={{width: '35%', height: '100%'}}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
