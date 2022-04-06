import React, { Component } from 'react'

export default class BaseComponent extends Component {
  route;
  navigation;
  constructor(props){
    super(props);
    this.route = props.route;
    this.navigation = props.navigation;
  }
}
