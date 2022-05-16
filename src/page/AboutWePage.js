import React, {Component} from 'react';
import {View} from 'react-native';
import {Image, ListItem, Text} from 'react-native-elements';

const weInfo = [
  {
    key: '开发者',
    value: '杨能(darwin)',
  },
  {
    key: 'QQ',
    value: '2580012389',
  },
  {
    key: '源码',
    value: 'https://github.com/Joseph-LouisLagrange',
  },
  {
    key: '邮箱',
    value: 'yn.darwin@outlook.com',
  },
  {
    key: '软件赞助商',
    value: '刘美君、李友、曾新、刘胡鑫',
  },
];

export default class AboutWePage extends Component {
  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Text h3 h3Style={{textAlign: 'center', paddingVertical: 20}}>
          关于我们
        </Text>
        <View
          style={{
            width: 300,
            height: 200,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Image
            style={{width: 100, height: 100, margin: 10}}
            source={require('@/assets/dog.png')}
          />
          <Text h4 h4Style={{textAlign: 'center'}}>
            旺旺记账1.6.8
          </Text>
          <Text>旺旺记账希望用帅气的旺财帮您养成记账好习惯</Text>
        </View>
        <View>
          {weInfo.map(info => (
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>{info.key}:</ListItem.Title>
              </ListItem.Content>
              <Text>{info.value}</Text>
            </ListItem>
          ))}
        </View>
      </View>
    );
  }
}
