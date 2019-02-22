import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';

import axios from '../../../../axios';

class BranchEdit extends React.Component {

    state = {
        email: '',
    }

    componentDidMount(){
        this.setState({email: this.props.obj})
        console.log(this.state.email)
    }

    submitHandler = (event) => {
      // event.preventDefault()
        let editData={
          email:this.state.email
        }
        console.log(editData)
        axios.patch('/user/me/',editData,{
              headers: {
                'Authorization':'Token '+localStorage.getItem('token')
                ,'X-Requested-With': 'XMLHttpRequest'
              },
            })
            .then(response=>{

              console.log(response.data)
            })
            .catch(error =>{
              console.log(error)
            })

    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(event.target.name,event.target.value)
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
                        <FormControl name="email" type="text"  onChange={this.changeHandler} value={this.state.email} />
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

export default BranchEdit;
