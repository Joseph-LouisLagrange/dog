import React, {Component} from 'react';
import {View} from 'react-native';
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
import { login } from '../service/UserSerive';
export default class Register extends Component {
  route;
  navigation;
  constructor(props) {
    super(props);
    this.route = props.route;
    this.navigation = props.navigation;
    this.state = {
      selectVisible: false,
    };
  }
  setSelectorIsVisible = selectVisible => {
    this.setState({selectVisible: selectVisible});
  };

  launchCamera0 = () => {
    request(PERMISSIONS.ANDROID.CAMERA).then(result => {
      launchCamera().then(rsp => {});
    });
  };

  launchImageLibrary0 = () => {
    launchImageLibrary().then(rsp => {
      console.info(rsp);
    });
  };

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
              icon={{name: 'plus', type: 'ant-design'}}
              containerStyle={{
                borderColor: 'grey',
                borderStyle: 'solid',
                borderWidth: 1,
              }}>
              <Avatar.Accessory size={20} />
            </Avatar>
          </View>
          <View style={{marginTop: 20,width:'80%'}}>
            <Input placeholder='用户名'/>
            <Input placeholder='密码'/>
            <Input placeholder='确认密码'/>
            <Button title={'注册'} onPress={()=>login()} />
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
