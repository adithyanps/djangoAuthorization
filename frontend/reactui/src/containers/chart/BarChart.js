import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from '../../axios';

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
              label:"collection",
              data:amount,
              backgroundColor:[
                       'rgba(255,105,145,0.6)',
                       'rgba(155,100,210,0.6)',
                       'rgba(90,178,255,0.6)',
                       'hsl(120, 100%, 75%)',

                       'rgba(240,134,67,0.6)',
                       'rgba(120,120,120,0.6)',
                       'rgba(250,55,197,0.6)',
                       'rgba(255, 0, 0, 0.3)',
                       'hsl(120, 60%, 70%)',
                       'hsl(120, 100%, 50%)',
                       'hsl(120, 100%, 25%)',
                  ]
            }
          ]
        }})
      })
    }
   render()
   {
      return(
         <div style={styles}>
            <Bar
            data = {this.state.Data}
            width={100}
            height={500}
            options={{maintainAspectRatio: false}}/>

         </div>
      )
   }
}
export default BarChartComponent;
