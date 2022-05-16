import React, {Component} from 'react';
import {EventEmitter, ScrollView, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import Search from 'react-native-search-box';
import {searchByKeyword} from '../api/BillApi';
import BillItemBlock from '../component/BillItemBlock';
import Loading from '../component/Loading';
import {showSibling} from '../util/ViewUtil';

export default function BillSearchPage({navigation}) {
  const [searchText, setSearchText] = React.useState();
  const [block, setBlock] = React.useState();
  let SearchBarRef;
  let search = searchText => {
    const love = showSibling(<Loading />);
    searchByKeyword(searchText).then(block => {
      setBlock(block);
      love.destroy();
    });
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      <View style={{}}>
        <Search
          onSearch={searchText => {
            search(searchText);
          }}
          inputStyle={{fontSize: 18}}
          inputHeight={50}
          cancelTitle={'取消'}
          onCancel={() => {
            navigation.goBack();
          }}
          onDelete={() => {
            setBlock(null);
          }}
          placeholder={'搜索'}
        />
      </View>
      <ScrollView style={{height: '40%'}}>
        {block && (
          <BillItemBlock
            onPressItem={bill => {
              navigation.navigate({
                name: 'Bill-Detail-Page',
                params: {bill: bill},
              });
            }}
            coin={block.coin}
            dateTime={block.dateTime}
            bills={block.bills || []}
            total={block.total}
          />
        )}
      </ScrollView>
    </View>
  );
}
