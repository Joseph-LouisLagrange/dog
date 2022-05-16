import dayjs from 'dayjs';
import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, CheckBox, Icon, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {
  queryDeletedBills,
  removeBillsCompletely,
  recoverBills,
} from '../api/BillApi';
import BillItemBlock from '../component/BillItemBlock';
import {ConfirmDeletion} from '../component/Comfire';
import Loading from '../component/Loading';
import {showSibling} from '../util/ViewUtil';

export default class RecoverBillPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      coin: {symbol: '￥'},
      allSelected: false,
      selectedBills: {},
      billsCount: this.props.route.params.billsCount,
    };
    this.BillItemBlockRefs = {};
    this.load();
  }
  async load() {
    const love = showSibling(<Loading />);
    let l = await queryDeletedBills();
    l.forEach(o => (o.ref = React.createRef()));
    this.setState({
      blocks: l,
    });
    love.destroy();
  }

  resetState() {
    let billsCount = this.state.billsCount - this.getSelectedLength();
    this.props.route.params.updateBillsCount(billsCount);
    if (billsCount == 0) {
      this.props.navigation.goBack();
      return;
    }
    this.setState({
      selectedBills: {},
      billsCount: billsCount,
    });
    this.load();
  }

  allSelect() {
    this.state.blocks.forEach(block => block.ref.current.selectAll());
    let selectedBills = {};
    this.state.blocks
      .flatMap(block => block.bills)
      .forEach(bill => (selectedBills[bill.ID] = bill));
    this.setState({
      selectedBills: selectedBills,
    });
  }

  AllUnselect() {
    this.state.blocks.forEach(block => block.ref.current.unselectAll());
    this.setState({
      selectedBills: {},
    });
  }

  getSelectedLength() {
    return Object.keys(this.state.selectedBills).length;
  }

  render() {
    return (
      <View
        style={{
          width: '90%',
          height: '100%',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <Text h3 h3Style={{paddingVertical: 10}}>
          {this.getSelectedLength() > 0
            ? '已选择' + this.getSelectedLength() + '项'
            : '已删除明细'}
        </Text>
        <Text>
          已删除<Text style={{color: 'pink'}}>账本/资产</Text>
          下的明细不会出现在这里
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%', marginVertical: 20, maxHeight: '75%'}}>
          {this.state.blocks.map(block => (
            <BillItemBlock
              ref={block.ref}
              disabled
              selectMode
              onSelectBill={bill => {
                this.state.selectedBills[bill.ID] = bill;
                this.setState({
                  selectedBills: this.state.selectedBills,
                });
              }}
              onUnselectBill={bill => {
                delete this.state.selectedBills[bill.ID];
                this.setState({
                  selectedBills: this.state.selectedBills,
                });
              }}
              key={block.dateTime}
              style={{borderBottomColor: '#82623d', borderBottomWidth: 2}}
              total={block.total}
              coin={this.state.coin}
              dateTime={dayjs(block.dateTime)}
              bills={block.bills}
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
            checked={this.getSelectedLength() === this.state.billsCount}
            onPress={() => {
              if (this.getSelectedLength() < this.state.billsCount)
                this.allSelect();
              else this.AllUnselect();
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
                      removeBillsCompletely(
                        Object.keys(this.state.selectedBills),
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
                recoverBills(Object.keys(this.state.selectedBills)).then(
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
