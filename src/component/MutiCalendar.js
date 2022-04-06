import React, {Component} from 'react';
import {View} from 'react-native';
import {Calendar, CalendarUtils} from 'react-native-calendars';

// 多选日号日历
export default class MutiCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markedDates: {},
    };
  }
  dayPress(day) {
    let m = this.state.markedDates;
    if (m[day.dateString]) {
      // 已存在，要取消
      m[day.dateString] = undefined;
    } else {
      m[day.dateString] = {
        color: '#66CCFF',
        textColor: '#FFFFFF',
        startingDay: true,
        endingDay: true,
      };
    }
    this.setState({
      markedDates: {
        ...m,
      },
    });
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
