import dayjs from 'dayjs';
import React, {Component} from 'react';
import {View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Text} from 'react-native-elements';

export default class WeekCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: this.getMarkWeek(dayjs(this.props.defaultDate)),
    };
  }

  getMarkWeek(day) {
    let start = dayjs(day).startOf('week');
    let end = dayjs(day).endOf('week');
    let selectedDays = {};
    for (let i = 0; i < 7; i++) {
      selectedDays[start.clone().add(i, 'day').format('YYYY-MM-DD')] = {
        color: '#66CCFF',
        textColor: '#FFFFFF',
      };
    }
    // 设置 start,end 圆角
    selectedDays[start.format('YYYY-MM-DD')].startingDay = true;
    selectedDays[end.format('YYYY-MM-DD')].endingDay = true;
    return selectedDays;
  }

  dayOnPress(day) {
    // 计算day所属的周的开始时间与结束时间（一共7天）
    let selectedDays = this.markWeek(dayjs(day.timestamp));
    this.setState({
      selectedDays: selectedDays,
    });
    this.props.onSelect(selectedDays);
  }

  render() {
    return (
      <View>
        <Calendar
          markingType="period"
          enableSwipeMonths={true}
          onDayPress={day => this.dayOnPress(day)}
          markedDates={ this.state.selectedDays }
        />
      </View>
    );
  }
}
