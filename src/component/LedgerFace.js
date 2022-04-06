import React, {Component} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import LedgerCover from './LedgerCover';

export default class LedgerFace extends Component {
  render() {
    return (
      <View
        style={{display:'flex',width: '80%', alignSelf: 'center',borderWidth:2,borderColor:'bule',flexDirection:'row'}}>
        <View style={{backgroundColor:'red'}}>
          <LedgerCover name="cccc" />
        </View>
        <View style={{justifyContent:"space-around"}}>
          <Text>结余:</Text>
          <Text>已记录:{}笔</Text>
          <Text>{this.props.using?"正在使用":""}</Text>
        </View>
      </View>
    );
  }
}
