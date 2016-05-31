import React from 'react'

export default class Input extends React.Component{
  constructor(){
    super();

    this.state = {
      valid : false
    }
  }

  render(){
    return (
      <input
        type={this.props.type}
        onChange={this.props.onChange}>
      </input>);
  }
}
