import React, {Component} from 'react';
import {View} from 'react-native';
import dayjs from 'dayjs';
import {BottomSheet, Button, ButtonGroup, Text} from 'react-native-elements';
import DatePicker from 'react-native-modern-datepicker';
import RBSheet from 'react-native-raw-bottom-sheet';
import MutiDayCalendar from './MutiDayCalendar';
import WeekCalendar from './WeekCalendar';
import {ScrollView} from 'react-native-gesture-handler';
import YearCalendar from './YearCalendar';
import MonthCalendar from './MonthCalendar';

export default class CalendarBottomSheet extends Component {
  yy = {
    week: 0,
    month: 1,
    day: 2,
    year: 3,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: this.yy[this.props.initMode],
      isVisible: true,
      month: {
        tempSelectedState: dayjs(),
        selectedState: dayjs(),
        ranges: [
          {startDate: dayjs().startOf('month')},
          {startDate: dayjs().endOf('month')},
        ],
      },
      week: {
        tempSelectedState: dayjs(),
        selectedState: dayjs(),
        ranges: [
          {startDate: dayjs().startOf('week'), endDate: dayjs().endOf('week')},
        ],
      },
      day: {
        tempSelectedState: dayjs(),
        selectedState: dayjs(),
        ranges: [
          {startDate: dayjs().startOf('day'), endDate: dayjs().endOf('day')},
        ],
      },
      year: {
        tempSelectedState: dayjs().year(),
        selectedState: dayjs().year(),
        ranges: [
          {startDate: dayjs().startOf('year'), endDate: dayjs().endOf('year')},
        ],
      },
    };
  }

  hide() {
    this.setState({
      isVisible: false,
    });
  }

  open() {
    this.RBSheet.open();
  }

  close() {
    this.RBSheet.close();
  }

  render() {
    let calendarsMap = [
      {
        title: '周',
        component: (
          <WeekCalendar
            defaultDate={this.state.week.selectedState}
            onSelect={selectedDays => {
              let days = Object.keys(selectedDays);
              this.setState({
                week: {
                  ranges: [
                    {
                      startDate: dayjs(days[0]).startOf('day'),
                      endDate: dayjs(days[6]).endOf('day'),
                    },
                  ],
                  tempSelectedState: dayjs(days[0]).toDate(),
                  selectedState: this.state.week.selectedState,
                },
              });
            }}
          />
        ),
      },
      {
        title: '月',
        component: (
          <MonthCalendar
            defaultYear={this.state.month.selectedState.year()}
            defaultMonth={this.state.month.selectedState.month()}
            onSelect={yearMonth => {
              this.setState({
                month: {
                  ranges: [
                    {
                      startDate: dayjs(yearMonth).startOf('month'),
                      endDate: dayjs(yearMonth).endOf('month'),
                    },
                  ],
                  tempSelectedState: yearMonth,
                  selectedState: this.state.month.selectedState,
                },
              });
            }}
          />
        ),
      },
      {
        title: '日',
        component: (
          <MutiDayCalendar
            defaultDay={this.state.day.selectedState}
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
                  selectedState: this.state.day.selectedState,
                  tempSelectedState: selectedDays,
                },
              });
            }}
          />
        ),
      },
      {
        title: '年',
        component: (
          <YearCalendar
            defaultYear={this.state.year.selectedState}
            startYear={2000}
            endYear={dayjs().get('year')}
            onSelect={year => {
              dayjs().year(year).startOf('year');
              this.setState({
                year: {
                  ranges: [
                    {
                      startDate: dayjs().year(year).startOf('year'),
                      endDate: dayjs().year(year).endOf('year'),
                    },
                  ],
                  selectedState: this.state.year.selectedState,
                  tempSelectedState: year,
                },
              });
            }}
          />
        ),
      },
    ];
    return (
      <RBSheet
        openDuration={250}
        animationType="slide"
        customStyles={{
          container: {
            height: 450,
          },
        }}
        ref={ref => (this.RBSheet = ref)}>
        <Button
          title={'确定'}
          onPress={() => {
            let days = null;
            let mode = '';
            let idx = this.state.selectedIndex;
            switch (idx) {
              case 0:
                mode = 'week';
                days = this.state.week.ranges;
                break;
              case 1:
                mode = 'month';
                days = this.state.month.ranges;
                break;
              case 2:
                mode = 'day';
                days = this.state.day.ranges;
                break;
              case 3:
                mode = 'year';
                days = this.state.year.ranges;
                break;
            }
            let week = this.state.week;
            week.selectedState = week.tempSelectedState;
            let month = this.state.month;
            month.selectedState = month.tempSelectedState;
            let day = this.state.day;
            day.selectedState = day.tempSelectedState;
            let year = this.state.year;
            year.selectedState = year.tempSelectedState;
            this.setState({
              // 维持状态
              week: week,
              month: month,
              day: day,
              year: year,
            });
            this.props.confirm({
              ranges: days,
              mode: mode,
            });
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
            buttons={calendarsMap.map(c => c.title)}
          />
          <View>{calendarsMap[this.state.selectedIndex].component}</View>
        </View>
      </RBSheet>
    );
  }
}
