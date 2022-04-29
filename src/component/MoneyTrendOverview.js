import dayjs from 'dayjs';
import React from 'react';
import {Dimensions, useWindowDimensions, View} from 'react-native';
import {Text} from 'react-native-elements';
import {
  Curve,
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictorySelectionContainer,
  VictoryVoronoiContainer,
  VictoryCursorContainer,
  VictoryTooltip,
  VictoryLabel,
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

// 收入/支出趋势概况
export default function MoneyTrendOverview(props) {
  const {dateUnit, subDateUnit} = getDateUnit(props.mode);
  const pp = ['支出', '收入'];
  let data = new Array();
  for (let x = 0; x <= 30; x++) {
    data.push({x: x, y: x});
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
              {1}
              {subDateUnit}
            </Text>
            ,你支出了{props.highestMoney}
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
              {props.type}
            </Text>
            <Text>{73.46}</Text>
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
      <View style={{alignSelf: 'center'}}>
        <VictoryChart
          padding={28}
          style={{background: {fill: 'pink'}}}
          theme={VictoryTheme.material}
          width={props.width * 0.9}
          height={props.height * 0.7}
          domain={{x: [0, 30], y: [0, 30]}}>
          <VictoryAxis
            crossAxis
            //tickValues={[5]}
            //width={400}
            //height={400}
            //domain={[-10, 10]}
            theme={VictoryTheme.material}
            //offsetY={200}
            standalone={true}
          />
          <VictoryAxis
            dependentAxis
            crossAxis
            //width={400}
            //height={400}
            //domain={[-10, 10]}
            theme={VictoryTheme.material}
            //offsetY={200}
            standalone={false}
          />
          <VictoryBar
            data={data}
            labels={() => 'HELLO'}
            labelComponent={
              <VictoryTooltip
                renderInPortal={false}
                constrainToVisibleArea
              />
            }
          />
        </VictoryChart>
      </View>
    </View>
  );
}
