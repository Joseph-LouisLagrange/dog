import CookieManager from '@react-native-cookies/cookies';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';

export default class My extends Component {
  static name = 'my';
  ledger() {
    this.props.navigation.navigate({name: 'Ledger'});
  }
  currencyConversion() {
    this.props.navigation.navigate({name: 'Currency-Conversion'});
  }
  render() {
    return (
      <View>
        <Text>我的</Text>
        <Button title={'账本'} onPress={() => this.ledger()} />
        <Button title="汇率转换" onPress={() => this.currencyConversion()} />
        <Button
          title="退出登录"
          onPress={() => {
            CookieManager.clearAll().then(res => {
              if (res) {
                this.props.navigation.navigate({name: 'Login'});
              }
            });
          }}
        />
        <Button
          title="回收站"
          onPress={() => {
            this.props.navigation.navigate({name: 'Recycle-Bin-Page'});
          }}
        />
      </View>
    );
  }
}
