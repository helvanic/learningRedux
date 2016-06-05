import React from 'react'
import userListStore from '../UserListStore';

export default class UserBox extends React.Component {
  constructor(){
    super();
    this.state = {
      verified : false
    };
  }

  render(){
    const boxStyle = {
      margin : "auto",
      padding : '15px',
      textAlign : 'center',
      float : 'left',
      border : '1px solid #000'
    };

    const statusDisplay = () => {
      if(!this.props.verified){
        return (
          <div>
            <p>Not verified</p>
            <button onClick={this._handleVerify.bind(this)}>Verify</button>
          </div>
        );
      }else{
        return <p>Verified</p>
      }
    }

    return (
      <div style={boxStyle}>
        <p>ID : {this.props.id}</p>
        <p>Name : {this.props.name}</p>
        {statusDisplay()}
        <button onClick={this._handleRemove.bind(this)}>Remove User</button>
      </div>
    )
  }

  _handleVerify(){
    this.props.verify(this.props.id);
  }

  _handleRemove(){
    this.props.remove(this.props.id);
  }
}
