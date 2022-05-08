import React, {Component} from 'react';
import {Button, Icon} from 'react-native-elements';
import DetailsPage from '@/page/DetailsPage';
import StatisticsPage from './StatisticsPage';
import TabNavigator from 'react-native-tab-navigator';
import AssetsPage from './AssetsPage';

//const Tab = createBottomTabNavigator();

function Details(props) {
  return <Button title={'明细'} />;
}

function Statistics(props) {
  return <Button title={'统计'} />;
}

function Assets(props) {
  return <Button title={'资产'} />;
}
/**
 *  <Tab.Navigator screenOptions={{headerShown: true}}>
        <Tab.Screen
          name="明细"
          component={Details}
          
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return (
                <Icon
                  type="ant-design"
                  name="minussquareo"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="统计"
          component={Statistics}
          // options={{
          //   tabBarIcon: ({focused, color, size}) => {
          //     return (
          //       <Icon
          //         type="ant-design"
          //         name="dotchart"
          //         size={size}
          //         color={color}
          //       />
          //     );
          //   },
          // }}
        />
        <Tab.Screen
          name="资产"
          component={Assets}
          // options={{
          //   tabBarIcon: ({focused, color, size}) => {
          //     return (
          //       <Icon
          //         type="ant-design"
          //         name="wallet"
          //         size={size}
          //         color={color}
          //       />
          //     );
          //   },
          // }}
        />
      </Tab.Navigator>
 */

export default class Detail extends Component {
  route;
  navigation;
  static name = 'Detail';
  constructor(props) {
    super(props);
    this.route = this.props.route;
    this.navigation = this.props.navigation;
    this.state = {
      selectIndex: 0,
    };
  }
  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          title="明细"
          selected={this.state.selectIndex == 0}
          onPress={() => this.setState({selectIndex: 0})}
          renderIcon={() => (
            <Icon type="ant-design" name="minussquareo" size={25} />
          )}
          renderSelectedIcon={() => (
            <Icon type="ant-design" name="minussquareo" size={25} color="red" />
          )}>
          <DetailsPage />
        </TabNavigator.Item>
        <TabNavigator.Item
          title="统计"
          onPress={() => this.setState({selectIndex: 1})}
          selected={this.state.selectIndex == 1}
          renderIcon={() => (
            <Icon type="ant-design" name="dotchart" size={25} />
          )}
          renderSelectedIcon={() => (
            <Icon type="ant-design" name="dotchart" size={25} color="red" />
          )}>
          <StatisticsPage />
        </TabNavigator.Item>
        <TabNavigator.Item
          title="资产"
          onPress={() => this.setState({selectIndex: 2})}
          selected={this.state.selectIndex == 2}
          renderIcon={() => <Icon type="ant-design" name="wallet" size={25} />}
          renderSelectedIcon={() => (
            <Icon type="ant-design" name="wallet" size={25} color="red" />
          )}>
          {/* <AssetsPage navigation={this.props.navigation} /> */}
            <AssetsPage navigation={this.props.navigation} />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}
