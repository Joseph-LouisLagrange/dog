import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {Component} from 'react';
import {Button, Icon} from 'react-native-elements';
import DetailsPage from '@/page/DetailsPage';

const Tab = createBottomTabNavigator();

function Details(props) {
  return <Button title={'明细'} />;
}

function Statistics(props) {
  return <Button title={'统计'} />;
}

function Assets(props) {
  return <Button title={'资产'} />;
}

export default class Detail extends Component {
  route;
  navigation;
  static name = 'Detail';
  constructor(props) {
    super(props);
    this.route = props.route;
    this.navigation = props.navigation;
  }
  render() {
    return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="明细"
          component={DetailsPage}
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
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return (
                <Icon
                  type="ant-design"
                  name="dotchart"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="资产"
          component={Assets}
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return (
                <Icon
                  type="ant-design"
                  name="wallet"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  }
}
