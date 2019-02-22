import React from 'react';
import axios from 'axios';
import {Col, Raw,FormControl, FormGroup, Form, ControlLabel, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
class BranchEdit extends React.Component {



    render() {
      return (
        <Modal
        {...this.props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show} onHide={this.props.close}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
             View
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{"textAlign":"center"}}>
          <h3>Name:{this.props.objct.name}</h3>
          <h3>InvoiceNumber:{this.props.objct.invoice}</h3>
          {this.props.objct.child.map((shareholder, idx) => (
                              <div key={idx} >
                              <input readOnly value={shareholder.item}/>
                                  <input
                                    readOnly
                                    type='box'
                                    value={shareholder.price}/>
                                  <input
                                    readOnly
                                    type='number'
                                    min='0'
                                    id='quantity'
                                    ref={this.quantityRef}
                                    placeholder='quantity'
                                    value={shareholder.quantity} />
                                  <input
                                    readOnly
                                    type='box'
                                    id='sub_total'
                                    name='sub_total'
                                    placeholder="sub-total"
                                    value={shareholder.sub_total}/>
                              </div>
                            ))}
                        Total:{this.props.objct.total_amount}
                        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button  type="submit" variant="info"  onClick={(e,id) => this.props.editwindow(e,this.props.objct.id)} >Edit</Button>
          <Button  type="submit" variant="danger" onClick={(e,id) => this.props.deletewindow(e,this.props.objct.id)}>Delete</Button>

        </Modal.Footer>
      </Modal>

      );
    }
  }

export default BranchEdit;
