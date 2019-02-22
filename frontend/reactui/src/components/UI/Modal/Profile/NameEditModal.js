import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';

import axios from '../../../../axios';

class BranchEdit extends React.Component {

    state = {
        name: '',
    }

    componentDidMount(){
        this.setState({name: this.props.obj})
        console.log(this.state.name)
    }

    submitHandler = (event) => {
      // event.preventDefault()
        let editData={
          name:this.state.name
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
              <Modal.Title>Edit Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form horizontal onSubmit={this.submitHandler}>
                    <FormGroup controlId="formHorizontalEmail">
                      <p>please enter your new name...</p>
                        <Col  sm={2}>

                        </Col>
                        <Col sm={10}>
                        <FormControl name="name" type="text"  onChange={this.changeHandler} value={this.state.name} />
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
