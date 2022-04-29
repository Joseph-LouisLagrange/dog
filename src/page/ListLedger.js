import React, {Component} from 'react';
import {ScrollView, View, TouchableHighlight} from 'react-native';
import {Button, Divider, ListItem, Text} from 'react-native-elements';
import {queryAllLedgers} from '../api/LedgerApi';
import {ComfireDelete} from '../component/Comfire';
import LedgerFace from '../component/LedgerFace';
import Loading from '../component/Loading';
import {MoneyView} from '../component/MoneyView';
import {showSibling} from '../util/ViewUtil';

export default class ListLedger extends Component {
  render() {
    return (
      <View style={this.props.style}>
        <ScrollView>
          {this.props.ledgers.map(ledger => (
            <ListItem.Swipeable
              key={ledger.ID}
              containerStyle={{padding: 10}}
              leftContent={
                <Button
                  title="详情"
                  onPress={() => {
                    this.props.navigation.navigate({name: 'Ledger-Detail',params:{ledgerID:ledger.ID}});
                  }}
                  icon={{name: 'info', color: 'white'}}
                  buttonStyle={{minHeight: '100%'}}
                />
              }
              rightContent={
                <View>
                  <Button
                    title="编辑"
                    onPress={() => {
                      this.props.navigation.navigate('Update-Ledger-Page', {
                        ledger: ledger,
                      });
                    }}
                    icon={{name: 'pencil', color: 'white', type: 'entypo'}}
                    buttonStyle={{minHeight: '50%'}}
                  />
                  <Button
                    title="删除"
                    disabled={ledger.using}
                    onPress={() => {
                      const love = showSibling(
                        <ComfireDelete
                          onCancel={() => {
                            love.destroy();
                          }}
                          onComfire={() => {
                            this.props.onDelete(ledger.ID);
                            love.destroy();
                          }}
                        />,
                      );
                    }}
                    icon={{name: 'delete', color: 'white'}}
                    buttonStyle={{minHeight: '50%', backgroundColor: 'red'}}
                  />
                </View>
              }>
              <ListItem.Content>
                <LedgerFace ledger={ledger}/>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem.Swipeable>
          ))}
        </ScrollView>
      </View>
    );
  }
}
