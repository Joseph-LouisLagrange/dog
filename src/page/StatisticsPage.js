import React, {Component} from 'react';
import {ScrollView, useWindowDimensions, View} from 'react-native';
import {ButtonGroup, Icon, Text} from 'react-native-elements';
import CalendarBottomSheet from '@/component/CalendarBottomSheet';
import MoneyCard from '../component/MoneyCard';
import MoneyTrendOverview from '../component/MoneyTrendOverview';
import {Button, DatePickerView, Tabs} from '@ant-design/react-native';
import dayjs from 'dayjs';
import {EXPENSE, INCOME} from '../constant/Const';
import MoneyPartOverview from '../component/MoneyPartOverview';

const yy = ['支出', '收入'];

export function StatisticsPage(props) {
  let calendarSelectorRef = React.createRef();
  let [selectedBillType, setSelectedBillType] = React.useState(EXPENSE);
  let [period, setPeriod] = React.useState(dayjs().format('YYYY年MM月'));
  let [mode, setMode] = React.useState('month');
  let windows = useWindowDimensions();
  return (
    <ScrollView
      style={{width: '90%', height: '100%', alignSelf: 'center'}}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          marginVertical: 20,
          display: 'flex',
          flexDirection: 'row',
          alignSelf: 'flex-end',
        }}>
        <Text style={{fontSize: 18, alignSelf: 'center'}}>
          {period}收支概况
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
          {period}
        </Text>
        <ButtonGroup
          buttons={yy}
          containerStyle={{width: 200}}
          selectedIndex={selectedBillType}
          onPress={index => setSelectedBillType(index)}
        />
      </View>
      <View style={{marginVertical: 20}}>
        <MoneyCard
          mode={mode}
          surplus={12350454}
          expense={-4568}
          income={7949}
        />
      </View>
      <View style={{marginVertical:10}}>
        <MoneyTrendOverview
          width={windows.width * 0.9}
          height={500}
          mode="month"
          consequent={true}
          average={1000.12}
          data={{}}
          coin={{}}
          type={INCOME}
          highest={{type: INCOME, amount: 3699.56}}
        />
      </View>
      <View style={{marginVertical:10}}>
        <MoneyPartOverview type={selectedBillType} width={windows.width * 0.9}/>
      </View>
      <CalendarBottomSheet
        initMode={'month'}
        ref={calendarSelectorRef}
        confirm={({ranges, mode}) => {
          let p = null;
          setMode(mode);
          switch (mode) {
            case 'week':
              p =
                dayjs(ranges[0].startDate).format('MM.DD') +
                '-' +
                dayjs(ranges[0].endDate).format('MM.DD');
              break;
            case 'month':
              p = dayjs(ranges[0].startDate).format('YYYY年MM月');
              break;
            case 'day':
              p = null;
              break;
            case 'year':
              p = dayjs(ranges[0].startDate).format('YYYY年');
              break;

            default:
              break;
          }
          setPeriod(p);
          calendarSelectorRef.current.close();
        }}
      />
    </ScrollView>
  );
}
