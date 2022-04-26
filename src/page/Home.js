import React, {Component} from 'react';
import {ImageBackground, ScrollView, View} from 'react-native';
import {Button, ButtonGroup, Text} from 'react-native-elements';
import {queryTodayBills} from '../api/BillApi';
import BillItemBlock from '../component/BillItemBlock';
import Loading from '../component/Loading';
import {isLogin} from '../service/UserSerive';
import {gotoCanBack} from '../util/Route';
import {showSibling} from '../util/ViewUtil';
import Bill from './Bill';
import Bookkeeping from './Bookkeeping';
import Detail from './Detail';
import My from './My';

export default class Home extends Component {
  static name = 'Home';
  route;
  navigation;
  buttonsFuck = [
    {title: '明细', routeName: 'Detail'},
    {title: '账单', routeName: 'Bill'},
    {title: '记账', routeName: 'Book-Keeping'},
    {
      title: '我的',
      routeName: 'My',
    },
  ];
  constructor(props) {
    super(props);
    this.route = props.route;
    this.navigation = props.navigation;
    this.state = {
      todayBills: null,
    };
    this.props.navigation.addListener('focus', () => {
      this.load();
    });
  }

  async load() {
    let loading = showSibling(<Loading />);
    const todayBills = await queryTodayBills();
    this.setState({
      todayBills: todayBills,
    });
    loading.destroy();
  }
  componentDidMount() {}

  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <View style={{marginVertical: 30}}>
          <Text h2 style={{textAlign: 'center'}}>
            今日账单
          </Text>
        </View>

        <ScrollView style={{maxHeight:'70%',width:'90%',alignSelf:'center'}}>
          {this.state.todayBills ? (
            <BillItemBlock
              coin={{symbol: '￥'}}
              dateTime={new Date()}
              bills={this.state.todayBills.bills}
              total={this.state.todayBills.total}
            />
          ) : (
            <></>
          )}
        </ScrollView>
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
