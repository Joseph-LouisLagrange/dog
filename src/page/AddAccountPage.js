import React, {Component} from 'react';
import {AppState, ScrollView, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {queryAllAccountType} from '../api/AccountApi';
import {showSibling} from '../util/ViewUtil';
import Loading from '../component/Loading';

function AccountTypeBlock(props) {
  return (
    <View style={props.style}>
      <Text h4 h4Style={{marginLeft:10,paddingLeft:4,borderLeftColor:'red',borderLeftWidth:2,marginBottom:10}}>{props.name}</Text>
      <View style={{display: 'flex', flexDirection: 'row',flexWrap:'wrap'}}>
        {props.accountTypes.map(accountType => (
          <View key={accountType.ID} style={{marginHorizontal:10,marginVertical:10}}>
            <Button
              title={accountType.origin}
              onPress={() => {
                props.navigation.navigate('Create-Account-Page', {
                  accountType: accountType,
                });
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

export default class AddAccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountTypeMap: {},
    };
     this.load();
  }
  async load() {
    const love = showSibling(<Loading />);
    const accountTypeMap = await queryAllAccountType();
    this.setState({
      accountTypeMap: accountTypeMap,
    });
    love.destroy();
  }
  render() {
    let loves = [];
    for (let k in this.state.accountTypeMap) {
      let v = this.state.accountTypeMap[k];
      loves.push(<AccountTypeBlock style={{marginTop:30}} key={k} name={k} navigation={this.props.navigation} accountTypes={v} />);
    }
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Text h2 style={{textAlign:'center'}}>添加账户</Text>
        <ScrollView>{loves}</ScrollView>
      </View>
    );
  }
}
