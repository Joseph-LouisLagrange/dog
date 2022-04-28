import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
export default class YearCalendar extends Component {
  constructor(props) {
    super(props);
    this.years = [];
    for (let i = this.props.endYear; i >= this.props.startYear; i--) {
      this.years.push(i);
    }
    this.state = {
        selecedYear : this.props.defaultYear
    }
  }
  render() {
    return (
      <ScrollView style={{height: '90%'}} showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
           // justifyContent:'space-around',
            flexWrap: 'wrap',
          }}>
          {this.years.map(year => (
            <Button
            key={year}
            onPress={()=>{
                this.setState({selecedYear:year});
                this.props.onSelect(year);
            }}
            buttonStyle={year==this.state.selecedYear&&{backgroundColor:'#1E90FF'}}
            titleStyle={year==this.state.selecedYear&&{color:'white'}}
            type='outline'
            containerStyle={{width:'21%',marginVertical:20,marginHorizontal:'6%'}}
              //style={{textAlign: 'center', paddingVertical: 20}}
              title={year}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}
