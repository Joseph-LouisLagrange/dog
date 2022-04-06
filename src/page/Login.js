import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button, Input, CheckBox} from 'react-native-elements';
import {loginByUsernameAndPassword} from '../api/UserApi';
import {stayLoginState} from '../service/UserSerive';
import { getVerify } from '../service/Verify';

export default class Login extends Component {
  static name = "login";
  route;
  navigation;
  constructor(props) {
    super(props);
    this.route = props.route;
    this.navigation = props.navigation;
    this.state = {
      rememberPassword: false,
      username:"",
      password:""
    };
  }
  register = () => {
    this.navigation.navigate({name:"Register"});
  }
  checkUsername(){
    let verify = getVerify("username");
    if(verify.regExp.test(username)){
        return true;
    }

    return false;
  }
  login = () => {
    let username =  this.state.username.trim();
    let password =  this.state.password;
    let sessionID = loginByUsernameAndPassword(username,password);
    stayLoginState(sessionID);
    this.navigation
      .reset({
        index: 0,
        routes: [{name: "Home"}],
      });
    //jump(this.navigation,'home',{});
  }
  render() {
    return (
      <View style={Style['body']}>
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
              errorMessage={""}
            />
            <Input
              placeholder="密码"
              onChangeText={password => {
                this.setState({password: password});
              }}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={Style.v1}>
            <View>
              <CheckBox title={'记住密码'} checked={this.state.rememberPassword} onPress={() => this.setState({rememberPassword: !this.state.rememberPassword})}/>
            </View>
            <Text>
              <Text>还没有账号? </Text><Text style={{color:'#3ADF00',marginRight:10,lineHeight:55}} onPress={this.register}>注册账号</Text>
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
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 30,
    //backgroundColor: 'yellow'
  },
});
