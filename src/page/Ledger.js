import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {deleteLedger, queryAllLedgers} from '../api/LedgerApi';
import Loading from '../component/Loading';
import {MoneyView} from '../component/MoneyView';
import {showSibling} from '../util/ViewUtil';
import ListLedger from './ListLedger';

export default class Ledger extends Component {
  static name = 'Ledger';
  constructor(props) {
    super(props);
    this.state = {
      ledgers: [],
      sumSurplus: 0,
    };
    this.props.navigation.addListener('focus',()=>{
      this.load();
    })
  }

  async load() {
    let iLoveYou = showSibling(<Loading />);
    const {ledgers, sumSurplus} = await queryAllLedgers();
    this.setState({
      ledgers: ledgers,
      sumSurplus: sumSurplus,
    });
    iLoveYou.destroy();
  }

  doDelete(ID){
    deleteLedger(ID).then(rsp=>{
      if(rsp){
        this.load();
      }
    })
  }

  gotoCreateLedgerPage() {
    this.props.navigation.navigate({name: 'Create-Ledger'});
  }
  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <View style={{backgroundColor: '#FAEBD7',paddingHorizontal:10}}>
          <Text h3>我的账本</Text>
          <Text h4 h4Style={{color: 'red', textAlign: 'right'}}>
            总结余:
            <MoneyView money={this.state.sumSurplus} />
          </Text>
        </View>
        <ListLedger
          onDelete={(ID)=>this.doDelete(ID)}
          ledgers={this.state.ledgers}
          navigation={this.props.navigation}
          style={{height: '80%', width: '100%', alignSelf: 'center'}}
        />
        <View style={{width: '100%', height: '10%', backgroundColor: 'red'}}>
          <Button
            title="新建账本"
            onPress={() => this.gotoCreateLedgerPage()}
            icon={{
              name: 'pluscircleo',
              type: 'ant-design',
              size: 30,
              color: 'white',
            }}
            iconContainerStyle={{marginRight: 10}}
            titleStyle={{fontWeight: '700'}}
            buttonStyle={{
              height: '100%',
            }}
            containerStyle={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      </View>
    );
  }
}
