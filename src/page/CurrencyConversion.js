import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Avatar, ButtonGroup, FAB, ListItem, Text} from 'react-native-elements';
import {currencyExchangeRate} from '../api/Public';
import Loading from '../component/Loading';
import storage from '../service/Storage';
import {showSibling} from '../util/ViewUtil';
import CoinMutiSelector from './CoinMutiSelector';

export default class CurrencyConversion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseCoin: null, // 选中的 Coin
      coins: [],
      amount: 0.0,
    };
    this.refMap = {};
    this.props.navigation.addListener('focus', () => {
      this.load();
    });
    // this.load();
  }

  async load() {
    // const love = showSibling(<Loading />);
    let [selectedCoins, exchangeBaseCoin, exchangeAmount] = await Promise.all([
      storage.getAllDataForKey('selectedCoins'),
      storage.load({key: 'exchangeBaseCoin'}),
      storage.load({key: 'exchangeAmount'}),
    ]);
    selectedCoins = selectedCoins || [];
    exchangeBaseCoin =
      exchangeBaseCoin || (selectedCoins.length == 0 ? null : selectedCoins[0]);

    // 增强 amount 到 coin 中
    if (exchangeBaseCoin) {
      const res = await currencyExchangeRate({
        baseCoinID: exchangeBaseCoin.ID,
        amount:
          !exchangeAmount || Number.isNaN(Number.parseFloat(exchangeAmount))
            ? 0
            : Number.parseFloat(exchangeAmount),
        exchangeCoinIDs: selectedCoins.map(coin => coin.ID),
      });
      // res 是 Map
      for (const coin of selectedCoins) {
        coin['amount'] = res[coin.ID];
      }
    }
    // 设置到 State 中
    this.setState({
      baseCoin: exchangeBaseCoin,
      coins: selectedCoins,
      amount: exchangeAmount,
    });
    // love.destroy();
  }

  createRef(ID) {
    this.refMap[ID] = React.createRef();
    return this.refMap[ID];
  }

  changeAmount(amount, coin) {
    // 修改持久化，存入 Storage
    Promise.all([
      storage.save({key: 'exchangeAmount', data: amount}),
      storage.save({key: 'exchangeBaseCoin', data: coin}),
    ]).then(() => {
      // 重新加载数据
      this.load();
    });
  }

  render() {
    let coinItems = [];
    for (let i = 0; i < this.state.coins.length; i++) {
      const coin = this.state.coins[i];
      coinItems.push(
        <ListItem bottomDivider key={coin.ID}>
          <Avatar rounded={true} source={{uri: coin.iconUrl}} />
          <ListItem.Content style={{}}>
            <ListItem.Title>{coin.name}</ListItem.Title>
            <ListItem.Subtitle>{coin.shortName}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Input
            keyboardType="numeric"
            value={coin.amount.toString()}
            onChangeText={value => {
              this.changeAmount(value, coin);
            }}
          />
        </ListItem>,
      );
    }
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Text h3 style={{textAlign: 'center', paddingVertical: 30}}>
          汇率转换
        </Text>
        <ScrollView style={{}}>{coinItems}</ScrollView>
        <FAB
          onPress={() => {
            this.props.navigation.navigate('Coin-Muti-Selector');
          }}
          placement="right"
          icon={{name: 'add', color: 'white'}}
          size="large"
          buttonStyle={{borderRadius: 30}}
        />
      </View>
    );
  }
}
