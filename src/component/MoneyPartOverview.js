import React, {Component} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {VictoryPie} from 'victory-native';
import {EXPENSE, INCOME} from '../constant/Const';

const yy = {};
yy[EXPENSE] = '支出';
yy[INCOME] = '收入';

function toData(moneySignoryPart) {
  return moneySignoryPart.map(({signory, percent}) => {
    return {
      x: signory.name,
      y: percent,
    };
  });
}

export default class MoneyPartOverview extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          ...this.props.style,
          borderColor: 'black',
          borderWidth: 2,
          borderRadius: 20,
          padding: 15,
          width: this.props.width,
          height: this.props.height,
        }}>
        <View
          style={{
            paddingBottom: 10,
            borderBottomColor: 'black',
            borderBottomWidth: 2,
          }}>
          <Text style={{fontSize: 18}}>{yy[this.props.type]}占比概况</Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          <VictoryPie
            width={this.props.width * 0.9}
            data={toData(this.props.moneySignoryPart)}
          />
        </View>
      </View>
    );
  }
}
