import React, { Component } from 'react';
import './App.css';

import { withRouter} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch , Route ,Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import axios from './axios';

import * as actions from './store/actions/index';
import Navbar from './components/UI/Layout/Navbar';
import Login from './containers/Auth/Login/Login';
import Logout from './containers/Auth/Logout/Logout';
import Signup from './containers/Auth/Signup/Signup';
import Home from './containers/Home';
import UserProfile from './containers/Profile';
import Security from './components/profile/security/security';
import Default from './containers/Default';

import Chart from './containers/chart';

import Invoice from './containers/Invoice/Home';
import Orders from './containers/Invoice/Orders';
import CustomersLineChart from './components/Chart/LineChart/CustomersChart';



class App extends Component {
  componentDidMount(){

    this.props.onTryAutoSignup()

  }
  render() {
    let token = null;
    token = this.props.loginToken

    let routes = (
      <Switch>
        <Route  path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route  path="/logout" component={Logout} />
        <Route  path="/chart" component={Chart} />
        <Route  path="/invoice" component={Invoice} />
        <Route  path="/orders" component={Orders} />
        <Route  path="/orders" component={Orders} />
        <Route  path="/cusomers-linechart" component={CustomersLineChart} />



      </Switch>

    )
    if (token) {
      routes =(
        <Switch>
          <Route path="/" exact component={Home} />
          <Route  path="/chart" exact component={Chart} />

          <Route path="/profile" component={UserProfile} />
          <Route path="/secure" component={Security} />

          <Route path="/login" component={Login} />
          <Route  path="/logout" component={Logout} />

        </Switch>
      )
    }


    return (
      <div className="App">
      <React.Fragment>
        <Navbar />
        {routes}
      </React.Fragment>
    </div>
    );
  }
}
const mapStateToProps = (state)=> {
  return {
    loginToken:state.login.token,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onRedirect : ()=>dispatch(actions.redirect())

  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
