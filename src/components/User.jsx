import React from 'react'

export default class User extends React.Component {
  constructor(){
    super();
    this.state = {
      visible : true
    }
  }

  render(){
    let userNameStyle = {
      display : this.state.visible? "block" : "none",
      margin : "0 5px"
    }
    return (
      <div>
        <a style={{float : "left", display:"block"}} href="#" onClick={this._handleClick.bind(this)}>{this._buttonValue()}</a>
        <p>&nbsp;&nbsp;ID : {this.props.id}</p>
        <p style={userNameStyle}>&nbsp;&nbsp;Name : {this.props.name}</p>
      </div>
    )
  }

  _buttonValue(){
    if(this.state.visible){
      return `Hide name`;
    }else{
      return "Show name"
    }
  }

  _handleClick(){
    this.setState({
      visible : !this.state.visible
    });
  }
}
