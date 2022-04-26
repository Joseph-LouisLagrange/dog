import React, {Component} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {getAllLedgers, queryUsingLedger} from '../api/LedgerApi';

export default class LedgerSelector extends Component {
  constructor(props) {
    super(props);
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
    return {label: ledger.name, key: ledger.ID, value: ledger};
  }

  render() {
    return (
      <RNPickerSelect
        placeholder={{}}
        value={this.props.selectedLedger}
        items={this.props.ledgers.map(ledger => this.mapItem(ledger))}
        onValueChange={ledger => this.props.onSelect(ledger)}
      />
    );
  }
}
