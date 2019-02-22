import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from '../../axios';
import Test from './Test';


class BarHc extends Component {
  state={
    Data:{},
    name:[0],
    amount:[],
    users:[],

  }

  componentDidMount(){
    console.log('did')
    this.setState({users:this.props.users})
  }
  componentDidUpdate(prevProps, prevState){
    console.log("update")
    console.log(this.props.selectedName)

     const {selectedName} = this.props;
     console.log(selectedName)

     if(selectedName !== prevProps.selectedName && selectedName!== ''){
             console.log('update selectedName!');
             this.nameBasedChart1()
        }

  }
  nameBasedChart1=()=>{
    // console.log('test')

    const test = [this.state.users.filter((item)=>item.name === this.props.selectedName)[0]]
    console.log(test[0])

    if (test[0] === undefined) {
      console.log('test')

      return(<div>test</div>)
      // let name=[]
      // let amount=[]
      // test.forEach(element=> {
      //   name.push(element.name)
      //   amount.push(element.total_amount);
      // });
      // console.log(test)
      // // console.log(amount.length)
      // this.renderfn(name,amount)
    } else {
      console.log('pass')
      let name=[]
      let amount=[]
      test.forEach(element=> {
        name.push(element.name)
        amount.push(element.total_amount);
      });
      this.renderfn(name,amount)
    }

  }
  renderfn =(name,amount) => {
      // console.log(name)
      // console.log(amount)
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
  }

  render(){
    // console.log(this.props.selectedName)
    // console.log(this.state.name)
    console.log(this.state.Data)

    if  (this.props.selectedName ===  '') {
      return (
      <div>select a name</div>
      )
    }

    return(<div>
       <Bar
       data = {this.state.Data}
       width={10}
       height={250}
       options={{maintainAspectRatio: false}}/>
    </div>)
  }
}
export default BarHc;
