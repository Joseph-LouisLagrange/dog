import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {getAccountStatisticsInfo, queryAllAccount} from '../api/AccountApi';
import AccountItem from '../component/AccountItem';
import Loading from '../component/Loading';
import MoneyTrendOverview from '../component/MoneyTrendOverview';
import {MoneyView} from '../component/MoneyView';
import {showSibling} from '../util/ViewUtil';
import AddAccountPage from './AddAccountPage';

// <AddAccountPage navigation={props.navigation}/>

export default class AssetsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statistics: {},
      accounts: [],
    };
    this.props.navigation.addListener('focus', () => {
      this.load();
    });
    this.load();
  }
  async load() {
    const love = showSibling(<Loading />);
    const accountStatisticsInfo = await getAccountStatisticsInfo();
    const accounts = await queryAllAccount();
    this.setState({
      accounts: accounts,
      statistics: accountStatisticsInfo,
    });
    love.destroy();
  }
  render() {
    return (
      <View
        style={{
          width: '90%',
          height: '100%',
          alignSelf: 'center',
          paddingTop: 50,
        }}>
        <View
          style={{
            width: '100%',
            height: 200,
            borderColor: 'black',
            borderWidth: 2,
            borderRadius: 20,
            marginBottom: 30,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
          <Text h3>
            净资产:
            <MoneyView money={this.state.statistics.netAssets} />￥
          </Text>
          <Text h4>
            总资产:
            <MoneyView money={this.state.statistics.sumAssets} />￥
          </Text>
          <Text h4>
            负债:
            <MoneyView money={this.state.statistics.debt} />￥
          </Text>
        </View>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
            }}>
            <Text h4 style={{alignSelf: 'center'}}>
              资产账户
            </Text>
            <Text
              onPress={() => {
                this.props.navigation.navigate('Add-Account-Page');
              }}
              style={{alignSelf: 'center', color: 'red', fontSize: 20}}>
              添加
            </Text>
          </View>
          <ScrollView style={{height:'70%'}}>
              {this.state.accounts.map(account=><AccountItem key={account.ID} account={account}/>)}
          </ScrollView>
        </View>
      </View>
    );
  }
}
