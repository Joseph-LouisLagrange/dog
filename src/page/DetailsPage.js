import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {getUsingLedger} from '../api/LedgerApi';
import {Calendar, LocaleConfig} from 'react-native-calendars';

export default class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountDateText: '2022年3月',
      usingLedger: {coin: {}},
      timeUnitText: '',
      cashSurplus: 0,
      selectedDates: {},
    };
    this.loadLedgers();
  }

  loadLedgers() {
    getUsingLedger().then(usingLedger => {
      this.setState({
        usingLedger: usingLedger,
      });
    });
  }
  selectDate() {}
  render() {
    return (
      <View
        style={{
          width: '95%',
          height: '100%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            marginVertical: 20,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <Text
            h4
            h4Style={{
              textAlign: 'right',
              textAlignVertical: 'bottom',
            }}>
            {this.state.accountDateText}的账目明细
          </Text>
          <View style={{alignSelf: 'baseline'}}>
            <Icon
              color={'orange'}
              type="material-icons"
              name="date-range"
              size={30}
              onPress={() => {
                this.selectDate();
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: '10%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text h4>
            {this.state.usingLedger.name}
            <Icon type="ant-design" name="down" size={20} />
          </Text>
          <Icon type="font-awesome" name="search" size={30} />
        </View>
        <View
          style={{
            width: '90%',
            height: '25%',
            alignSelf: 'center',
            borderColor: 'red',
            borderWidth: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
          <Text>
            结余
            <Text>
              {this.state.cashSurplus} {this.state.usingLedger.coin.url}
            </Text>
          </Text>
          <Text>
            支出
            <Text>
              {this.state.cashSurplus} {this.state.usingLedger.coin.url}
            </Text>
          </Text>
          <Text>
            收入
            <Text>
              {this.state.cashSurplus} {this.state.usingLedger.coin.url}
            </Text>
          </Text>
        </View>
        <View style={{width: '95%', height: 200, alignSelf: 'center'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text h4>收支记录</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}>
              <Text style={{color: 'green', textAlign: 'center'}}>+ 新建</Text>
            </View>
          </View>
          <ScrollView></ScrollView>
        </View>
      </View>
    );
  }
}
