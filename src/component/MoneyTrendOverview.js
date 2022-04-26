import dayjs from 'dayjs';
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {
  Curve,
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
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

// 收入/支出趋势概况
export default function MoneyTrendOverview(props) {
  let data = new Array();
  for (let x = 1; x < 30; x++) {
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
      }}>
      <View
        style={{
          paddingBottom: 10,
          borderBottomColor: 'black',
          borderBottomWidth: 2,
        }}>
        <Text style={{fontSize: 18}}>{props.type}趋势概况</Text>
      </View>
      <View>
        <Text>
          本{props.dateUnit}内单{props.dateSubUnit}最高{props.type}
        </Text>
        <Text>
          在
          <Text style={{color: 'red'}}>
            {1}
            {props.dateSubUnit}
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
            本{props.dateUnit}内平均每{props.dateSubUnit}
            {props.type}
          </Text>
          <Text>{73.46}</Text>
        </View>
        <View>
          <Text>
            本{props.dateUnit}内累计{props.type}笔数
          </Text>
          <Text>{props.recordCount}笔</Text>
        </View>
      </View>
      <View style={{borderWidth: 2, borderColor: 'red'}}>
        <VictoryChart
          style={{background: {fill: 'pink'}}}
          theme={VictoryTheme.material}
          width={300}
          height={250}
          domain={{x: [0, 30], y: [0, 30]}}>
            
          <VictoryAxis
            crossAxis
            tickValues={[5]}
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
          <VictoryScatter
            style={{
              data: {},
            }}
            size={3}
            data={data}
          />
          <VictoryLine
            events={[{target: 'data', eventHandlers: {}}]}
            dataComponent={<Curve openCurve={true} />}
            style={{}}
            data={data}
          />

        </VictoryChart>
      </View>
    </View>
  );
}
