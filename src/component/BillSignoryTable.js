import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import Swiper from 'react-native-swiper';
const Style = StyleSheet.create({
  btn: {
    width: '23%',
    marginVertical: 10,
    marginRight:2,
    marginLeft:3
  },
});

export default class BillSignoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }
  static getDerivedStateFromProps(nextProps, state) {
    return {...nextProps};
  }

  render() {
    // 生成 buttons
    let buttons = this.props.signories.map(signory => (
      <Button
        onPress={() => this.state.onSelectID(signory.ID)}
        containerStyle={Style.btn}
        title={signory.name}
        buttonStyle={
          this.state.selectedSignoryID == signory.ID
            ? {backgroundColor: 'rgba(255, 193, 7, 1)'}
            : {backgroundColor: 'rgba(244, 244, 244, 1)'}
        }
        titleStyle={{color: 'black'}}
      />
    ));
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          // justifyContent: 'flex-start',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {buttons}
      </View>
    );
  }
}
