import React from 'react';
import {View} from 'react-native';
import {Button, Dialog, Overlay, Text} from 'react-native-elements';

export function ComfireDelete(props) {
  return (
    <Overlay>
      <View style={{width: 200, height: 100}}>
        <Text h4 h4Style={{textAlign: 'center'}}>
          {props.massage || '确认删除'}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 25,
          }}>
          <Button
            title="确认"
            containerStyle={{width: 60}}
            onPress={() => props.onComfire()}
          />
          <Button
            title="取消"
            containerStyle={{width: 60}}
            onPress={() => props.onCancel()}
          />
        </View>
      </View>
    </Overlay>
  );
}

export function ConfirmDeletion(props) {
  return (
    <Dialog>
      <Dialog.Title title={props.message || '确认删除'}/>
      <Dialog.Actions>
        <Dialog.Button title="取消"  onPress={() => props.onCancel()}/>
        <Dialog.Button title="确认" onPress={() => props.onConfirm()} />
      </Dialog.Actions>
    </Dialog>
  );
}
