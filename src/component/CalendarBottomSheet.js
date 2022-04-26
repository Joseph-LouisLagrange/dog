import React, {Component} from 'react';
import {View} from 'react-native';
import dayjs from 'dayjs';
import {BottomSheet, Button, ButtonGroup} from 'react-native-elements';
import DatePicker from 'react-native-modern-datepicker';
import RBSheet from 'react-native-raw-bottom-sheet';
import MutiCalendar from './MutiCalendar';
import WeekCalendar from './WeekCalendar';

export default class CalendarBottomSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
      isVisible: true,
      month: {
        ranges: [],
      },
      week: {
        ranges: [],
      },
      day: {
        ranges: [],
      },
    };
  }

  hide() {
    this.setState({
      isVisible: false,
    });
  }

  displayCalendar() {
    if (this.state.selectedIndex == 0) {
      return (
        <WeekCalendar
          onSelect={selectedDays => {
            this.setState({
              week: {
                ranges: [
                  {
                    startDate: dayjs(selectedDays[0]).startOf('day'),
                    endDate: dayjs(selectedDays[6]).endOf('day'),
                  },
                ],
              },
            });
          }}
        />
      );
    } else if (this.state.selectedIndex == 1) {
      return (
        <DatePicker
          mode="monthYear"
          onMonthYearChange={m => {
            let temp = m.split(' ');
            let date = new Date(temp[0], temp[1] - 1, 1);
            this.setState({
              month: {
                ranges: [
                  {
                    startDate: dayjs(date).startOf('month'),
                    endDate: dayjs(date).endOf('month'),
                  },
                ],
              },
            });
          }}
        />
      );
    } else {
      return (
        <MutiCalendar
          onSelect={selectedDays => {
            let days = selectedDays.map(day => {
              return {
                startDate: dayjs(day).startOf('day'),
                endDate: dayjs(day).endOf('day'),
              };
            });
            this.setState({
              day: {
                ranges: days,
              },
            });
          }}
        />
      );
    }
  }

  open() {
    console.debug('打开日历');
    this.RBSheet.open();
  }

  close() {
    this.RBSheet.close();
  }

  render() {
    return (
      <RBSheet
        openDuration={250}
        animationType="slide"
        customStyles={{
          container: {
            height: 400,
          },
        }}
        ref={ref => (this.RBSheet = ref)}>
        <Button
          title={'确定'}
          onPress={() => {
            let days = null;
            let idx = this.state.selectedIndex;
            if (idx == 0) {
              days = this.state.week.ranges;
            } else if (idx == 1) {
              days = this.state.month.ranges;
            } else {
              days = this.state.day.ranges;
            }
            this.props.confirm(days);
          }}
        />
        <View style={{height: 370}}>
          <ButtonGroup
            selectedIndex={this.state.selectedIndex}
            onPress={index =>
              this.setState({
                selectedIndex: index,
              })
            }
            buttons={['周', '月', '日']}
          />
          <View>{this.displayCalendar()}</View>
        </View>
      </RBSheet>
    );
  }
}
