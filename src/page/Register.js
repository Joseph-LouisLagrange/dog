import React, {Component} from 'react';
import {View} from 'react-native';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import {
  Avatar,
  BottomSheet,
  Button,
  Input,
  ListItem,
  Overlay,
  Text,
} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {login} from '../service/UserSerive';
import {baseURL} from '../config/ApiConfig';
import {APPLICATION_FORM_DATA} from '../constant/Const';
import {makeUsername, register} from '../api/UserApi';
export default class Register extends Component {
  route;
  navigation;
  constructor(props) {
    super(props);
    this.route = props.route;
    this.navigation = props.navigation;
    this.state = {
      selectVisible: false,
      avatarInfo: null,
      username: '',
      password: '',
      nickName: '',
    };
    this.doMakeUsername();
  }

  doMakeUsername() {
    makeUsername().then(username => {
      this.setState({
        username: username,
      });
    });
  }

  setSelectorIsVisible = selectVisible => {
    this.setState({selectVisible: selectVisible});
  };

  launchCamera0 = () => {
    request(PERMISSIONS.ANDROID.CAMERA).then(result => {
      launchCamera().then(rsp => {
        this.setAavatar(rsp);
      });
    });
  };

  setAavatar(rsp) {
    if (!rsp.didCancel) {
      this.setState({
        avatarInfo: rsp.assets[0],
        selectVisible: false,
      });
    }
  }

  launchImageLibrary0 = () => {
    launchImageLibrary().then(rsp => {
      this.setAavatar(rsp);
    });
  };

  doRegister() {
    register({
      avatar: {
        type: this.state.avatarInfo.type,
        path: this.state.avatarInfo.uri,
      },
      nickName: this.state.nickName,
      password: this.state.password,
    })
      .then(rsp => {
        console.debug(rsp.info());
        console.debug(rsp.json());
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <View
          style={{
            marginTop: '20%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Avatar
              onPress={() => this.setSelectorIsVisible(true)}
              size={60}
              rounded
              source={
                this.state.avatarInfo
                  ? {uri: this.state.avatarInfo.uri}
                  : undefined
              }
              icon={
                this.state.avatarInfo
                  ? undefined
                  : {name: 'plus', type: 'ant-design'}
              }
              containerStyle={{
                borderColor: 'grey',
                borderStyle: 'solid',
                borderWidth: 1,
              }}>
              <Avatar.Accessory size={20} />
            </Avatar>
          </View>
          <View style={{marginTop: 20, width: '80%'}}>
            <Input
              keyboardType="numeric"
              placeholder="账号"
              value={this.state.username}
              disabled={true}
            />
            <Input
              placeholder="昵称"
              value={this.state.nickName}
              onChangeText={value => {
                this.setState({
                  nickName: value,
                });
              }}
            />
            <Input
              secureTextEntry={true}
              placeholder="密码"
              value={this.state.password}
              onChangeText={value =>
                this.setState({
                  password: value,
                })
              }
            />
            <Input secureTextEntry={true} placeholder="确认密码" />
            <Button title={'注册'} onPress={() => this.doRegister()} />
          </View>
        </View>
        <BottomSheet isVisible={this.state.selectVisible}>
          <ListItem bottomDivider onPress={this.launchCamera0}>
            <ListItem.Content>
              <ListItem.Title>拍照</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider onPress={this.launchImageLibrary0}>
            <ListItem.Content>
              <ListItem.Title>相册</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem
            bottomDivider
            containerStyle={{backgroundColor: 'red'}}
            onPress={() => this.setSelectorIsVisible(false)}>
            <ListItem.Content>
              <ListItem.Title style={{color: 'white'}}>取消</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </BottomSheet>
      </View>
    );
  }
}
