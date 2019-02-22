import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';




class PopUp extends React.Component {

    render() {
      return (
        <div>
          <Modal show={this.props.show} onHide={this.props.close}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form horizontal >
                    <FormGroup controlId="formHorizontalEmail">
                      <h1 style={{textAlign:'center',color:'green'}}>thankyou....</h1>
                        <Col  sm={2}>
                        </Col>
                        <Col sm={10}>

                        </Col>
                    </FormGroup>

                </Form>
            </Modal.Body>
            <Modal.Footer>

              <Button variant="outline-warning" onClick={this.props.close}>Close</Button>

            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }

export default PopUp;
