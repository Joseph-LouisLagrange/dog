import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {Avatar, Button, ButtonGroup, Input} from 'react-native-elements';
import BillSignoryTable from '../component/BillSignoryTable';
import {getBillSignoriesByType} from '../service/BillService';
import AssetAccountDropDownSeletor from '../component/AssetAccountDropDownSeletor';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import LedgerSelector from '../component/LedgerSelector';

export default class Bookkeeping extends Component {
    static name = "Book-Keeping"
    constructor(props) {
      super(props);
      this.state = {
        dataReady: true,
        usingLedger: {name: '默认账本'},
        signories: [],
        selectedSignoryID: 0,
        billType: 0,
        dateTime: new Date(),
        isVisibleDatePicker: false,
      };
      this.loadSignories(this.state.billType);
    }
  
    loadSignories(billType) {
      getBillSignoriesByType(billType).then(signories => {
        this.setState({
          signories: signories,
        });
      });
    }
    changeBillType(billType) {
      if (this.state.billType != billType) {
        this.setState({billType: billType, selectedSignoryID: 0});
        this.loadSignories(billType);
      }
    }
    hideDatePicker = () => {
      this.setState({isVisibleDatePicker: false});
    };
    setBillDate = date => {
      this.setState({dateTime: date});
      this.hideDatePicker();
    };
    ready() {}
    render() {
      return (
        <View style={{height: '100%', width: '100%'}}>
          {this.state.dataReady ? (
            <View style={{flex: 1}}>
              <View>
                <LedgerSelector onSelect={ID => {}} />
              </View>
              <View
                style={{
                  marginVertical: 10,
                }}>
                <ButtonGroup
                  selectedIndex={this.state.billType}
                  buttons={['支出', '收入']}
                  onPress={index => this.changeBillType(index)}
                  containerStyle={{marginBottom: 10}}
                />
              </View>
              <ScrollView style={{maxHeight: '30%'}}>
                <BillSignoryTable
                  selectedSignoryID={this.state.selectedSignoryID}
                  onSelectID={ID => this.setState({selectedSignoryID: ID})}
                  signories={this.state.signories}
                />
              </ScrollView>
              <ScrollView style={{marginVertical: 10}}>
                <AssetAccountDropDownSeletor
                  onSelect={ID => {
                    this.setState({saveAccountID: ID});
                    // console.log(ID);
                  }}
                />
                <Input
                  label="备注"
                  labelStyle={{color: '#99cc66'}}
                  placeholder="点击输入备注"
                />
                <Input
                  label="金额"
                  keyboardType="decimal-pad"
                  placeholder="点击输入金额"
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Avatar
                    size={40}
                    onPress={() => {
                      this.setState({isVisibleDatePicker: true});
                    }}
                    rounded
                    icon={{name: 'date', type: 'fontisto'}}
                    containerStyle={{backgroundColor: '#6733b9'}}
                  />
                  <DateTimePickerModal
                    mode="datetime"
                    onConfirm={this.setBillDate}
                    onCancel={this.hideDatePicker}
                    isVisible={this.state.isVisibleDatePicker}
                  />
                  <Button
                    title={'完成'}
                    buttonStyle={{backgroundColor: 'rgba(214, 61, 57, 1)'}}
                    containerStyle={{width: '35%'}}
                  />
                </View>
              </ScrollView>
            </View>
          ) : (
            <View
              style={{
                position: 'absolute',
                top: '50%',
                alignSelf: 'center',
                zIndex: 1000,
              }}>
              <ActivityIndicator size="large" color="#00ff00" />
              <Button onPress={() => this.ready()} title={'加载完成'}></Button>
            </View>
          )}
        </View>
      );
    }
}
