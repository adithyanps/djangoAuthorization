import React , {Component} from 'react';
import './security.css';
import {Button} from 'react-bootstrap';
import { connect } from 'react-redux';

import axios from '../../../axios';
import * as actions from '../../../store/actions/index';
import NameEdit from '../../UI/Modal/Profile/NameEditModal';
import EmailEdit from '../../UI/Modal/Profile/EmailEditModal';

class Security extends Component {
  state={
    isEditName: false,
    isEditEmail:false,
    name: null,
    email:null,
  }
  componentDidMount(){
    this.props.onTryCurrentUser()
  }
  editEmailWindowOpen=()=>{
    this.setState({
      isEditEmail:true,
      email:this.props.currentUser.email
    })
  }
  editEmailModal=()=>{
    return (
      <EmailEdit
          show={this.state.isEditEmail}
          close={this.editWindowClose}
          obj={this.state.email}/>
    )
  }
  editNameWindowOpen =()=>{
    console.log(this.props.currentUser.name)
    this.setState({
      isEditName:true,
      name:this.props.currentUser.name
    })
  }
  editNameModal = () => {
    return(
      <NameEdit
            show={this.state.isEditName}
            close={this.editWindowClose}
            obj={this.state.name}
            />
    );
  }
  editWindowClose = () => {
      this.setState({
          isEditName: false,
          isEditEmail:false,
      })
  }
  render(){
    console.log(this.props)
    return(
      <div>
        {this.state.isEditName ? (this.editNameModal()) : null}
        {this.state.isEditEmail ? (this.editEmailModal()) : null}
        <h1 className="color">Login & Security </h1>
          <div className="SecurityBox1">
          Name:  <h style={{color: 'blue'	,border: 'red'}}>{this.props.currentUser.name}</h><br/>
          <Button onClick={this.editNameWindowOpen} variant="outline-dark">edit</Button>
          </div>
          <div className="SecurityBox1">
            Email:<h style={{color: 'blue'	,border: 'red'}}>{this.props.currentUser.email}</h><br/>
            <Button onClick={this.editEmailWindowOpen} variant="outline-dark">edit</Button>
          </div>
          <div className="SecurityBox1">
            <p>Password:*********</p>
            <Button variant="outline-dark">edit</Button>
          </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    loginToken:state.login.token,
    currentUser:state.currentUser.userData
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryCurrentUser: () => dispatch(actions.currentUser()),

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Security);
