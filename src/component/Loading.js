import React, {Component} from 'react';
import {View} from 'react-native';
import {Overlay} from 'react-native-elements';
import * as Progress from 'react-native-progress';
export default class Loading extends Component {
  render() {
    return (
      <Overlay
        fullScreen={true}
        overlayStyle={{opacity: 0.6, backgroundColor: '#000000'}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}>
          <Progress.Circle
            style={{alignSelf: 'center'}}
            size={30}
            indeterminate={true}
            borderWidth={2}
          />
        </View>
      </Overlay>
    );
  }
}
