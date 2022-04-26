import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
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
      <Text style={{fontWeight: 'bold', fontSize: 18}}>本月结余</Text>
      <Text h3 h3Style={{color: 'pink'}}>
        -2246$
      </Text>
      <Text>
        本月支出<Text>-2246.47$</Text>
      </Text>
      <Text>
        本月收入<Text>-2246.47$</Text>
      </Text>
    </View>
  );
}
