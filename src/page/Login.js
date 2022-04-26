import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button, Input, CheckBox} from 'react-native-elements';
import {loginByUsernameAndPassword} from '../api/UserApi';
import {getVerify} from '../service/Verify';
import Toast, {DURATION} from 'react-native-easy-toast';
import storage from '../service/Storage';

export default class Login extends Component {
  static name = 'login';
  route;
  navigation;
  constructor(props) {
    super(props);
    this.route = props.route;
    this.navigation = props.navigation;
    this.state = {
      username: '5335361060',
      password: '123456',
    };
  }
  register = () => {
    this.navigation.navigate({name: 'Register'});
  };
  checkUsername() {
    let verify = getVerify('username');
    if (verify.regExp.test(username)) {
      return true;
    }

    return false;
  }
  login = () => {
    let username = this.state.username.trim();
    let password = this.state.password.trim();
    loginByUsernameAndPassword({username: username, password: password})
      .then(payload => {
        this.navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      })
      .catch(error => {
        if (error.response.status === 401) {
          // Unauthorized
          this.toast.show('账号或密码错误');
        }
        console.error(error);
      });
  };
  render() {
    return (
      <View style={Style['body']}>
        <Toast position="top" ref={toast => (this.toast = toast)} />
        <Text h1 style={Style['login-title']}>
          登录
        </Text>
        <View style={Style['pad-1']}></View>
        <View style={Style.form}>
          <View>
            <Input
              placeholder="账号"
              onChangeText={username => {
                this.setState({username: username});
              }}
              value={this.state.username}
              errorMessage={''}
            />
            <Input
              placeholder="密码"
              onChangeText={password => {
                this.setState({password: password});
              }}
              value={this.state.password}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={Style.v1}>
            <Text>
              <Text>还没有账号? </Text>
              <Text
                style={{color: '#3ADF00', marginRight: 10, lineHeight: 55}}
                onPress={this.register}>
                注册账号
              </Text>
            </Text>
          </View>
          <Button
            title={'登录'}
            containerStyle={{width: '90%'}}
            onPress={this.login}></Button>
        </View>
      </View>
    );
  }
}

const Style = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
  },
  'login-title': {
    marginTop: 30,
    marginLeft: 10,
  },
  'pad-1': {
    height: '20%',
    // backgroundColor: 'red',
  },
  form: {
    width: '100%',
  },
  v1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '90%',
    marginBottom: 30,
    //backgroundColor: 'yellow'
  },
});
