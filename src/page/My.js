import CookieManager from '@react-native-cookies/cookies';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Component, createRef} from 'react';
import {TouchableHighlight, View} from 'react-native';
import {Avatar, Button, Card, Divider, Icon, Text} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {getLiveDayCount, getMe} from '../api/UserApi';
import {BottomSheetAtGetImage} from '../component/BottomSheets';
import {queryBillsCount} from '../api/BillApi';
/**
 * <Text>我的</Text>
        <Button title={'账本'} onPress={() => this.ledger()} />
        <Button title="汇率转换" onPress={() => this.currencyConversion()} />
        <Button
          title="退出登录"
          onPress={() => {
            CookieManager.clearAll().then(res => {
              if (res) {
                this.props.navigation.navigate({name: 'Login'});
              }
            });
          }}
        />
        <Button
          title="回收站"
          onPress={() => {
            this.props.navigation.navigate({name: 'Recycle-Bin-Page'});
          }}
        />
 */

export default class My extends Component {
  static name = 'my';

  features = [
    {
      name: '账本',
      icon: {
        type: 'foundation',
        name: 'clipboard-notes',
        color: '#008B8B',
      },
      onPress: () => {
        this.props.navigation.navigate('Ledger');
      },
    },
    {
      name: '汇率转换',
      icon: {
        type: 'font-awesome',
        name: 'exchange',
        color: '#FFD700',
      },
      onPress: () => {
        this.props.navigation.navigate('Currency-Conversion');
      },
    },
    {
      name: '回收站',
      icon: {
        type: 'ant-design',
        name: 'delete',
        color: '#8B7D6B',
      },
      onPress: () => {
        this.props.navigation.navigate('Recycle-Bin-Page');
      },
    },
    {
      name: '关于我们',
      icon: {
        type: 'feather',
        name: 'phone-call',
        color: '#32CD32',
      },
      onPress: () => {
        this.props.navigation.navigate('About-We-Page');
      },
    },
    {
      name: '退出登录',
      icon: {
        type: 'material-icons',
        name: 'exit-to-app',
        color: '#8B4726',
      },
      onPress: () => {
        CookieManager.clearAll().then(res => {
          if (res) {
            this.navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
          }
        });
      },
    },
  ];

  constructor(props) {
    super(props);
    this.bottomSheetAtGetImageRef = createRef();
    this.state = {
      user: null,
      liveDayCount: null,
      billsCount: null,
    };
    this.props.navigation.addListener('focus', () => {
      this.load();
    });
  }

  async load() {
    const [me, liveDayCount, billsCount] = await Promise.all([
      getMe(),
      getLiveDayCount(),
      queryBillsCount(),
    ]);
    this.setState({
      user: me,
      liveDayCount: liveDayCount,
      billsCount: billsCount,
    });
  }

  render() {
    return (
      <View
        style={{
          width: '90%',
          height: '100%',
          paddingTop: 70,
          alignSelf: 'center',
        }}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Avatar
            renderPlaceholderContent={<ActivityIndicator />}
            onPress={() => {
              this.props.navigation.navigate('Person-Edit-Page', {
                user: this.state.user,
              });
            }}
            size={80}
            containerStyle={{alignSelf: 'center'}}
            source={{
              uri: this.state.user?.avatarUrl,
            }}
            rounded>
            <Avatar.Accessory type="ant-design" name="camerao" size={20} />
          </Avatar>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <Text style={{textAlignVertical: 'center'}}>
              {this.state.user?.nickName}
            </Text>
            <Icon
              onPress={() => {
                this.props.navigation.navigate('Person-Edit-Page', {
                  user: this.state.user,
                });
              }}
              type="ant-design"
              name="edit"
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
              marginVertical: 10,
            }}>
            <Text style={{fontSize: 18}}>
              记账天数 {this.state.liveDayCount}
            </Text>
            <Divider orientation="vertical" width={5} />
            <Text style={{fontSize: 18}}>记账笔数 {this.state.billsCount}</Text>
          </View>
        </View>
        <Card containerStyle={{width: '100%', alignSelf: 'center'}}>
          <Card.Title>常用功能</Card.Title>
          <Card.Divider />
          <FlatGrid
            itemDimension={60}
            data={this.features}
            renderItem={({item: {icon, name, onPress}}) => (
              <TouchableHighlight
                underlayColor="pink"
                onPress={() => {
                  onPress();
                }}>
                <View>
                  <Avatar
                    containerStyle={{paddingBottom: 10, alignSelf: 'center'}}
                    icon={{type: icon.type, name: icon.name, color: icon.color}}
                    rounded
                    size={50}
                  />
                  <Text style={{textAlign: 'center'}}>{name}</Text>
                </View>
              </TouchableHighlight>
            )}
          />
        </Card>
      </View>
    );
  }
}
