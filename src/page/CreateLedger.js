import React, {Component} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import LedgerCover from '@/component/LedgerCover'
import {createLedger} from '@/api/LedgerApi';
import {getAllCoins} from '@/service/CoinService';
import {
  getAllLedgerCovers,
} from '@/service/LedgerService';

export default class CreateLedger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ledgerCovers: [],
      selectedledgerCover: null,
      coins: [],
      ledgerName: null,
      selectedCoin: null,
    };
    this.loadLedgerCovers();
    this.loadCoins();
  }

  loadLedgerCovers() {
    getAllLedgerCovers().then(ledgerCovers => {
      this.setState({
        ledgerCovers: ledgerCovers,
      });
    });
  }

  loadCoins() {
    getAllCoins().then(coins => {
      this.setState({
        coins: coins,
      });
    });
  }

  selectLedgerCover = ledgerCover => {
    this.setState({selectedledgerCover: ledgerCover});
  };

  createLedger = () => {
    createLedger({
      name: this.state.ledgerName,
      coverID: this.state.selectedledgerCover.ID,
      coinID: this.state.selectedCoin.ID,
    });
  };

  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <View style={{marginTop: '20%'}}>
          <Input
            onChangeText={name => {
              this.setState({ledgerName: name});
            }}
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
                    onPress={() => {
                      this.selectLedgerCover(ledgerCover);
                    }}
                    style={
                      this.state.selectedledgerCover &&
                      this.state.selectedledgerCover.ID == ledgerCover.ID
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
                      uri={ledgerCover.uri}
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
              onSelect={index =>
                this.setState({selectedCoin: this.state.coins[index]})
              }
              textStyle={{fontSize: 20}}
              dropdownTextStyle={{fontSize: 15}}
              isFullWidth={true}
              defaultValue="选择货币                        >"
              options={this.state.coins.map(
                coin => coin.name + '     ' + coin.shortName,
              )}></ModalDropdown>
          </View>
        </View>
        <Button
          onPress={this.createLedger}
          title={'新建'}
          buttonStyle={{width: '80%', alignSelf: 'center', marginTop: 60}}
          style={{position: 'relative', bottom: 0}}
        />
      </View>
    );
  }
}
