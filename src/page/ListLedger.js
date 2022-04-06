import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import LedgerFace from '../component/LedgerFace';

export default class ListLedger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ledgers: new Array(10).fill(1),
    };
  }
  render() {
    return (
      <View>
        <ScrollView style={{height:'90%'}}>
          <View>
            <Text h2>我的账本</Text>
            <Text h4 style={{color: 'red'}}>
              总结余:
            </Text>
            {this.state.ledgers.map(ledger => (
              <View style={{marginTop: 30}}>
                <LedgerFace ledger={ledger} using={true} />
              </View>
            ))}
          </View>
          <View style={{height:50}}>
              
          </View>
        </ScrollView>
        <View style={{width:"100%",height:"10%",backgroundColor:'red'}}>
        <Button
              title="新建账本"
              icon={{
                name: 'pluscircleo',
                type: 'ant-design',
                size: 30,
                color: 'white',
              }}
              iconContainerStyle={{ marginRight: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                height:"100%"
              }}
              containerStyle={{
                width: "100%",
                height:"100%"
              }}
            />
        </View>
      </View>
    );
  }
}
