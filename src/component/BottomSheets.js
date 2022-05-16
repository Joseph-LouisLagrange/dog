import React, {Component} from 'react';
import {BottomSheet, ListItem} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, request} from 'react-native-permissions';

export class BottomSheetAtGetImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectVisible: false,
    };
  }

  launchCamera0 = () => {
    request(PERMISSIONS.ANDROID.CAMERA).then(result => {
      launchCamera().then(rsp => {
        this.submit(rsp);
      });
    });
  };

  submit(rsp) {
    if (!rsp.didCancel) {
      if (this.props.onSubmit) {
        this.props.onSubmit(rsp.assets[0]);
      }
      this.close();
    }
  }

  launchImageLibrary0 = () => {
    launchImageLibrary().then(rsp => {
      this.submit(rsp);
    });
  };

  open() {
    this.setState({selectVisible: true});
  }
  close() {
    this.setState({selectVisible: false});
  }
  render() {
    return (
      <BottomSheet isVisible={this.state.selectVisible}>
        <ListItem bottomDivider onPress={this.launchCamera0}>
          <ListItem.Content>
            <ListItem.Title>拍照</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider onPress={this.launchImageLibrary0}>
          <ListItem.Content>
            <ListItem.Title>相册</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          bottomDivider
          containerStyle={{backgroundColor: 'red'}}
          onPress={() => {
            if (this.props.onCancel) {
              this.props.onCancel();
            }
            this.close();
          }}>
          <ListItem.Content>
            <ListItem.Title style={{color: 'white'}}>取消</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </BottomSheet>
    );
  }
}
