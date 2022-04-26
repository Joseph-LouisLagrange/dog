import React, {useState, Component} from 'react';
import {ScrollView, TextInput, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {createAccount} from '../api/AccountApi';
import {queryAllCoins} from '../api/CoinApi';
import CoinSelector from '../component/CoinSelector';

export default class CreateAccountPage extends Component {
  constructor(props) {
    super(props);
    this.accountType = props.route.params.accountType;
    this.state = {
      balance: "0.00",
      name: null,
      remark: null,
      coin: null,
      coins: [],
    };
    this.load();
  }

  async load() {
    const coins = await queryAllCoins();
    this.setState({
      coins: coins,
    });
  }

  render() {
    return (
      <View style={{width: '90%', height: '100%', alignSelf: 'center'}}>
        <View style={{marginVertical: 20}}>
          <Text h3 style={{textAlign: 'center'}}>
            新建账户
          </Text>
        </View>
        <Text h4 style={{marginVertical: 10}}>
          账户类型:{this.accountType.origin}
        </Text>

        <ScrollView
          style={{
            maxHeight: 400,
            marginTop: 30,
          }}>
          <CoinSelector
            coins={this.state.coins}
            style={{}}
            selectedCoin={this.state.coin}
            onSelect={coin => {
              this.setState({
                coin: coin,
              });
            }}
          />
          <Input
            label="余额"
            keyboardType="numeric"
            defaultValue="0.00"
            value={this.state.balance}
            onChangeText={balance => {
              this.setState({
                balance: balance,
              });
            }}
          />
          <Input
            label="账户名称"
            placeholder="在次输入账户名称"
            value={this.state.name}
            onChangeText={name => {
              this.setState({
                name: name,
              });
            }}
          />
          <Input
            label="备注"
            placeholder="在此输入备注"
            value={this.state.remark}
            onChangeText={remark => {
              this.setState({
                remark: remark,
              });
            }}
          />
          <Button
            title={'保存'}
            onPress={() => {
              createAccount({
                balance: Number.parseFloat(this.state.balance),
                name: this.state.name,
                remark: this.state.remark,
                typeID: this.accountType.ID,
                coinID: this.state.coin.ID,
              }).then(rsp => {
                this.props.navigation.goBack();
              });
            }}
          />
        </ScrollView>
      </View>
    );
  }
}
