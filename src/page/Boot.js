import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Calendar, CalendarProvider} from 'react-native-calendars';
import {Text} from 'react-native-elements';
import DatePicker from 'react-native-modern-datepicker';
import {loadBootData} from '../api/TestApi';
import MutiCalendar from '../component/MutiCalendar';
import WeekCalendar from '../component/WeekCalendar';
import Home from './Home';

export default class BootPage extends Component {
  static name = 'Boot-Page';
  route;
  navigation;
  constructor(props) {
    super(props);
    this.route = props.route;
    this.navigation = props.navigation;
  }

  componentDidMount() {
    loadBootData().then(rsp=>{
      console.info(rsp.data);
      this.navigation
      .reset({
        index: 0,
        routes: [{name: "Home"}],
      });
    })
  }
  render() {
    return (
      <ScrollView style={{width:'100%',height:'100%'}}>
        <Text>启 动 页</Text>
      </ScrollView>
    );
  }
}
