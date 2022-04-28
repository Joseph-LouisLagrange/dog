import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import {Avatar, Icon, ListItem, Text} from 'react-native-elements';

export default class RecycleBinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailCount: 3,
      ledgerCount: 7,
      accountCount: 5,
    };
  }

  render() {
    return (
      <View>
        <Text h3 h3Style={{textAlign: 'center',paddingVertical:30}}>
          回收站
        </Text>
        <ListItem bottomDivider onPress={()=>{
            
        }}>
          <Icon type="ant-design" name="minussquareo" size={40} />
          <ListItem.Content>
            <ListItem.Title>明细</ListItem.Title>
            <ListItem.Subtitle>
              {this.state.detailCount}条内容
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider>
          <Icon type="ant-design" name="wallet" size={40} />
          <ListItem.Content>
            <ListItem.Title>账户资产</ListItem.Title>
            <ListItem.Subtitle>
              {this.state.accountCount}条内容
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem>
          <Icon type="ant-design" name="switcher" size={40} />
          <ListItem.Content>
            <ListItem.Title>账本</ListItem.Title>
            <ListItem.Subtitle>
              {this.state.ledgerCount}条内容
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    );
  }
}
