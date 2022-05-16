import React, {Component} from 'react';
import {Avatar, Icon, ListItem} from 'react-native-elements';
import LedgerFace from './LedgerFace';

export default class LedgerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  select() {
    this.setChecked(true);
  }

  unselect() {
    this.setChecked(false);
  }

  setChecked(check) {
    this.setState({
      checked: check,
    });
  }
  render() {
    return (
      <ListItem disabled={this.props.disabled} containerStyle={{width: '100%'}} topDivider bottomDivider>
        <ListItem.Content>
          <LedgerFace ledger={this.props.ledger} />
        </ListItem.Content>
        {this.props.selectMode === true && (
          <ListItem.CheckBox
            uncheckedIcon={
              <Icon
                name="checkbox-blank-circle-outline"
                type="material-community"
              />
            }
            checkedIcon={
              <Icon name="check-circle-outline" type="material-community" />
            }
            checked={this.state.checked}
            onPress={() => {
              if (!this.state.checked && this.props.onSelect) {
                this.props.onSelect(this.props.bill);
              } else if (this.state.checked && this.props.onUnselect) {
                this.props.onUnselect(this.props.bill);
              }
              this.setChecked(!this.state.checked);
            }}
          />
        )}
      </ListItem>
    );
  }
}
