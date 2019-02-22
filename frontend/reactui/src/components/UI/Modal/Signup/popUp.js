import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';

import axios from '../../../../axios';

class SignupPopUp extends React.Component {

    render() {
      // console.log(this.props)
      return (
        <div>
          <Modal show={this.props.show} onHide={this.props.close}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form horizontal >
                    <FormGroup controlId="formHorizontalEmail">
                      <h1 style={{textAlign:'center',color:'green'}}>Successfully created your account !!!</h1>
                        <Col  sm={2}>

                        </Col>
                        <p style={{textAlign:'center',	color: 'black',textShadow: '2px 2px 5px blue'}}>please click the login button for login...</p>

                        <Col sm={10}>

                        </Col>
                    </FormGroup>

                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-warning" onClick={this.props.close}>Close</Button>
              <Link to="/login"><Button variant="outline-info" >login</Button></Link>

            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }

export default SignupPopUp;
