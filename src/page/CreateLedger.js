import React, {Component} from 'react';
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Button, Input, Text} from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import LedgerCover from '@/component/LedgerCover';
import {createLedger} from '@/api/LedgerApi';
import {getAllCoins} from '@/service/CoinService';
import {getAllLedgerCovers} from '@/service/LedgerService';
import {showSibling} from '../util/ViewUtil';
import Loading from '../component/Loading';

function SelectedButton(coin) {
  return (
    <View
      style={{
        width: 200,
        display: 'flex',
        flexDirection: 'row',
      }}>
      <Avatar
        rounded
        source={{
          uri: coin.iconUrl,
        }}
      />
      <View style={{width: 100, marginLeft: 30, alignSelf: 'center'}}>
        <Text style={{textAlign: 'left'}}>{coin.name}</Text>
      </View>
      <View style={{alignSelf: 'center'}}>
        <Text>{coin.shortName}</Text>
      </View>
    </View>
  );
}

function CoinOption(coin, index, isSelected, onSelect) {
  // const {coin, index, isSelected} = props;
  return (
    <TouchableHighlight onPress={() => onSelect(coin)} underlayColor="#0099cc">
      <View
        style={{
          width: 200,
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Avatar
          rounded
          source={{
            uri: coin.iconUrl,
          }}
        />
        <View style={{width: 100, marginLeft: 30, alignSelf: 'center'}}>
          <Text style={{textAlign: 'left'}}>{coin.name}</Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Text>{coin.shortName}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default class CreateLedger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ledgerCovers: [],
      coins: [],
      selectedledgerCoverID: this.props.coverID,
      selectedCoinID: this.props.coinID,
      ledgerName: this.props.ledgerName,
      selectedIndex: null,
    };
    this.ledgerName = this.props.ledgerName || null;
    this.selectedCoinID = this.props.selectedCoinID || null;
    this.load();
  }

  async load() {
    const loading = showSibling(<Loading />);
    const ledgerCovers = await getAllLedgerCovers();
    const coins = await getAllCoins();
    let selectedCoinIdx = null;
    for (let index in coins) {
      if (coins[index].ID == this.selectedCoinID) {
        selectedCoinIdx = index;
        break;
      }
    }
    this.setState({
      ledgerCovers: ledgerCovers,
      coins: coins,
      selectedIndex: selectedCoinIdx,
    });
    loading.destroy();
  }

  selectLedgerCover(ledgerCover) {
    this.setState({selectedledgerCoverID: ledgerCover.ID});
  }

  doCreateLedger() {
    createLedger({
      name: this.ledgerName,
      coverID: this.state.selectedledgerCoverID,
      coinID: this.selectedCoinID,
      using: false,
    }).then(payload => {
      this.props.navigation.goBack();
    });
  }

  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <View style={{marginTop: '15%'}}>
          <Input
            onChangeText={name => {
              this.ledgerName = name;
              this.setState({
                ledgerName: name,
              });
            }}
            value={this.state.ledgerName}
            label="新建账本名称"
            labelStyle={{color: 'black', fontSize: 28}}
            placeholder="限9个汉字或12个英文字母..."
          />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: '93%'}}>
            <Text h4 style={{marginBottom: 10}}>
              设置账本封面
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {this.state.ledgerCovers.map(ledgerCover => (
                <View style={{marginRight: 10}} key={ledgerCover.ID}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.selectLedgerCover(ledgerCover)}
                    style={
                      this.state.selectedledgerCoverID == ledgerCover.ID
                        ? {
                            borderWidth: 2,
                            borderColor: 'red',
                          }
                        : {
                            borderWidth: 2,
                            borderColor: 'transparent',
                          }
                    }>
                    <LedgerCover
                      uri={ledgerCover.url}
                      name={ledgerCover.name}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={{width: '93%', marginTop: 20}}>
            <Text h4 style={{marginBottom: 10}}>
              设置基础信息
            </Text>
            <Text h3 style={{marginBottom: 10}}>
              货币种类:
            </Text>
            <ModalDropdown
              ref={ref => (this.coinSelectedRef = ref)}
              renderButtonText={rowData => SelectedButton(rowData)}
              textStyle={{fontSize: 20}}
              dropdownTextStyle={{fontSize: 15}}
              isFullWidth={true}
              defaultIndex={this.state.selectedIndex}
              renderRow={(rowData, index, isSelected) =>
                CoinOption(rowData, index, isSelected, () => {
                  this.coinSelectedRef.select(index);
                  this.selectedCoinID = rowData.ID;
                  this.coinSelectedRef.hide();
                })
              }
              defaultValue="选择货币 >"
              options={this.state.coins}></ModalDropdown>
          </View>
        </View>
        <Button
          onPress={() => this.doCreateLedger()}
          title={'新建'}
          buttonStyle={{width: '80%', alignSelf: 'center', marginTop: 60}}
          style={{position: 'relative', bottom: 0}}
        />
      </View>
    );
  }
}
