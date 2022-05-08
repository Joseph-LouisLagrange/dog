import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Icon, Image, ListItem, Text} from 'react-native-elements';
import {deleteBill} from '../api/BillApi';
import {ComfireDelete} from '../component/Comfire';
import {MoneyView} from '../component/MoneyView';
import {EXPENSE} from '../constant/Const';
import {showSibling} from '../util/ViewUtil';

function getItems({
  ledger,
  signory,
  remark,
  amount,
  dateTime,
  type,
  coin,
  account,
}) {
  return [
    {
      key: signory.name,
      value: <Icon type={signory.icon.type} name={signory.icon.name} />,
    },
    {
      key: '账本',
      value: <Text>{ledger.name}</Text>,
    },
    {
      key: '账户',
      value: <Text>{account?.name || '不计入账户'}</Text>,
    },
    {
      key: '类型',
      value: <Text>{type == EXPENSE ? '支出' : '收入'}</Text>,
    },
    {
      key: '金额',
      value: (
        <Text>
          {coin.symbol}
          <MoneyView money={amount} />
        </Text>
      ),
    },
    {
      key: '时间',
      value: <Text>{dateTime}</Text>,
    },
    {
      key: '备注',
      value: <Text>{remark || '无'}</Text>,
    },
  ];
}

export default function BillDetailPage({navigation, route}) {
  let bill = route.params?.bill;
  React.useEffect(() => {
    bill = route.params?.bill;
  }, [route.params?.bill]);
  let items = getItems(bill);
  return (
    <View style={{width: '100%', height: '100%', paddingTop: 30}}>
      <Text h3 style={{textAlign: 'center', paddingVertical: 20}}>
        账单详情
      </Text>
      {items.map(item => (
        <ListItem key={item.key} style={{}} topDivider bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={{fontWeight: 'bold'}}>
              {item.key}
            </ListItem.Title>
          </ListItem.Content>
          {item.value}
        </ListItem>
      ))}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
        }}>
        <Button
          buttonStyle={{height: 50, borderRadius: 0, backgroundColor: 'red'}}
          containerStyle={{
            width: '50%',
          }}
          title={'删除'}
          onPress={() => {
            // 删除账单
            let loev = showSibling(
              <ComfireDelete
                onComfire={() => {
                  deleteBill(bill.ID).then(res => {
                    if (res) {
                      loev.destroy();
                      navigation.goBack();
                    }
                  });
                }}
                onCancel={() => loev.destroy()}
              />,
            );
          }}
        />
        <Button
          buttonStyle={{borderRadius: 0, height: 50}}
          containerStyle={{width: '50%'}}
          title={'编辑'}
          onPress={() => {
            navigation.navigate({
              name: 'Edit-Bill-Page',
              params: {bill: bill},
            });
          }}
        />
      </View>
    </View>
  );
}
