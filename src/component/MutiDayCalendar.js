import dayjs from 'dayjs';
import React, {Component} from 'react';
import {View} from 'react-native';
import {Calendar, CalendarUtils} from 'react-native-calendars';
import { Text } from 'react-native-elements';

// 多选日号日历
export default class MutiDayCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markedDates: this.getMarkedDates(dayjs(this.props.defaultDay),{}),
    };
  }

  getMarkedDates(day,markedDates){
    let dayKey = dayjs(day).format("YYYY-MM-DD");
    if (markedDates[dayKey]) {
      // 已存在，要取消
      markedDates[dayKey] = undefined;
    } else {
      markedDates[dayKey] = {
        color: '#66CCFF',
        textColor: '#FFFFFF',
        startingDay: true,
        endingDay: true,
      };
    }
    return markedDates
  }

  dayPress(day) {
    let markedDates = this.getMarkedDates(new Date(day.timestamp),this.state.markedDates);
    this.setState({
      markedDates: markedDates,
    });
    let days = Object.keys(markedDates).map(day=>new Date(day)).map(date=>dayjs(date));
     this.props.onSelect(days);
  }

  render() {
    return (
      <View>
        <Calendar 
          markingType="period"
          onDayPress={day => this.dayPress(day)}
          markedDates={this.state.markedDates}
        />
      </View>
    );
  }
}
