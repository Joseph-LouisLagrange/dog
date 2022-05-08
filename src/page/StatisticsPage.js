import React, {Component} from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {ButtonGroup, Icon, Text} from 'react-native-elements';
import CalendarBottomSheet from '@/component/CalendarBottomSheet';
import MoneyCard from '../component/MoneyCard';
import MoneyTrendOverview from '../component/MoneyTrendOverview';
import dayjs from 'dayjs';
import {EXPENSE, INCOME} from '../constant/Const';
import MoneyPartOverview from '../component/MoneyPartOverview';
import MoneyCategoryRanking from '../component/MoneyCategoryRanking';
import MoneyDetailedRanking from '../component/MoneyDetailedRanking';
import {
  countAmount,
  countBillRanking,
  countCategoryRanking,
  countMoneySignoryPart,
  countMoneyTrend,
} from '../api/BillApi';
import {showSibling} from '../util/ViewUtil';
import Loading from '../component/Loading';

const yy = ['支出', '收入'];

export default class StatisticsPage extends Component {
  constructor(props) {
    super(props);
    this.calendarSelectorRef = React.createRef();
    this.state = {
      window: Dimensions.get('window'),
      selectedBillType: EXPENSE,
      period: dayjs().format('YYYY年MM月'),
      mode: 'month',
      amountInfo: {},
      moneyTrendOutDTO: null,
      moneySignoryPart: [],
      categoryRanking: [],
      billRanking:[],
      ranges: [
        {
          startDateTime: dayjs().startOf('month'),
          endDateTime: dayjs().endOf('month'),
        },
      ],
    };
    Dimensions.addEventListener('change', ({window, screen}) => {
      this.setState({window: window});
    });
    this.load();
  }
  async load() {
    this.updateState({
      ranges: this.state.ranges,
      selectedBillType: this.state.selectedBillType,
      mode: this.state.mode,
    });
  }

  async updateState({ranges, selectedBillType, mode}) {
    let love = showSibling(<Loading />);
    let [
      amountInfo,
      moneyTrendOutDTO,
      moneySignoryPartOutDTO,
      categoryRanking,
      billRanking,
    ] = await Promise.all([
      countAmount(ranges),
      countMoneyTrend({
        ranges: ranges,
        billType: selectedBillType,
        mode: mode,
      }),
      countMoneySignoryPart({
        ranges: ranges,
        billType: selectedBillType,
        mode: mode,
      }),
      countCategoryRanking({
        ranges: ranges,
        billType: selectedBillType,
        mode: mode,
      }),
      countBillRanking({
        ranges: ranges,
        billType: selectedBillType,
        mode: mode,
      }),
    ]);
    this.setState({
      amountInfo: amountInfo,
      moneyTrendOutDTO: moneyTrendOutDTO,
      moneySignoryPart: moneySignoryPartOutDTO,
      categoryRanking: categoryRanking,
      billRanking:billRanking
    });
    love.destroy();
  }

  render() {
    return (
      <ScrollView
        style={{width: '90%', height: '100%', alignSelf: 'center'}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginVertical: 20,
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}>
          <Text style={{fontSize: 18, alignSelf: 'center'}}>
            {this.state.period}收支概况
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
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontWeight: 'bold', alignSelf: 'center', fontSize: 16}}>
            {this.state.period}
          </Text>
          <ButtonGroup
            buttons={yy}
            containerStyle={{width: 200}}
            selectedIndex={this.state.selectedBillType}
            onPress={index => {
              this.setState({selectedBillType: index});
              this.updateState({
                ranges: this.state.ranges,
                selectedBillType: index,
                mode: this.state.mode,
              });
            }}
          />
        </View>
        <View style={{marginVertical: 20}}>
          <MoneyCard
            coin={{symbol: '￥'}}
            mode={this.state.mode}
            surplus={this.state.amountInfo.surplus}
            expense={this.state.amountInfo.expense}
            income={this.state.amountInfo.income}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <MoneyTrendOverview
            width={this.state.window.width * 0.9}
            height={500}
            amountAtDates={this.state.moneyTrendOutDTO?.amountAtDates || []}
            mode={this.state.mode}
            ranges={this.state.ranges}
            consequent={true}
            recordCount={this.state.moneyTrendOutDTO?.billCount}
            average={this.state.moneyTrendOutDTO?.average}
            type={this.state.selectedBillType}
            coin={{symbol: '￥'}}
            highest={{
              date: dayjs(
                this.state.moneyTrendOutDTO?.highestDateTime || new Date(),
              ),
              highestMoney: this.state.moneyTrendOutDTO?.highest,
            }}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <MoneyPartOverview
            moneySignoryPart={this.state.moneySignoryPart}
            type={this.state.selectedBillType}
            width={this.state.window.width * 0.9}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <MoneyCategoryRanking
            categoryRanking={this.state.categoryRanking}
            mode={this.state.mode}
            type={this.state.selectedBillType}
            width={this.state.window.width * 0.9}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <MoneyDetailedRanking
            data={this.state.billRanking}
            type={this.state.selectedBillType}
            width={this.state.window.width * 0.9}
          />
        </View>
        <CalendarBottomSheet
          initMode={this.state.mode}
          ref={this.calendarSelectorRef}
          confirm={({ranges, mode}) => {
            let p = null;
            console.log('ranges', ranges);
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
                p = null;
                break;
              case 'year':
                p = dayjs(ranges[0].startDateTime).format('YYYY年');
                break;

              default:
                break;
            }
            this.setState({
              mode: mode,
              period: p,
              ranges: ranges,
            });
            this.updateState({
              ranges: ranges,
              selectedBillType: this.state.selectedBillType,
              mode: mode,
            });
            // this.needLoad();
            this.calendarSelectorRef.current.close();
          }}
        />
      </ScrollView>
    );
  }
}
