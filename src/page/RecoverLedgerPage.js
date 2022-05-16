import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, CheckBox, Icon, Text} from 'react-native-elements';
import {
  queryDeletedLedgers,
  recoverLedgers,
  removeLedgersCompletely,
} from '../api/LedgerApi';
import {ConfirmDeletion} from '../component/Comfire';
import LedgerItem from '../component/LedgerItem';
import Loading from '../component/Loading';
import {showSibling} from '../util/ViewUtil';

export default class RecoverLedgerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ledgers: [],
      selectedLedgers: {},
      ledgersCount: this.props.route.params.ledgersCount,
    };
    this.load();
  }

  async load() {
    let love = showSibling(<Loading />);
    const loveYou = await queryDeletedLedgers();
    loveYou.forEach(o => (o.ref = React.createRef()));
    this.setState({
      ledgers: loveYou,
    });
    love.destroy();
  }

  resetState() {
    let LedgersCount = this.state.ledgersCount - this.getSelectedLength();
    this.props.route.params.updateLedgersCount(LedgersCount);
    if (LedgersCount == 0) {
      this.props.navigation.goBack();
      return;
    }
    this.setState({
      selectedLedgers: {},
      LedgersCount: LedgersCount,
    });
    this.load();
  }

  allSelect() {
    this.state.ledgers.forEach(ledger => ledger.ref.current.select());
    let selectedLedgers = {};
    this.state.ledgers.forEach(ledger => (selectedLedgers[ledger.ID] = ledger));
    this.setState({
      selectedLedgers: selectedLedgers,
    });
  }

  allUnselect() {
    this.state.ledgers.forEach(ledger => ledger.ref.current.unselect());
    this.setState({
      selectedLedgers: {},
    });
  }

  getSelectedLength() {
    return Object.keys(this.state.selectedLedgers).length;
  }

  render() {
    return (
      <View style={{width: '90%', height: '100%', alignSelf: 'center'}}>
        <Text h3 h3Style={{textAlign: 'center', marginVertical: 20}}>
          {this.getSelectedLength() > 0
            ? '已选择' + this.getSelectedLength() + '项'
            : '已删除账本'}
        </Text>
        <ScrollView style={{maxHeight: '75%'}}>
          {this.state.ledgers.map(ledger => (
            <LedgerItem
              onSelect={() => {
                this.state.selectedLedgers[ledger.ID] = ledger;
                this.setState({
                  selectedLedgers: this.state.selectedLedgers,
                });
              }}
              onUnselect={() => {
                delete this.state.selectedLedgers[ledger.ID];
                this.setState({
                  selectedLedgers: this.state.selectedLedgers,
                });
              }}
              ref={ledger.ref}
              key={ledger.ID}
              ledger={ledger}
              selectMode
            />
          ))}
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <CheckBox
            checked={this.getSelectedLength() === this.state.ledgersCount}
            onPress={() => {
              if (this.getSelectedLength() < this.state.ledgersCount)
                this.allSelect();
              else this.allUnselect();
            }}
            containerStyle={{
              backgroundColor: 'transparent',
              width: '30%',
              borderColor: 'blue',
            }}
            uncheckedIcon={
              <Icon
                name="checkbox-blank-circle-outline"
                type="material-community"
              />
            }
            checkedIcon={
              <Icon name="check-circle-outline" type="material-community" />
            }
            title="全选"
          />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'space-between',
              width: 180,
            }}>
            <Button
              disabled={this.getSelectedLength() == 0}
              onPress={() => {
                const love = showSibling(
                  <ConfirmDeletion
                    onConfirm={() => {
                      // 彻底删除
                      removeLedgersCompletely(
                        Object.keys(this.state.selectedLedgers),
                      )
                        .then(res => {
                          if (res) {
                            this.resetState();
                          }
                        })
                        .finally(() => love.destroy());
                    }}
                    onCancel={() => love.destroy()}
                  />,
                );
              }}
              title={'彻底删除'}
              buttonStyle={{backgroundColor: '#8B5A00', width: 80}}
            />
            <Button
              onPress={() => {
                recoverLedgers(Object.keys(this.state.selectedLedgers)).then(
                  res => {
                    if (res) {
                      this.resetState();
                    }
                  },
                );
              }}
              disabled={this.getSelectedLength() == 0}
              title={'恢复'}
              buttonStyle={{backgroundColor: '#483D8B', width: 80}}
            />
          </View>
        </View>
      </View>
    );
  }
}
