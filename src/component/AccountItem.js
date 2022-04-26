import React from 'react';
import {View} from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { MoneyView } from './MoneyView';

export default function AccountItem(props) {
  const account = props.account;
  return (
    <View
      style={{
        marginVertical:10,
        width: '100%',
        height: 100,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10
      }}>
      <View style={{display:'flex',flexDirection:'row'}}>
        <Text h4 h4Style={{color:'#76EE00',textAlignVertical:'center'}}>{account.type.origin}</Text>
        <View style={{alignSelf:'center',marginLeft:15}}>
          <Text style={{fontSize:20}}>{account.name}</Text>
          <Text style={{fontSize:20}}>{account.remark}</Text>
        </View>
      </View>
      <Text style={{textAlignVertical:'center',fontSize:20}}>
        <MoneyView money={account.balance}/> {account.coin.symbol}
      </Text>
    </View>
  );
}
