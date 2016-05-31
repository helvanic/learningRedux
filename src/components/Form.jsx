import React from 'react'
import Input from './Input.jsx'

export default class Form extends React.Component {
  constructor(){
    super();

    this.state = {
      valid : false,
      text : ""
    }
  }

  render(){
    return (
      <form onSubmit={this._handleSubmit.bind(this)}>
        <Input type="text"
               onChange={this._handleInputChange.bind(this)}/>
        <input type="submit" value="Submit"></input>
      </form>
    )
  }

  _handleSubmit(event){
    event.preventDefault();
    this.state.valid? console.log("Submission") : console.log("Submission failed");
  }

  _handleInputChange(e){
    //Checking if data is present. If not, set Form state.valid to false
    this.props.handleChange(e.target.value);
    this.setState({text : e.target.value})
    if(e.target.value==null || e.target.value === undefined || e.target.value==""){
      this.setState({valid :false});
    }else{
      this.setState({valid : true});
    }
  }

}
