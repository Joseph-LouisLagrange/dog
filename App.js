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
import CreateLedger from '@/page/CreateLedger';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';
import {RootSiblingParent} from 'react-native-root-siblings';
import {navigationRef} from '@/util/Route';
import UpdateLedgerPage from '@/page/UpdateLedgerPage';
import AddAccountPage from '@/page/AddAccountPage';
import CreateAccountPage from '@/page/CreateAccountPage';
import CurrencyConversion from '@/page/CurrencyConversion';
import CoinMutiSelector from '@/page/CoinMutiSelector';
import RecycleBinPage from '@/page/RecycleBinPage';
import {} from '@/config/CalendarConfig';
import LedgerDetail from '@/page/LedgerDetail';
import BillDetailPage from '@/page/BillDetailPage';
import EditBillPage from '@/page/EditBillPage';
import dayjs from 'dayjs';
import PersonEditPage from '@/page/PersonEditPage';
import AssetsDetailPage from '@/page/AssetsDetailPage';
import AboutWePage from '@/page/AboutWePage';
import RecoverBillPage from '@/page/RecoverBillPage';
import RecoverLedgerPage from '@/page/RecoverLedgerPage';

var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
      <RootSiblingParent>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName={'Boot-Page'}
            screenOptions={{headerShown: false}}>
            <Stack.Screen component={BootPage} name={'Boot-Page'} />
            <Stack.Screen component={Home} name={'Home'} />
            <Stack.Screen component={Register} name={'Register'} />
            <Stack.Screen component={Login} name={'Login'} />
            <Stack.Screen component={Bill} name={'Bill'} />
            <Stack.Screen component={Detail} name={'Detail'} />
            <Stack.Screen component={Bookkeeping} name={'Book-Keeping'} />
            <Stack.Screen component={My} name={'My'} />
            <Stack.Screen component={Ledger} name={'Ledger'} />
            <Stack.Screen component={CreateLedger} name={'Create-Ledger'} />
            <Stack.Screen
              component={UpdateLedgerPage}
              name={'Update-Ledger-Page'}
            />
            <Stack.Screen
              component={AddAccountPage}
              name={'Add-Account-Page'}
            />
            <Stack.Screen
              component={CreateAccountPage}
              name="Create-Account-Page"
            />
            <Stack.Screen
              component={CurrencyConversion}
              name="Currency-Conversion"
            />
            <Stack.Screen
              component={CoinMutiSelector}
              name="Coin-Muti-Selector"
            />
            <Stack.Screen component={RecycleBinPage} name="Recycle-Bin-Page" />
            <Stack.Screen component={LedgerDetail} name="Ledger-Detail" />
            <Stack.Screen component={BillDetailPage} name="Bill-Detail-Page" />
            <Stack.Screen component={EditBillPage} name="Edit-Bill-Page" />
            <Stack.Screen component={PersonEditPage} name="Person-Edit-Page" />
            <Stack.Screen
              component={AssetsDetailPage}
              name="Assets-Detail-Page"
            />
            <Stack.Screen component={AboutWePage} name="About-We-Page" />
            <Stack.Screen
              component={RecoverBillPage}
              name="Recover-Bill-Page"
            />
            <Stack.Screen
              component={RecoverLedgerPage}
              name="Recover-Ledger-Page"
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
    );
  }
}

LogBox.ignoreLogs(['EventEmitter.removeListener']);
LogBox.ignoreAllLogs();
