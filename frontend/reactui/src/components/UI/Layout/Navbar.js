import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button,Navbar,Nav,NavDropdown } from 'react-bootstrap';
import './Navbar.css'

class Navbars extends Component {
  render() {
    console.log(this.props)
    let token = null;
    token = this.props.loginToken

    return (
      <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/invoice" className="nav-link">Invoice</Link>
            <Link to="/orders" className="nav-link">Orders</Link>
            <NavDropdown title="Charts" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/chart">Chart</NavDropdown.Item>
              <NavDropdown.Item href="/cusomers-linechart">customers-linechart</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>

        {(token  === null) ? (
          <ul className="navbar-nav align-items-center">
            <li className="nav-item ml-5">
              <Link to="/signup" className="nav-link">signup</Link>
            </li>
            <li className="nav-item ml-5">
            <Link to="/login" className="nav-link">login</Link>
            </li>
          </ul>
        ) : (<div>
                <ul className="navbar-nav align-items-center">

                  <li>
                      <div className="dropdown" style={{"float":"right"}}>
                        <button className="dropbtn">
                        <i className="fas fa-user" style={{"fontsize":"30px","color":"green"}}></i>
                        </button>
                      <div className="dropdown-content" >
                        <Link to="/profile" className="nav-link">Profile</Link>
                        <Link to="/logout" className="nav-link">logout</Link>
                      </div>
                      </div>
                    </li>
                </ul>
              </div>
          )}
        </Navbar.Collapse>
      </Navbar>{this.props.children}</div>
    )
  }
}
function mapStateToProps(state) {
  return {
    loginToken:state.login.token,
    // signupToken:state.auth.token,
  }
}

export default connect(mapStateToProps)(Navbars);
