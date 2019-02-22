import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';

import axios from '../../../../axios';

class PopUp extends React.Component {


    componentDidMount(){
        this.setState({email: this.props.obj})
        console.log(this.state.email)
    }



    render() {
      console.log(this.props)
      return (
        <div>
          <Modal show={this.props.show} onHide={this.props.close}>
            <Modal.Header closeButton>
              <Modal.Title>Edit your Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form horizontal onSubmit={this.submitHandler}>
                    <FormGroup controlId="formHorizontalEmail">
                      <p>please enter your new email address...</p>
                        <Col  sm={2}>

                        </Col>
                        <Col sm={10}>
                        <FormControl name="email" type="text"  />
                        </Col>
                    </FormGroup>
                    <Button variant="success" type="submit"  >Submit</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-info" onClick={this.props.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }

export default PopUp;
