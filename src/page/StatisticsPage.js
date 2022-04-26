import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {ButtonGroup, Icon, Text} from 'react-native-elements';
import CalendarBottomSheet from '@/component/CalendarBottomSheet';
import MoneyCard from '../component/MoneyCard';
import MoneyTrendOverview from '../component/MoneyTrendOverview';
export function StatisticsPage(props) {
  let calendarSelectorRef = React.createRef();
  let [selectedBillTypeIndex, setSelectedBillTypeIndex] = React.useState(0);
  return (
    <View style={{width: '90%', height: '100%', alignSelf: 'center'}}>
      <View
        style={{
          marginVertical: 20,
          display: 'flex',
          flexDirection: 'row',
          alignSelf: 'flex-end',
        }}>
        <Text style={{fontSize: 18, alignSelf: 'center'}}>
          2022年的收支概况
        </Text>
        <Icon
          containerStyle={{paddingHorizontal: 8}}
          color={'orange'}
          type="material-icons"
          name="date-range"
          size={30}
          onPress={() => {
            calendarSelectorRef.current.open();
          }}
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontWeight: 'bold', alignSelf: 'center', fontSize: 16}}>
          2022年
        </Text>
        <ButtonGroup
          buttons={['支出', '收入']}
          containerStyle={{width: 200}}
          selectedIndex={selectedBillTypeIndex}
          onPress={index => setSelectedBillTypeIndex(index)}
        />
      </View>
      <View style={{marginVertical: 20}}>
        <MoneyCard />
      </View>
      <ScrollView>
        <MoneyTrendOverview />
      </ScrollView>
      <CalendarBottomSheet ref={calendarSelectorRef} />
    </View>
  );
}
