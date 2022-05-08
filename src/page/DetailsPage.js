import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {
  BottomSheet,
  Button,
  ButtonGroup,
  Icon,
  Text,
} from 'react-native-elements';
import {queryAllLedgers} from '../api/LedgerApi';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import CalendarBottomSheet from '../component/CalendarBottomSheet';
import {queryBillsForPeriods} from '../api/BillApi';
import BillItemBlock from '../component/BillItemBlock';
import BillSearchPage from './BillSearchPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {showSibling} from '../util/ViewUtil';
import Loading from '../component/Loading';
import dayjs from 'dayjs';
import {MoneyView} from '../component/MoneyView';

const Stack = createNativeStackNavigator();

export default class DetailsPage extends Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName="Details-Page-View"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Details-Page-View" component={DetailsPageView} />
        <Stack.Screen name="Bill-Search-Page" component={BillSearchPage} />
      </Stack.Navigator>
    );
  }
}

export class DetailsPageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranges: [
        {
          startDateTime: dayjs().startOf('month'),
          endDateTime: dayjs().endOf('month'),
        },
      ],
      allLedgers: [],
      ledger: null,
      surplus: 0.0,
      expense: 0.0,
      income: 0.0,
      coin: {},
      blocks: [],
      period: null,
    };
    this.props.navigation.addListener('focus', () => {
      this.load();
    });
    this.calendarSelectorRef = React.createRef();
  }

  async load() {
    const love = showSibling(<Loading />);
    const a = await queryAllLedgers();
    let usingLedger;
    for (let ledger of a.ledgers) {
      if (ledger.using) {
        usingLedger = ledger;
      }
    }
    // 加载明细数据
    const dto = await queryBillsForPeriods({
      ledgerID: usingLedger.ID,
      ranges: this.state.ranges,
    });
    this.setState({
      allLedgers: a.ledgers,
      ledger: usingLedger,
      surplus: dto.surplus,
      expense: dto.expense,
      income: dto.income,
      coin: dto.coin,
      blocks: dto.blocks,
      period: dayjs().format('YYYY年MM月'),
    });
    love.destroy();
  }

  gotoSearchPage() {
    this.props.navigation.navigate({name: 'Bill-Search-Page'});
  }
  selectDate() {}
  render() {
    return (
      <View
        style={{
          width: '95%',
          height: '100%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            marginVertical: 20,
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}>
          <Text style={{fontSize: 18, alignSelf: 'center'}}>
            {this.state.period}账目明细
          </Text>
          <Icon
            containerStyle={{paddingHorizontal: 8}}
            color={'orange'}
            type="material-icons"
            name="date-range"
            size={30}
            onPress={() => {
              this.calendarSelectorRef.current.open();
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: '10%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            h4
            onPress={() => {
              this.props.navigation.navigate({name: 'Ledger'});
            }}>
            {this.state.ledger && this.state.ledger.name}
            <Icon type="ant-design" name="down" size={20} />
          </Text>
          <Icon
            type="font-awesome"
            name="search"
            size={30}
            onPress={() => this.gotoSearchPage()}
          />
        </View>
        <View
          style={{
            padding: 10,
            width: '90%',
            height: '25%',
            alignSelf: 'center',
            borderColor: 'black',
            borderWidth: 3,
            borderRadius: 30,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
          <Text>
            结余
            <Text>
              <MoneyView money={this.state.surplus} />{' '}
              {this.state.ledger && this.state.ledger.coin.symbol}
            </Text>
          </Text>
          <Text>
            支出
            <Text>
              <MoneyView money={this.state.expense} />{' '}
              {this.state.ledger && this.state.ledger.coin.symbol}
            </Text>
          </Text>
          <Text>
            收入
            <Text>
              <MoneyView money={this.state.income} />{' '}
              {this.state.ledger ? this.state.ledger.coin.symbol : ''}
            </Text>
          </Text>
        </View>
        <View style={{width: '95%', height: '50%', alignSelf: 'center'}}>
          <View
            style={{
              paddingVertical: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text h4>收支记录</Text>
            </View>
            <View
              style={{
                alignSelf: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{color: 'green', textAlign: 'center'}}
                onPress={() => {
                  this.props.navigation.navigate('Book-Keeping');
                }}>
                + 新建
              </Text>
            </View>
          </View>
          <ScrollView
            style={{maxHeight: '90%'}}
            showsVerticalScrollIndicator={false}>
            {this.state.blocks.map(block => (
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
                coin={this.state.coin}
                dateTime={dayjs(block.dateTime)}
                bills={block.bills}
              />
            ))}
          </ScrollView>
        </View>
        <CalendarBottomSheet
          initMode={'month'}
          ref={this.calendarSelectorRef}
          confirm={({ranges, mode}) => {
            console.log('选择日期范围:', ranges);
            this.calendarSelectorRef.current.close();
            let love = showSibling(<Loading />);
            queryBillsForPeriods({
              ledgerID: this.state.ledger.ID,
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
                  break;
                case 'year':
                  p = dayjs(ranges[0].startDateTime).format('YYYY年');
                  break;

                default:
                  break;
              }
              this.setState({
                surplus: dto.surplus,
                expense: dto.expense,
                income: dto.income,
                coin: dto.coin,
                blocks: dto.blocks,
                period: p,
              });
              love.destroy();
            });
          }}
        />
      </View>
    );
  }
}
