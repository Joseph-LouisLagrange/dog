import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, TextInput, View} from 'react-native';
import {
  Avatar,
  Button,
  Dialog,
  Divider,
  Input,
  ListItem,
  Text,
} from 'react-native-elements';
import {updateUser} from '../api/UserApi';
import {BottomSheetAtGetImage} from '../component/BottomSheets';

function getItems({ID, nickName, username, avatarUrl}) {
  return;
}

export default function PersonEditPage({navigation, route}) {
  let user = route.params.user;
  let [nickName, setNickName] = React.useState(user.nickName);
  let [avatarInfo, setAvatarInfo] = React.useState({path: user.avatarUrl});
  let [password, setPassword] = React.useState();
  let [confirePassword, setConfirePassword] = React.useState();
  let [pf, setPF] = React.useState(true);
  let [passwordDialogvisible, setPasswordDialogvisible] = React.useState(false);
  let [markPassword, setMarkPassword] = React.useState('******');
  let [passwordSame, setPasswordSame] = React.useState();
  let bottomSheetAtGetImageRef = React.createRef();
  let passwordInputRef = React.createRef();
  let items = [
    {
      key: '用户名',
      value: (
        <TextInput
          disabled
          defaultValue={user.username}
          editable={false}
          underlineColorAndroid="transparent"
        />
      ),
    },
    {
      key: '头像',
      value: (
        <Avatar
          source={{uri: avatarInfo.path}}
          size={45}
          onPress={() => {
            bottomSheetAtGetImageRef.current.open();
          }}
          rounded
          renderPlaceholderContent={<ActivityIndicator />}
        />
      ),
    },
    {
      key: '昵称',
      value: (
        <TextInput
          defaultValue={nickName}
          onChangeText={nickName => setNickName(nickName)}
          containerStyle={{maxWidth: '60%'}}
          underlineColorAndroid="transparent"
        />
      ),
    },

    {
      key: '密码',
      value: (
        <TextInput
          ref={passwordInputRef}
          secureTextEntry
          placeholderTextColor={'black'}
          defaultValue={markPassword}
          containerStyle={{maxWidth: '60%'}}
          onBlur={() => {
            // 弹出确认框
            if (password && !passwordSame) setPasswordDialogvisible(true);
          }}
          onFocus={() => {
            if (pf) {
              passwordInputRef.current.clear();
              setPF(false);
            }
          }}
          onChangeText={password => {
            setPassword(password);
            setPasswordSame(null);
          }}
          underlineColorAndroid="transparent"
        />
      ),
    },
  ];

  const submit = () => {
    if (password && !passwordSame) {
      // 要求再次确认密码
      setPasswordDialogvisible(true);
      return;
    }
    let updateUserBody = {};
    // 提交更新
    if (user.avatarUrl != avatarInfo.path) {
      updateUserBody.avatar = avatarInfo;
    }
    if (user.nickName != nickName) {
      updateUserBody.nickName = nickName;
    }
    if (password && password.length > 0) {
      updateUserBody.password = password;
    }
    updateUser(updateUserBody).then(rsp => {
      if (rsp.json().success) {
        navigation.goBack();
      }
    });
  };

  let closeDialog = () => {
    setPasswordDialogvisible(false);
    // 重置状态
  };

  return (
    <View
      style={{
        width: '90%',
        height: '100%',
        alignSelf: 'center',
        paddingTop: 40,
      }}>
      <Dialog visible={passwordDialogvisible}>
        <Dialog.Title title="确认密码" />
        <Input
          secureTextEntry
          onChangeText={p => {
            setPasswordSame(null);
            setConfirePassword(p);
          }}
          errorMessage={passwordSame === false && '密码不一致'}
        />
        <Dialog.Actions>
          <Dialog.Button
            title={'确认'}
            onPress={() => {
              // 核对密码
              if (confirePassword === password) {
                setPasswordSame(true);
                closeDialog();
              } else {
                setPasswordSame(false);
              }
            }}
          />
          <Dialog.Button
            title={'取消'}
            onPress={() => {
              closeDialog();
              setPasswordSame(null);
            }}
          />
        </Dialog.Actions>
      </Dialog>
      <Text h3 h3Style={{paddingBottom: 40, textAlign: 'center'}}>
        个人信息
      </Text>
      <ScrollView style={{maxHeight: 400}}>
        {items.map(item => (
          <ListItem key={item.key} bottomDivider containerStyle={{height: 80}}>
            <ListItem.Content>
              <ListItem.Title>{item.key}</ListItem.Title>
            </ListItem.Content>
            {item.value}
            <ListItem.Chevron />
          </ListItem>
        ))}
      </ScrollView>

      <BottomSheetAtGetImage
        ref={bottomSheetAtGetImageRef}
        onSubmit={image => {
          setAvatarInfo({path: image.uri, type: image.type});
        }}
      />
      <Button
        title={'保存'}
        containerStyle={{paddingTop: 50}}
        onPress={() => submit()}
      />
    </View>
  );
}
