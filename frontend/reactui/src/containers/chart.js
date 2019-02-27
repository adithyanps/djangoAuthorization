import React,{Component} from 'react';
import axios from '../axios'

import BarChartComponent from './chart/BarChart';
import PieChartComponent from './chart/PieChart';
import BarChartCustomer from './chart/BarHc';


class Charts extends Component {
  state = {
    selectedOption:'option1',
    customer:[],
    users:[],
    selectedName:'',
  }
  componentDidMount(){
    this.loadCustomer()
    this.loadUser()

  }

  loadCustomer=()=>{
    axios.get('invoiceapp/customer/').then(
      res => {
        this.setState({customer:res.data});
        console.log(res.data)
      }
    )
  }

  loadUser=()=>{
    axios.get('invoiceapp/userchart/').then(
      res => {
        this.setState({users:res.data});
        console.log(res.data)
      }
    )
  }

  handleOptionChange=(e)=> {
    this.setState({
     selectedOption: e.target.value
   });
  }
  renderCutomerBar(){
    return(
      <div>
      <select id="select" onChange={(e)=>this.setState({selectedName:e.target.value})}>
          <option value="">select name</option>
          {this.state.customer.map((m ,index)=>
              <option key={m.id} value={m.name}>{m.name}</option>
              )
          }
      </select>
      <BarChartCustomer
             customer={this.state.customer}
             users={this.state.users}
             selectedName={this.state.selectedName}/>


      </div>
    )
  }
  render(){
    return(
      <div >
        <form>
          <div className="radio">
            <label>
              <input type="radio"onChange={this.handleOptionChange} value="option1" checked={this.state.selectedOption === 'option1'} />
                Bar-Chart
            </label>

            <label>
              <input type="radio" onChange={this.handleOptionChange} value="option2" checked={this.state.selectedOption === 'option2'} />
                 Pie-chart
            </label>
            <label>
              <input type="radio" onChange={this.handleOptionChange} value="option3" checked={this.state.selectedOption === 'option3'} />
                 Bar-Customer
            </label>
            <label>
              <input type="radio" onChange={this.handleOptionChange} value="option4" checked={this.state.selectedOption === 'option4'} />
                 Customer-year
            </label>
          </div>

       </form>
          {(this.state.selectedOption === 'option1') ? ( <BarChartComponent /> ) : null}
          {(this.state.selectedOption === 'option2') ? ( <PieChartComponent /> ) : null}
          {(this.state.selectedOption === 'option3') ? ( this.renderCutomerBar() ) : null}
          {(this.state.selectedOption === 'option4') ? ( this.renderCutomer() ) : null}

      </div>
    )
  }
}
export default Charts;
