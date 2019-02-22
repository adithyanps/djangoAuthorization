import React , { Component } from 'react';
import axios from '../../axios';
import moment from 'moment';
import InvoicePage from './InvoicePage';
import './Home.css';

class Customer extends Component{
  state={
    customer:[],
    selectedName:'',
    date:new Date(),
    invoice_number:null,
    invoiceData:[],
  }
  componentDidMount(){
    this.setState({
      date:moment(new Date()).format('YYYY-MM-DD'),
    })
    this.loadCustomer()
    this.loadInvoiceData()
  }
  loadInvoiceData=()=>{
    axios.get('invoiceapp/invoice').then(
      res => {
        this.setState({invoiceData:res.data});
        console.log(res.data)
      }
    )
  }
  loadCustomer=()=>{
    axios.get('invoiceapp/customer/').then(
      res => {
        this.setState({customer:res.data});
        console.log(res.data)
      }
    )
  }
  handleInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.name,event.target.value)
    let key = event.target.name
    let  value = event.target.value
  this.setState({[key]:value})
  }
  autoInvoice=()=>{
    let list = []
    this.state.invoiceData.map((m)=>(list.push(m.invoice)))
    if ( list !== null) {
      let invoice = Math.max.apply(null,list)
      invoice = invoice + 1
      this.state.invoice_number = invoice
    }
  }
  render(){
    return(
      <div>
      {this.autoInvoice()}
        <div className="Box">
            <label>INVOICE-NUMBER</label>
            <input
                  id='invoice_number'
                  name='invoice_number'
                  className='form-control'
                  type="number"
                  min="0"
                  value={this.state.invoice_number}
                  onChange={this.handleInputChange}
                  placeholder=" invoice number "
                  required='required'/>
            <div>
                <label>select name</label>
            </div>
            <select id="select" onChange={(e) => this.setState({selectedName:e.target.value})}>
                <option value="">select name</option>
                {this.state.customer.map((m ,index)=>
                    <option key={m.id}
                          value={m.name}>{m.name}</option>)
                }
            </select>
            <br />
            <label >choose-Date</label>
            <input
                type='date'
                id='date'
                name='date'
                value={this.state.date}
                className='form-control'
                onChange={this.handleInputChange}
                required='required'/>

        </div>
        <InvoicePage
              selectedName={this.state.selectedName}
              dateField={this.state.date}
              invoice={this.state.invoice_number}
        />
      </div>
    )
  }
}
export default Customer;
