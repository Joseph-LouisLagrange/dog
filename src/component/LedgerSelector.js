import React, {Component} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {getAllLedgers, getUsingLedger} from '../api/LedgerApi';

export default class LedgerSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ledgers: [],
      usingLedger: {},
    };
    this.loadLedgers();
  }

  loadLedgers() {
    getAllLedgers().then(ledgers => {
      let usingLedger = null;
      for (const ledger of ledgers) {
        if (ledger.using) {
          usingLedger = ledger;
          break;
        }
      }
      this.setState({
        ledgers: ledgers,
        usingLedger:usingLedger
      });
    });
  }

  setUsingLedger(usingLedger) {
    this.setState({
      usingLedger: usingLedger,
    });
  }

  mapItem(ledger) {
    return {label: ledger.name, key: ledger.ID, value: ledger.ID};
  }

  render() {
    return (
      <RNPickerSelect
        placeholder={{}}
        value={this.state.usingLedger.ID}
        items={this.state.ledgers.map(ledger => this.mapItem(ledger))}
        onValueChange={ID => this.props.onSelect(ID)}
      />
    );
  }
}
