import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';

export default class My extends Component {
  static name = 'my';
  ledger() {
    this.props.navigation.navigate({name: 'Ledger'});
  }
  currencyConversion(){
    this.props.navigation.navigate({name: 'Currency-Conversion'});
  }
  render() {
    return (
      <View>
        <Text>我的</Text>
        <Button title={'账本'} onPress={() => this.ledger()} />
        <Button title="汇率转换" onPress={() => this.currencyConversion()}/>
      </View>
    );
  }
}
