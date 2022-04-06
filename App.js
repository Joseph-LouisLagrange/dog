/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Component} from 'react';
import Bookkeeping from '@/page/Bookkeeping';
import Bill from '@/page/Bill';
import BootPage from '@/page/Boot';
import Home from '@/page/Home';
import My from '@/page/My';
import Login from '@/page/Login';
import Register from '@/page/Register';
import Detail from '@/page/Detail';
import Ledger from '@/page/Ledger';
import CreateLedger  from '@/page/CreateLedger';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"Boot-Page"}
          screenOptions={{headerShown: false}}>
          <Stack.Screen component={BootPage} name={"Boot-Page"} />
          <Stack.Screen component={Home} name={"Home"} />
          <Stack.Screen component={Register} name={"Register"} />
          <Stack.Screen component={Login} name={"Login"} />
          <Stack.Screen component={Bill} name={"Bill"} />
          <Stack.Screen component={Detail} name={"Detail"} />
          <Stack.Screen component={Bookkeeping} name={"Book-Keeping"} />
          <Stack.Screen component={My} name={"My"} />
          <Stack.Screen component={Ledger} name={"Ledger"} />
          <Stack.Screen component={CreateLedger} name={"Ceate-Ledger"}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
