import dayjs from 'dayjs';
import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {
  Card,
  Divider,
  Icon,
  Text,
  Dialog,
  ListItem,
  FAB,
} from 'react-native-elements';
import {deleteAccount, updateAccount} from '../api/AccountApi';
import {queryBillsInAccountForPeriods} from '../api/BillApi';
import AccountItem from '../component/AccountItem';
import BillItemBlock from '../component/BillItemBlock';
import CalendarBottomSheet from '../component/CalendarBottomSheet';
import {ConfirmDeletion} from '../component/Comfire';
import Loading from '../component/Loading';
import {MoneyView} from '../component/MoneyView';
import {showSibling} from '../util/ViewUtil';

class AssetsEditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      remark: this.props.remark,
      visible: false,
    };
  }

  open({name, remark}) {
    this.setState({
      visible: true,
      name: name,
      remark: remark,
    });
  }

  close() {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <Dialog visible={this.state.visible}>
        <Card containerStyle={{margin: 0, padding: 0}}>
          <Card.Title>编辑账户</Card.Title>
          <ListItem bottomDivider topDivider>
            <ListItem.Content>
              <ListItem.Title>名称</ListItem.Title>
            </ListItem.Content>
            <ListItem.Input
              value={this.state.name}
              onChangeText={name => {
                this.setState({
                  name: name,
                });
              }}
            />
          </ListItem>
          <ListItem topDivider>
            <ListItem.Content>
              <ListItem.Title>备注</ListItem.Title>
            </ListItem.Content>
            <ListItem.Input
              value={this.state.remark}
              onChangeText={remark => {
                this.setState({
                  remark: remark,
                });
              }}
            />
          </ListItem>
        </Card>
        <Dialog.Actions>
          <Dialog.Button
            title="更新"
            onPress={() => {
              if (this.props.onUpdate) {
                this.props.onUpdate({
                  name: this.state.name,
                  remark: this.state.remark,
                });
              }
            }}
          />
          <Dialog.Button
            title="取消"
            onPress={() => {
              if (this.props.onCancel) {
                this.props.onCancel({
                  name: this.state.name,
                  remark: this.state.remark,
                });
              }
            }}
          />
        </Dialog.Actions>
      </Dialog>
    );
  }
}

export default class AssetsDetailPage extends Component {
  constructor(props) {
    super(props);
    this.calendarSelectorRef = React.createRef();
    this.state = {
      account: this.props.route.params.account,
      inflow: 0,
      outflow: 0,
      period: dayjs().format('YYYY年MM月'),
      billBlocks: [],
    };
    this.assetsEditDialogRef = React.createRef();
    this.props.navigation.addListener('focus',()=>{
      this.load();
    })
  }

  async load() {
    const love = showSibling(<Loading />);
    let dto = await queryBillsInAccountForPeriods({
      accountID: this.state.account.ID,
      ranges: [
        {
          startDateTime: dayjs().startOf('month'),
          endDateTime: dayjs().endOf('month'),
        },
      ],
    });
    this.setState({
      inflow: dto.inflow,
      outflow: dto.outflow,
      billBlocks: dto.billsBlockDTOS,
    });
    love.destroy();
  }

  render() {
    return (
      <View
        style={{
          width: '90%',
          height: '100%',
          alignSelf: 'center',
        }}>
        <AssetsEditDialog
          ref={this.assetsEditDialogRef}
          name={this.state.account.name}
          remark={this.state.account.remark}
          onUpdate={({name, remark}) => {
            this.assetsEditDialogRef.current.close();
            updateAccount({
              ID: this.state.account.ID,
              name: name,
              remark: remark,
            }).then(res => {
              if (res) {
                this.setState({
                  account: {
                    ...this.state.account,
                    name: name,
                    remark: remark,
                  },
                });
              }
            });
          }}
          onCancel={() => {
            this.assetsEditDialogRef.current.close();
          }}
        />
        <Text h3 h3Style={{textAlign: 'center', paddingVertical: 10}}>
          资产详情
        </Text>
        <Card containerStyle={{marginHorizontal: 0}}>
          <AccountItem account={this.state.account} disabled />
          <Card.Divider />
          <Card.Title
            onPress={() => {
              this.assetsEditDialogRef.current.open({
                name: this.state.account.name,
                remark: this.state.account.remark,
              });
            }}
            style={{color: '#7A8B8B'}}>
            编辑此账户
          </Card.Title>
        </Card>
        <View>
          <View
            style={{
              marginVertical: 5,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text h4>账户明细</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{textAlignVertical: 'center'}}>
                {this.state.period}
              </Text>
              <Icon
                containerStyle={{paddingHorizontal: 8, paddingVertical: 0}}
                color={'orange'}
                type="material-icons"
                name="date-range"
                size={30}
                onPress={() => {
                  this.calendarSelectorRef.current.open();
                }}
              />
            </View>
          </View>
          <View
            style={{
              marginVertical: 5,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold'}}>
              流入: <MoneyView money={this.state.inflow} />
              {this.state.account?.coin.symbol}
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              流出: <MoneyView money={this.state.outflow} />
              {this.state.account?.coin.symbol}
            </Text>
          </View>
        </View>
        <Divider width={3} style={{marginVertical: 5}} />
        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          {this.state.billBlocks.map(block => (
            <BillItemBlock
              onPressItem={bill => {
                this.props.navigation.navigate({
                  name: 'Bill-Detail-Page',
                  params: {bill: bill},
                });
              }}
              key={block.dateTime}
              style={{borderBottomColor: '#82623d', borderBottomWidth: 2}}
              total={block.total}
              coin={this.state.account?.coin}
              dateTime={dayjs(block.dateTime)}
              bills={block.bills}
            />
          ))}
        </ScrollView>
        <CalendarBottomSheet
          initMode={'month'}
          ref={this.calendarSelectorRef}
          confirm={({ranges, mode}) => {
            this.calendarSelectorRef.current.close();
            let love = showSibling(<Loading />);
            queryBillsInAccountForPeriods({
              accountID: this.state.account.ID,
              ranges: ranges,
            }).then(dto => {
              let p = null;
              switch (mode) {
                case 'week':
                  p =
                    dayjs(ranges[0].startDateTime).format('MM.DD') +
                    '-' +
                    dayjs(ranges[0].endDateTime).format('MM.DD');
                  break;
                case 'month':
                  p = dayjs(ranges[0].startDateTime).format('YYYY年MM月');
                  break;
                case 'day':
                  p = '日期序列';
                  break;
                case 'year':
                  p = dayjs(ranges[0].startDateTime).format('YYYY年');
                  break;

                default:
                  break;
              }
              this.setState({
                inflow: dto.inflow,
                outflow: dto.outflow,
                billBlocks: dto.billsBlockDTOS,
                period: p,
              });
              love.destroy();
            });
          }}
        />
        <FAB
          placement="right"
          icon={{name: 'delete', color: 'white'}}
          color="red"
          raised
          size="small"
          buttonStyle={{borderRadius: 30}}
          onPress={() => {
            const love = showSibling(
              <ConfirmDeletion
                onCancel={() => {
                  love.destroy();
                }}
                onConfirm={() => {
                  deleteAccount(this.state.account.ID).then(res => {
                    if (res) {
                      love.destroy();
                      this.props.navigation.goBack();
                    }
                  });
                }}
              />,
            );
          }}
        />
      </View>
    );
  }
}
