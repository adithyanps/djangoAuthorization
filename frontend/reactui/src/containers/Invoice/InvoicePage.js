import React , { Component } from 'react';
import axios from '../../axios';
// import Aux from '../hoc/Aux/Aux'
import Modal from '../../components/UI/Modal/Invoice/Modal';
import PropTypes from 'prop-types'; // ES6
import { withRouter } from "react-router";
import './Home.css';
import { Button,Nav,NavDropdown } from 'react-bootstrap';

class InvoiceForm extends Component {
  state = {
    items:[],
    total:null,
    selectedName:null,
    invoice:null,
    holder: [{
         item:'',
         price:'',
         quantity:null,
         sub_total:null,
       }],
  };
  componentDidMount(){
    this.setState({total:null})
    this.loadItems()
  }

  loadItems = () => {
    axios.get('invoiceapp/items/').then(
      res => {
        this.setState({items:res.data});
        console.log(res.data)
      }
    )
  }
  postData=(formData)=>{
    console.log(formData)
    axios.post('invoiceapp/invoice/',formData)
      .then(response=>{console.log(response.data)})
      .catch(error=>{console.log(error)})

  }
  handleInputChange =(event)=>{
    event.preventDefault()
    let key = event.target.name
    let  value = event.target.value
    this.setState({quantity:value})
  }

  handlePriceChange =(idx) => {
    const newHolder = this.state.holder.map(
      (field, sidx) => {
        if (idx === sidx) {
          const sample = this.state.items.filter(
            ({item,price}) => item === field.item)[0]
            console.log(sample)
            if (sample !== undefined) {
              this.state.selectedPrice = sample["price"]
              field.price = sample["price"]
            }
          }
        });
  }
  totalHandler=()=>{
      let list=[]
      this.state.holder.map((value)=>{
        list.push(value.sub_total)
        if (list !== null){
          var total = list.reduce(add, 0);
          function add(a, b) {
            return a + b;
          }
          this.state.total=total
          }
        })
    }
    SubTotalHandler = (idx) => {
    let invoice =  this.props.invoice
    let holder = this.state.holder
    let sub_total = holder.sub_total
    let quantity = holder.quantity
    let price =holder.price
    const newShareholders = holder.map((field, sidx) => {
        if (idx === sidx) {
          const sample = this.state.items.filter(
            ({item,price}) => item === field.item)[0]
          sub_total = sample["price "] * sample["quantity"]
          let price1 = sample["price"]
          let qty = field.quantity
          let sub_total = price1 * qty
          this.setState({sub_total})
          if (field !== null){
              this.state.holder[idx]["sub_total"]=sub_total
          }
          if (field == null){
              return null
          }
          if (sample !== undefined) {
              this.state.sub_total = sub_total
              field.sub_total = sub_total
              // field.invoice_number = invoice
          }
      }
    })
  this.totalHandler()
  }
  handleItemChange = (idx) => (evt) => {
    const newShareholders = this.state.holder.map((shareholder, sidx) => {
      if (idx !== sidx) {
        return shareholder
      } else {
        return { ...shareholder, item: evt.target.value };
      }
    });
    this.state.holder= newShareholders;
    this.setState({holder: newShareholders});
  }
  handleQtyChange =(idx)=>(evt)=>{
    const newholder = this.state.holder.map((element, sidx) => {
      if (idx !== sidx) return element;
      return { ...element, quantity: evt.target.value };
    });
    this.setState({ holder: newholder });
    this.state.holder = [...newholder]
    this.SubTotalHandler(idx)
    this.submitButtonHandler(this.state.holder)
  }
  submitButtonHandler(holder){

    const eachData=Object.keys(holder).map(key =>{return( holder[key].sub_total)})
    if (this.props.invoice!== null & this.props.selectedName !== '' & eachData !== 0 ){
      this.setState({showButton:true})
      // console.log('true')
    } else {
      this.setState({showButton:false})
    }
  }
  handleNameChange = (idx) => (evt) => {
    const newShareholders = this.state.holder.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });
    this.setState({ holder: newShareholders });
  }
  handleSubmit = (evt) => {
    let formData={
      invoice:this.props.invoice,
      name:this.props.selectedName,
      date:this.props.dateField,
      total_amount:this.state.total,
      child:this.state.holder
    }
    console.log(formData)
    this.postData(formData)
    this.modelOpenHandler()
  }

  handleAddForm = (event,id) => {
    event.preventDefault()
    this.setState({
      holder: this.state.holder.concat([
        {
        item:'',
        price:null,
        quantity:null,
        sub_total:null,
      }])
    });
  }

  ModalHandler=(e)=>{
    return(
      <Modal
        show={this.state.openModel}
        close={this.modalWindowClose}
        submitHandler={this.handleSubmit}/>
    )
  }
  modalWindowClose = (e) => {
      this.setState({
          openModel: false,
      })
  }

  modelOpenHandler=(e)=>{
  // e.preventDefault()
  if (this.props.error ) {
    console.log('error')
    this.setState({openModel:false})


  } else {
    console.log('fine')

    this.setState({openModel:true})
  }
  }
  render() {
    console.log(this.state.holder)
    console.log(this.state.total)

    const { match, location, history } = this.props
    console.log(this.props)
    return (
      <div className="Box1">
        {this.state.openModel ? (this.ModalHandler()) : (null)}

        <form onSubmit={this.handleSubmit}>
          {this.state.holder.map((shareholder, idx) => (
            <div key={idx}>
                <select onChange={this.handleItemChange(idx)}>
                <option>selectitem</option>

                  {this.state.items.map((m ,index)=> <option key={m.id}
                  value={m.item}>{m.item}</option>)}
                </select>

                {this.handlePriceChange(idx)}
                <input
                  type='box'
                  value={shareholder.price}
                  onChange={this.handlePriceChange(idx)}
                  readOnly/>
                <input
                  type='number'
                  min='0'
                  id='quantity'
                  ref={this.quantityRef}
                  placeholder='quantity'
                  onChange={this.handleQtyChange(idx)}
                  value={shareholder.quantity}
                  disabled={!shareholder.price}
                   />
                   {(shareholder.quantity === undefined) ? (null) : (null)}
                   {(shareholder.price === undefined) ? (null) : (null)}

                <input
                  type='box'
                  id='sub_total'
                  name='sub_total'
                  placeholder="sub-total"
                  value={shareholder.sub_total}
                   />

                <button
                  type="button"
                  onClick={(event,id)=>this.handleAddForm(event,idx)}
                  className="small">+</button>
          </div>
          ))}
          <hr />
        <h2>Total</h2>  <input
            value={this.state.total}
            placeholder='total-amount' />
          <hr />
          <Button variant="outline-warning" onClick={this.handleSubmit}>Submit</Button>


        </form>

      </div>
    )
  }
}
export default withRouter(InvoiceForm);
