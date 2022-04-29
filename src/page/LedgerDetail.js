import React, {Component} from 'react';
import {TouchableHighlight, View} from 'react-native';
import {Avatar, Button, Text} from 'react-native-elements';
import {setUsingLedger} from '../api/BillApi';
import {queryLedgerByID} from '../api/LedgerApi';
import LedgerFace from '../component/LedgerFace';
export default class LedgerDetail extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      ledgerDetail: null,
    };
    this.props.navigation.addListener('focus', () => {
      this.load();
    });
    this.load();
  }

  async load() {
    const ledgerDetail = await queryLedgerByID(
      this.props.route.params.ledgerID,
    );
    this.setState({
      ledgerDetail: ledgerDetail,
    });
  }
  render() {
    return (
      <View style={{width: '90%', alignSelf: 'center', height: '100%'}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 60,
            marginBottom: 20,
          }}>
          <Text h4>我的账本</Text>
          <Text style={{textAlignVertical: 'center'}}>
            {this.state.ledgerDetail?.createTime} 创建
          </Text>
        </View>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => {
            this.props.navigation.navigate({
              name: 'Update-Ledger-Page',
              params: {
                ledger: {
                  ...this.state.ledgerDetail,
                  coverUri: this.state.ledgerDetail.cover.url,
                },
              },
            });
          }}>
          {this.state.ledgerDetail ? (
            <LedgerFace
              ledger={{
                ...this.state.ledgerDetail,
                coverUri: this.state.ledgerDetail.cover.url,
              }}
            />
          ) : (
            <></>
          )}
        </TouchableHighlight>
        <View style={{marginVertical: 20}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <Text h4>收支信息</Text>
            <Text style={{textAlignVertical: 'center', color: '#191970'}}>
              总结余:{this.state.ledgerDetail?.surplus}
              {this.state.ledgerDetail?.coin.symbol}
            </Text>
          </View>
          <Text
            style={{
              textAlignVertical: 'center',
              color: '#191970',
              marginVertical: 5,
            }}>
            总支出:{this.state.ledgerDetail?.sumExpense}
            {this.state.ledgerDetail?.coin.symbol}
          </Text>
          <Text
            style={{
              textAlignVertical: 'center',
              color: '#191970',
              marginVertical: 5,
            }}>
            总收入:{this.state.ledgerDetail?.sumIncome}
            {this.state.ledgerDetail?.coin.symbol}
          </Text>
        </View>
        <View>
          <Text h4>基础信息</Text>
          <Text style={{marginVertical: 10}}>本位币</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text style={{fontSize: 20}}>
              {this.state.ledgerDetail?.coin.name}{' '}
              {this.state.ledgerDetail?.coin.shortName}
            </Text>
            <Avatar
              rounded
              source={{uri: this.state.ledgerDetail?.coin.iconUrl}}
            />
          </View>
        </View>
        {this.state.ledgerDetail?.using || (
          <Button
            title={'切换账本'}
            onPress={() => {
              setUsingLedger(this.state.ledgerDetail.ID).then(rsp => {
                this.props.navigation.goBack();
              });
            }}
            containerStyle={{position: 'absolute', bottom: 0, width: '100%'}}
          />
        )}
      </View>
    );
  }
}
