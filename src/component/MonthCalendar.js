import dayjs from 'dayjs';
import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements';

export default class MonthCalendar extends Component {
  constructor(props) {
    super(props);
    this.months = [];
    for (let i = 0; i < 12; i++) {
      this.months.push({title: `${i + 1}月`, month: i});
    }
    this.state = {
      year: this.props.defaultYear || new Date().getFullYear(),
      month: this.props.defaultMonth || new Date().getMonth(),
    };
  }
  render() {
    return (
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 30,
          }}>
          <Icon
            type="ant-design"
            name="left"
            size={30}
            onPress={() => {
              this.setState({
                year: this.state.year - 1,
              });
              this.props.onSelect(
                dayjs()
                  .year(this.state.year - 1)
                  .month(this.state.month),
              );
            }}
          />
          <Text style={{textAlignVertical: 'center', fontSize: 20}}>
            {this.state.year}
          </Text>
          <Icon
            type="ant-design"
            name="right"
            size={30}
            onPress={() => {
              this.setState({
                year: this.state.year + 1,
              });
              this.props.onSelect(
                dayjs()
                  .year(this.state.year + 1)
                  .month(this.state.month),
              );
            }}
          />
        </View>
        {/* 月份块 */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}>
          {this.months.map(m => (
            <Button
              key={m.month}
              type="outline"
              title={m.title}
              onPress={() => {
                this.setState({
                  month: m.month,
                });
                this.props.onSelect(
                  dayjs().year(this.state.year).month(m.month),
                );
              }}
              buttonStyle={
                m.month == this.state.month && {backgroundColor: '#1E90FF'}
              }
              titleStyle={m.month == this.state.month && {color: 'white'}}
              containerStyle={{
                width: '20%',
                marginVertical: 10,
                marginHorizontal: '6%',
              }}
            />
          ))}
        </View>
      </View>
    );
  }
}
