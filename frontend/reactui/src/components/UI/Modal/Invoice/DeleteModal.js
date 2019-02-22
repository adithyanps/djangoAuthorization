import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';




class DeleteModal extends React.Component {

    render() {
      return (

          <Modal show={this.props.show} onHide={this.props.close}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form  >
                    <FormGroup controlId="formHorizontalEmail">
                      <h1 style={{textAlign:'center',color:'green'}}>are you sure to delete</h1>
                        <Col  sm={2}>
                        </Col>
                        <Col sm={10}>

                        </Col>
                    </FormGroup>

                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.props.deleteHandler}>Delete</Button>
              <Button variant="outline-warning" onClick={this.props.close}>Close</Button>

            </Modal.Footer>
          </Modal>

      );
    }
  }

export default DeleteModal;
