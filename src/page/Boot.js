import { TabBar } from '@ant-design/react-native';
import React, {Component} from 'react';
import {View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import {ping} from '../api/Public';
import {isLogin} from '../api/UserApi';

export default class BootPage extends Component {
  static name = 'Boot-Page';
  route;
  navigation;

  constructor(props) {
    super(props);
    this.route = props.route;
    this.navigation = props.navigation;
  }

  async iLoveYou() {
    const pong = await ping();
    if (pong == 'pong') {
      const love = await isLogin();
      if (love) {
        this.navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else {
        this.navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    }
  }

  componentDidMount() {
     this.iLoveYou();
  }
  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Image
          source={require('@/assets/setup/welcome.jpeg')}
          style={{width: '100%', height: '100%'}}
        />
      </View>
    );
  }
}
