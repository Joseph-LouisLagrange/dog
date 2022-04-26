import dayjs from 'dayjs';
import React, {Component} from 'react';
import {View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Text} from 'react-native-elements';

export default class WeekCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: {
        
      },
    };
  }

  dayOnPress(day) {
    console.debug(day,"被点击");
    // 计算day所属的周的开始时间与结束时间（一共7天）
    let d = dayjs(day.timestamp).day();
    let start = dayjs(day.timestamp).subtract(d, 'day');
    let end = start.clone().add(6, 'day');
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
    console.info(selectedDays);
    this.setState({
      selectedDays: selectedDays,
    });
    this.props.onSelect(Object.keys(selectedDays));
  }


  render() {
    return (
      <View>
        <Calendar
          markingType="period"
          enableSwipeMonths={true}
          onDayPress={day => this.dayOnPress(day)}
          markedDates={this.state.selectedDays}
        />
      </View>
    );
  }
}
