import React , {Component} from 'react';
import { connect } from 'react-redux';
import axios from '../axios';

class Home extends Component {
  state = {
    me:[],

  }
  currentUser = ()=>{
    // let data={
    //   name:"bottle"
    // }
    // axios.get("/recipe/tags/",data,{
    //   headers: {'Authorization':'Token ' + localStorage.getItem('token'),
    //     },
    // }).then(
    //   response=> {
    //     this.setState({me:response.data});
    //     console.log(response.data)
    //   }
    // )
    // .catch(error=>{
    //   console.log(error)
    // })
    // console.log(localStorage.getItem('token'))
    console.log("tested")

  }
  render(){
    console.log(this.props.loginToken)
    console.log(this.state.me)

    let token = null;
    token = this.props.loginToken
    console.log(token)
    let button=null
    if (token) {
       button = (<button onClick={this.currentUser}>add</button>)
    }

    return(
      <div>
      hello from react
      {button}
      </div>
    )
  }
}
const mapStateToProps = (state)=> {
  return {
    loginToken:state.login.token,
  }
}
export default connect(mapStateToProps)(Home);
