import React, {Component} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import LedgerCover from './LedgerCover';

export default class LedgerFace extends Component {
  render() {
    return (
      <View
        style={{
          display: 'flex',
          width: '100%',
          alignSelf: 'center',
          borderWidth: 2,
          borderRadius:20,
          padding:20,
          borderColor: '#008B8B',
          flexDirection: 'row',
        }}>
        <View style={{backgroundColor: '#FFFACD'}}>
          <LedgerCover
            name={this.props.ledger.name}
            uri={this.props.ledger.coverUri}
          />
        </View>
        <View style={{justifyContent: 'space-around',marginLeft:'5%'}}>
          <Text style={{fontWeight:'bold'}}>结余:{this.props.ledger.surplus}</Text>
          <Text style={{fontWeight:'bold'}}>已记录:{this.props.ledger.billCount}笔</Text>
          <Text style={{color: '#7FFF00'}}>
            {this.props.ledger.using ? '正在使用' : ''}
          </Text>
        </View>
      </View>
    );
  }
}
