import React, {Component} from 'react';
import {View} from 'react-native';
import {Icon, ListItem, Text} from 'react-native-elements';
import {EXPENSE, INCOME} from '../constant/Const';
import { MoneyView } from './MoneyView';

const yy = {};
yy[EXPENSE] = '支出';
yy[INCOME] = '收入';

const ll = {};
ll[EXPENSE] = "消费";
ll[INCOME] = "收入";


function getDateUnit(mode) {
    switch (mode) {
      case 'month':
        return {dateUnit: '月', subDateUnit: '日'};
      case 'week':
        return {dateUnit: '周', subDateUnit: '日'};
      case 'year':
        return {dateUnit: '年', subDateUnit: '月'};
      default:
        break;
    }
    return {dateUnit: '日期序列', subDateUnit: '天'};
  }


function CategoryItem({dateUnit, billsCount, signory: {icon, name}, money,billType}) {
  return (
    <ListItem containerStyle={{backgroundColor:'transparent'}} bottomDivider topDivider>
      <Icon name={icon.name} type={icon.type} />
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        <ListItem.Subtitle>该{dateUnit}共{yy[billType]}: ￥<MoneyView money={money}/> {ll[billType]}{billsCount||0}笔</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

export default class MoneyCategoryRanking extends Component {
  render() {
    return (
      <View
        style={{
          ...this.props.style,
          borderColor: 'black',
          borderWidth: 2,
          borderRadius: 20,
          padding: 15,
          width: this.props.width,
          height: this.props.height,
        }}>
        <View
          style={{
            paddingBottom: 10,
            borderBottomColor: 'black',
            borderBottomWidth: 2,
          }}>
          <Text style={{fontSize: 18}}>{yy[this.props.type]}类目排行</Text>
        </View>
        <View>
            {this.props.categoryRanking.map(({signory,billsCount,money})=>{
                return <CategoryItem dateUnit={getDateUnit(this.props.mode).dateUnit} billsCount={billsCount} signory={signory} money={money} billType={this.props.type} />
            })}
        </View>
      </View>
    );
  }
}
