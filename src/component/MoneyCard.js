import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {MoneyView} from './MoneyView';
function cc(mdoe) {
  switch (mdoe) {
    case 'week':
      return '本周';
    case 'month':
      return '本月';
    case 'year':
      return '本年';
    default:
      break;
  }
}
export default function MoneyCard(props) {
  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 20,
        height: 150,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 18}}>
        {cc(props.mode)}结余
      </Text>
      <Text h3 h3Style={{color: 'pink'}}>
        {props.coin.symbol}
        <MoneyView money={props.surplus} />
      </Text>
      <Text>
        {cc(props.mode)}支出: {props.coin.symbol}
        <MoneyView style={{color: '#000080'}} money={props.expense} />
      </Text>
      <Text>
        {cc(props.mode)}收入: {props.coin.symbol}
        <MoneyView style={{color: '#000080'}} money={props.income} />
      </Text>
    </View>
  );
}
