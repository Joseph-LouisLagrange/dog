import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, ButtonGroup} from 'react-native-elements';
import {isLogin} from '../service/UserSerive';
import {gotoCanBack} from '../util/Route';
import Bill from './Bill';
import Bookkeeping from './Bookkeeping';
import Detail from './Detail';
import My from './My';

export default class Home extends Component {
  static name = "Home";
  route;
  navigation;
  buttonsFuck = [
    {title: '明细', routeName: "Detail"},
    {title: '账单', routeName: "Bill"},
    {title: '记账', routeName: "Book-Keeping"},
    {
      title: '我的',
      routeName: "My",
    },
  ];
  constructor(props) {
    super(props);
    this.route = props.route;
    this.navigation = props.navigation;
  }
  componentDidMount() {
    if (!isLogin()) {
      this.navigation
        .reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
    }
  }
  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <ButtonGroup
            buttons={this.buttonsFuck.map(b => b.title)}
            onPress={index => {
              gotoCanBack(this.navigation, {
                name: this.buttonsFuck[index].routeName,
              });
            }}
          />
        </View>
      </View>
    );
  }
}
