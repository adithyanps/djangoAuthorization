import React, { Component } from 'react';
import {Bar,Line,defaults} from 'react-chartjs-2';
import axios from '../../../axios';

defaults.global.maintainAspectRatio = false

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

class BarChartComponent extends Component {
   constructor(props) {
      super(props);
      this.state ={
        Data: {}
       }
  }
  componentDidMount() {
    axios.get('invoiceapp/userchart/')
      .then(res=>{
        const customer = res.data;
        let amount = []
        let name = []
        customer.forEach(element => {
          name.push(element.name)
          amount.push(element.total_amount);
        });
        this.setState({Data: {
          labels: name,
          datasets:[
            {
              data:amount,
              // backgroundColor:[
              //          'rgba(255,105,145,0.6)',
              //          'rgba(155,100,210,0.6)',
              //          'rgba(90,178,255,0.6)',
              //          'hsl(120, 100%, 75%)',
              //
              //          'rgba(240,134,67,0.6)',
              //          'rgba(120,120,120,0.6)',
              //          'rgba(250,55,197,0.6)',
              //          'rgba(255, 0, 0, 0.3)',
              //          'hsl(120, 60%, 70%)',
              //          'hsl(120, 100%, 50%)',
              //          'hsl(120, 100%, 25%)',
              //     ],
              label: 'all users collection',
              fill: false,
              lineTension: 0.1,
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
            }
          ]
        }})
      })
    }
   render()
   {
      return(
        <div style={styles}>
           <Line
              data={this.state.Data}
           />
         </div>
      )
   }
}
export default BarChartComponent;
