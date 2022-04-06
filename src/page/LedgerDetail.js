import React, {Component} from 'react';
import { View } from 'react-native';
import {Text} from 'react-native-elements';

export default class LedgerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ...props
    }
  }
  render() {
    return (
        <View>
            <View>
                <Text>本周结余:<Text>5578.0</Text></Text>
            </View>
        </View>
    )
  }
}
