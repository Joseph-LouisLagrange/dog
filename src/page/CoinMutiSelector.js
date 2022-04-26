import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {
  Avatar,
  ButtonGroup,
  CheckBox,
  ListItem,
  Text,
} from 'react-native-elements';
import {queryAllCoins} from '../api/CoinApi';
import Loading from '../component/Loading';
import storage from '../service/Storage';
import {showSibling} from '../util/ViewUtil';

export default class CoinMutiSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCoinIDSet: new Set(),
      allCoins: [],
    };
    this.load();
  }
  async load() {
    const love = showSibling(<Loading />);
    const [allCoins] = await Promise.all([queryAllCoins()]);
    let selectedCoinIDSet = new Set();
    storage
      .getIdsForKey('selectedCoins')
      .then(IDs => {
        IDs.forEach(ID => selectedCoinIDSet.add(ID));
      })
      .catch(err => {})
      .finally(() => {
        this.setState({
          allCoins: allCoins,
          selectedCoinIDSet: selectedCoinIDSet,
        });
      });
    love.destroy();
  }

  render() {
    return (
      <ScrollView style={this.props.style}>
        {this.state.allCoins.map(coin => (
          <ListItem bottomDivider key={coin.ID}>
            <Avatar rounded={true} source={{uri: coin.iconUrl}} />
            <ListItem.Content style={{}}>
              <ListItem.Title>{coin.name}</ListItem.Title>
              <ListItem.Subtitle>{coin.shortName}</ListItem.Subtitle>
            </ListItem.Content>
            <CheckBox
              right={true}
              iconRight
              size={50}
              checked={this.state.selectedCoinIDSet.has(coin.ID)}
              onPress={() => {
                let selectedCoinIDSet = this.state.selectedCoinIDSet;
                if (selectedCoinIDSet.has(coin.ID)) {
                  storage
                    .remove({key: 'selectedCoins', id: coin.ID})
                    .then(() => {
                      selectedCoinIDSet.delete(coin.ID);
                      this.setState({
                        selectedCoinIDSet: selectedCoinIDSet,
                      });
                    });
                } else {
                  storage
                    .save({
                      key: 'selectedCoins',
                      id: coin.ID,
                      data: coin,
                    })
                    .then(() => {
                      selectedCoinIDSet.add(coin.ID);
                      this.setState({
                        selectedCoinIDSet: selectedCoinIDSet,
                      });
                    });
                }
              }}
            />
          </ListItem>
        ))}
      </ScrollView>
    );
  }
}
