import CookieManager from '@react-native-cookies/cookies';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Component} from 'react';
import {TouchableHighlight, View} from 'react-native';
import {Avatar, Button, Card, Divider, Icon, Text} from 'react-native-elements';
import {FlatGrid} from 'react-native-super-grid';
/**
 * <Text>我的</Text>
        <Button title={'账本'} onPress={() => this.ledger()} />
        <Button title="汇率转换" onPress={() => this.currencyConversion()} />
        <Button
          title="退出登录"
          onPress={() => {
            CookieManager.clearAll().then(res => {
              if (res) {
                this.props.navigation.navigate({name: 'Login'});
              }
            });
          }}
        />
        <Button
          title="回收站"
          onPress={() => {
            this.props.navigation.navigate({name: 'Recycle-Bin-Page'});
          }}
        />
 */

const features = [
  {
    name: '账本',
    icon: {
      type: 'foundation',
      name: 'clipboard-notes',
      color: '#008B8B',
    },
    routeName: 'Ledger',
  },
  {
    name: '汇率转换',
    icon: {
      type: 'font-awesome',
      name: 'exchange',
      color: '#FFD700',
    },
    routeName: 'Currency-Conversion',
  },
  {
    name: '回收站',
    icon: {
      type: 'ant-design',
      name: 'delete',
      color: '#8B7D6B',
    },
    routeName: 'Recycle-Bin-Page',
  },
  {
    name: '关于我们',
    icon: {
      type: 'feather',
      name: 'phone-call',
      color: '#32CD32',
    },
    routeName: '',
  },
];

export default class My extends Component {
  static name = 'my';
  render() {
    return (
      <View
        style={{
          width: '90%',
          height: '100%',
          paddingTop: 70,
          alignSelf: 'center',
        }}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Avatar
            size={80}
            containerStyle={{alignSelf: 'center'}}
            source={{
              uri: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wHgh?ver=1209',
            }}
            rounded>
            <Avatar.Accessory type="ant-design" name="camerao" size={20} />
          </Avatar>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <Text style={{textAlignVertical: 'center'}}>乌托邦</Text>
            <Icon type="ant-design" name="edit" />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
              marginVertical: 10,
            }}>
            <Text style={{fontSize: 18}}>记账天数 {133}</Text>
            <Divider orientation="vertical" width={5} />
            <Text style={{fontSize: 18}}>记账笔数 {10}</Text>
          </View>
        </View>
        <Card containerStyle={{width: '100%', alignSelf: 'center'}}>
          <Card.Title>常用功能</Card.Title>
          <Card.Divider />
          <FlatGrid
            itemDimension={60}
            data={features}
            renderItem={({item: {icon, name, routeName}}) => (
              <TouchableHighlight
                underlayColor="pink"
                onPress={() => {
                  this.props.navigation.navigate(routeName);
                }}>
                <View>
                  <Avatar
                    containerStyle={{paddingBottom: 10, alignSelf: 'center'}}
                    icon={{type: icon.type, name: icon.name, color: icon.color}}
                    rounded
                    size={50}
                  />
                  <Text style={{textAlign: 'center'}}>{name}</Text>
                </View>
              </TouchableHighlight>
            )}
          />
        </Card>
      </View>
    );
  }
}
