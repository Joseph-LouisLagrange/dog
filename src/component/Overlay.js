import React, {Component} from 'react';

export default class Overlay extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible : false
        }
    }
    open(){
        this.setState({
            visible:true
        });
    }
    close(){
        this.setState({
            visible:false
        })
    }
  render() {
    return (
      <Modal
        transparent={true}
        hardwareAccelerated={true}
        presentationStyle="overFullScreen"
        visible={this.state.visible}>
        {this.props.children}
      </Modal>
    );
  }
}
