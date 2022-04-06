import React, { Component } from 'react'
import { View } from 'react-native'
import { Image, Text } from 'react-native-elements'

export default class LedgerCover extends Component {
  render() {
    return (
      <View style={{width:80,height:90}}>
          <View style={{width:'100%',height:'80%'}}>
              <Image source={{uri:this.props.uri}} style={{width:"100%",height:"100%"}}/>
          </View>
          <Text style={{textAlign:'center'}}>{this.props.name}</Text>
      </View>
    )
  }
}
