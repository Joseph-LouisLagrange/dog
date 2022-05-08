import dayjs from 'dayjs';
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryBar,
} from 'victory-native';

class CatPoint extends React.Component {
  constructor(props) {
    super(props);
    console.info(props);
  }
  render() {
    return <Text>.</Text>;
  }
}

function max(data) {
  return Math.max(...data.map(d => d.y));
}

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

function yearData(amountAtDates) {
  let ll = {};
  for (let i = 0; i < amountAtDates.length; i++) {
    const element = amountAtDates[i];
    ll[element.date.month()] = element;
  }
  let data = [];
  for (let monthI = 0; monthI < 12; monthI++) {
    if (ll[monthI]) {
      data.push({
        x: monthI + 1,
        y: ll[monthI].amount,
        label: ll[monthI].amount,
      });
    } else {
      data.push({x: monthI, y: 0, label: 0});
    }
  }
  return data;
}

function monthData(ranges, amountAtDates) {
  let startX = ranges[0].startDateTime.date();
  let endX = ranges[0].endDateTime.date();
  let data = [];
  let ll = {};
  for (let i = 0; i < amountAtDates.length; i++) {
    const element = amountAtDates[i];
    ll[element.date.date()] = element;
  }
  for (let i = startX; i <= endX; i++) {
    if (ll[i]) data.push({x: i, y: ll[i].amount, label: ll[i].amount});
    else data.push({x: i + 1, y: 0, label: 0});
  }
  return data;
}

function weekData(ranges, amountAtDates) {
  let startX = ranges[0].startDateTime.day();
  let endX = ranges[0].endDateTime.day();
  let data = [];
  let ll = {};
  for (let i = 0; i < amountAtDates.length; i++) {
    const element = amountAtDates[i];
    ll[element.date.day()] = element;
  }
  for (let i = startX; i <= endX; i++) {
    if (ll[i]) data.push({x: i + 1, y: ll[i].amount, label: ll[i].amount});
    else data.push({x: i + 1, y: 0, label: 0});
  }
  return data;
}

// 收入/支出趋势概况
export default function MoneyTrendOverview(props) {
  const {dateUnit, subDateUnit} = getDateUnit(props.mode);
  let amountAtDates = props.amountAtDates.map(a => {
    return {date: dayjs(a.dateTime), amount: Math.abs(a.amount)};
  });

  const pp = ['支出', '收入'];
  let data = new Array();
  if (props.mode == 'year') {
    data = yearData(amountAtDates);
  } else if (props.mode == 'month') {
    data = monthData(props.ranges, amountAtDates);
  } else if (props.mode == 'week') {
    data = weekData(props.ranges, amountAtDates);
  }
  return (
    <View
      style={{
        ...props.style,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 20,
        padding: 15,
        width: props.width,
        height: props.height,
      }}>
      <View style={{maxHeight: props.height * 0.3}}>
        <View
          style={{
            paddingBottom: 10,
            borderBottomColor: 'black',
            borderBottomWidth: 2,
          }}>
          <Text style={{fontSize: 18}}>{pp[props.type]}趋势概况</Text>
        </View>
        <View>
          <Text>
            本{dateUnit}内单{subDateUnit}最高{pp[props.type]}
          </Text>
          <Text>
            在
            <Text style={{color: 'red'}}>
              {props.highest.date.format("YYYY-MM-DD")}
              {subDateUnit}
            </Text>
            ,你{pp[props.type]}了{props.coin.symbol}{props.highest.highestMoney}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text>
              本{dateUnit}内平均每{subDateUnit}
              {pp[props.type]}
            </Text>
            <Text>{props.coin.symbol}{props.average}</Text>
          </View>
          <View>
            <Text>
              本{dateUnit}内累计{pp[props.type]}笔数
            </Text>
            <Text>{props.recordCount}笔</Text>
          </View>
        </View>
      </View>
      {/* borderWidth: 2, borderColor: 'red' */}
      {props.mode != 'day' && (
        <View style={{alignSelf: 'center'}}>
          <VictoryChart
            padding={28}
            style={{background: {fill: 'pink'}}}
            theme={VictoryTheme.material}
            width={props.width * 0.9}
            height={props.height * 0.7}
            domain={{y: [0, max(data) * 1.2]}}>
            <VictoryAxis
              crossAxis
              //width={400}
              //height={400}
              //domain={[-10, 10]}
              theme={VictoryTheme.material}
              //offsetY={200}
              standalone={true}
            />
            {/* <VictoryAxis
            dependentAxis
            crossAxis
            //width={400}
            //height={400}
            //domain={[-10, 10]}
            theme={VictoryTheme.material}
            //offsetY={200}
            standalone={false}
          /> */}
            <VictoryBar
              data={data}
              //labels={() => 'HELLO'}
              labelComponent={
                <VictoryTooltip renderInPortal={false} constrainToVisibleArea />
              }
            />
          </VictoryChart>
        </View>
      )}
    </View>
  );
}
