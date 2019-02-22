import React , {Component} from 'react';
import { connect } from 'react-redux';
import axios from '../axios';
import  '../components/css/profile/profile.css';
import {Link} from 'react-router-dom';
// import UserCredential from '../components/profile/security/security';

class UserProfile extends Component {
  state={
    userData:[],

  }
  componentDidMount(){
    axios.get('/user/me',{
      headers: {
        'Authorization':'Token '+localStorage.getItem('token'),
        'X-Requested-With': 'XMLHttpRequest'
      },
    })
    .then(response=>{
      this.setState({userData:response.data});
      console.log(response.data)
    })
    .catch(error =>{
      console.log(error)
    })
  }
  render(){
    console.log(this.props)
    console.log(this.state.userData)

    return (
      <div>hello {this.state.userData.name}

        <div className="SecurityBox">
          <Link to="/secure"> <h1>Login&security</h1></Link>
          <p>Edit login,name, and password</p>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    loginToken:state.login.token,
    // signupToken:state.auth.token,
  }
}
export default connect(mapStateToProps)(UserProfile);
