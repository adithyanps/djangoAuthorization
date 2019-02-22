import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import { Button,Form } from 'react-bootstrap';
import './Signup.css';
import * as actions from '../../../store/actions/index';
import SignupModal from '../../../components/UI/Modal/Signup/popUp';

class Signup extends Component {
  state = {
    name:'',
    email:'',
    password:'',
    isModalOpen:false,

  }
  modelHandler1 = () => {
    // console.log(this.props.error)

    if (this.props.error ) {
      console.log('error')
      this.setState({isModalOpen:false})


    } else {
      console.log('fine')

      this.setState({isModalOpen:true})
    }
  }
  submitSignupDataHandler = (e) => {
    e.preventDefault()

    this.props.onAuth(
      this.state.name,
      this.state.email,
      this.state.password
    )
    console.log(this.props)
    this.modelHandler1()

  }
  handleInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.name,event.target.value)
    let key = event.target.name
    let  value = event.target.value
  this.setState({[key]:value})
  }
  ModalHandler=()=>{
    return (
      <SignupModal
          show={this.state.isModalOpen}
          close={this.modalWindowClose}
          />
    )
  }
  modalWindowClose = () => {
      this.setState({
          isModalOpen: false,
      })
  }
  render() {

    console.log(this.props.error)
    console.log(this.state.isModalOpen)


    let passwordError = null
    if (this.props.error) {
      if (this.props.error.password === undefined) {
        passwordError = null
      }else {
        passwordError = (
          <p style={{"color":"red"}}>{this.props.error.password[0]}</p>
        )
      }
    }
    let emailError = null
    if (this.props.error) {
      if (this.props.error.email === undefined) {
        emailError = null
      } else {
        emailError = (
          <p style={{"color":"red"}}>{this.props.error.email[0]}</p>
        )
      }
    }
    // if(this.props.error===null) {
    //   this.setState({isModalOpen:true});
    //   console.log("error")
    // }
    return (<div>
      {this.state.isModalOpen ? (this.ModalHandler()) : null}
      <Form onSubmit={(e)=>this.submitSignupDataHandler(e)} className="Signup">
        <Form.Group controlId="formGroupName">
        <Form.Label>name</Form.Label>
        <Form.Control onChange={this.handleInputChange} type="text" placeholder="Enter name" name="name" />
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
        <Form.Label>email{emailError}</Form.Label>
        <Form.Control onChange={this.handleInputChange} type="email" placeholder="email" name="email" />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
        <Form.Label>password{passwordError}</Form.Label>
        <Form.Control onChange={this.handleInputChange} type="password" placeholder="Password" name="password" />
        </Form.Group>

            <Button onClick={this.submitSignupDataHandler} variant="outline-dark">Signup</Button>

      </Form>
      do you have an account?
      <br/>
      <Link to="/login">
          <Button variant="outline-info">login</Button>
      </Link>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    error:state.auth.error,
    loginToken:state.login.token,
  }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (name,email, password) => dispatch(actions.auth(name,email,password)),
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Signup);
