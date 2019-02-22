import React ,{Component} from 'react';

class GoogleAuth extends Component {
  componentDidMount(){
    window.gapi.load('client:auth2',()=> {
      window.gapi.client.init({
        clientId:'895292412308-9nj7efudkiedroqlc7iv775306vta65p.apps.googleusercontent.com',
        scope:'email'
      });
    });
  }
  render(){
    return(
      <div>GoogleAuth</div>
    )
  }
}
export default GoogleAuth;
