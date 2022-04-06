import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';

export default class My extends Component {
  static name = 'my';
  createLedger = () => {
    this.props.navigation.navigate({name:"Ceate-Ledger"});
  };
  render() {
    return (
      <View>
        <Text>我的</Text>
        <Button title={'新建账本'} onPress={this.createLedger} />
      </View>
    );
  }
}
