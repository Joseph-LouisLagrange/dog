import React, { Component } from 'react'
import { View } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';
import { EXPENSE, INCOME } from '../constant/Const';
import { MoneyView } from './MoneyView';
const yy = {};
yy[EXPENSE] = '支出';
yy[INCOME] = '收入';

const ll = {};
ll[EXPENSE] = "消费";
ll[INCOME] = "收入";


function BillItem({signory: {icon, name},money,coin,dateTime}) {
    return (
      <ListItem containerStyle={{backgroundColor:'transparent'}} bottomDivider topDivider>
        <Icon name={icon.name} type={icon.type} />
        <ListItem.Content>
          <ListItem.Title>{name}<Text style={{textAlign:'right',width:'100%'}}>{coin.symbol}<MoneyView money={money}/></Text></ListItem.Title>
          <ListItem.Subtitle>{dateTime}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }

export default class MoneyDetailedRanking extends Component {
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
              <Text style={{fontSize: 18}}>{yy[this.props.type]}明细排行</Text>
            </View>
            <View>
                {this.props.data.map(({signory,amount,coin,dateTime})=>{
                    return <BillItem signory={signory} money={amount} coin={coin} dateTime={dateTime}/>
                })}
            </View>
          </View>
        );
      }
}
