import React , {Component} from 'react';
import axios from '../../axios';
// import FormUpdate from './Update';
import { withRouter } from "react-router";
import DeleteModal from '../../components/UI/Modal/Invoice/DeleteModal';
import ViewModal from '../../components/UI/Modal/Invoice/ViewModal';
import EditModal from '../../components/UI/Modal/Invoice/EditModal';
import Pagex from '../../components/UI/Pagination/Pagination';
import {Button, Table, Modal} from 'react-bootstrap';

class Orders extends Component{
  state={
    invoiceData:[],
    isEdit:false,
    invoice_number:null,
    isDelete:false,
    deleteId:null,
    editId:null,
    isView: false,
    viewObject:[],
    editObject:[],


    perpage: 5,
    curr_page: 1,
    start_point: 0,
    end_point: null,
    prevDisabled: true,
    nxtDisabled: false,
    firstDisabled: true,
    lastDisabled: false
  }
  componentDidMount(){
    this.loadInvoiceData()
    this.setState({
        end_point: this.state.start_point + this.state.perpage
    })
  }
  pagexClickHandler = (pageNo) => {
      console.log(pageNo)
      let length = this.state.invoiceData.length
      let pr_pg = this.state.perpage
      let page_count = Math.ceil(length/pr_pg)
      let st_pt = (pageNo-1)*pr_pg
      let ed_pt = (pageNo<page_count || length%pr_pg===0)? st_pt+pr_pg: st_pt + length%pr_pg

      if(pageNo === 1){
          this.setState({
              prevDisabled: true,
              firstDisabled: true,
              nxtDisabled: false,
              lastDisabled: false,
          })
      }
      else if(pageNo === page_count){
          this.setState({
              nxtDisabled: true,
              lastDisabled: true,
              prevDisabled: false,
              firstDisabled: false,
          })
      }
      else{
          this.setState({
              nxtDisabled: false,
              prevDisabled: false,
              firstDisabled: false,
              lastDisabled: false,
          })
      }

      this.setState({
          curr_page: pageNo,
          start_point: st_pt,
          end_point: ed_pt

      })
  }
  previousClickHandler = () => {
      if(this.state.curr_page > 1){
          this.pagexClickHandler(this.state.curr_page-1)
      }
  }
  nextClickHandler = () => {
      let length = this.state.invoiceData.length
      let page_count = Math.ceil(length/this.state.perpage)
      if(this.state.curr_page < page_count){
          this.pagexClickHandler(this.state.curr_page+1)
      }
  }

  firstClickHandler = () => {
      if(this.state.curr_page > 1){
          this.pagexClickHandler(1)
      }
  }

  lastClickHandler = () => {
      let length = this.state.invoiceData.length
      let page_count = Math.ceil(length/this.state.perpage)
      if(this.state.curr_page < page_count){
          this.pagexClickHandler(page_count)
      }
  }

  loadInvoiceData(){
    axios.get('invoiceapp/invoice').then(
      res => {
        this.setState({invoiceData:res.data});
        console.log(res.data)
      }
    )
  }
  deleteWindowOpen= (e,id) =>{
    e.preventDefault()
    this.setState({isDelete:true,deleteId:id})
  }
  deleteHandler = (event) => {
    event.preventDefault()
    let id = this.state.deleteId
    const updatedOrders = this.state.invoiceData;
    let deleteObject = this.state.invoiceData.filter(item =>  item.id === id)
    let delIndex = updatedOrders.indexOf(deleteObject[0])
    axios.delete('invoiceapp/invoice/'+id).then(
       response => {
           updatedOrders.splice(delIndex,1)
           this.setState({
               invoiceData: updatedOrders,
               isDelete: false,
           })
           // this.viewWindowClose()
       }
    )

  }
  deleteModal = () => {
    return(
      <DeleteModal
          show={this.state.isDelete}
          close={this.deleteWindowClose}
          deleteHandler = {this.deleteHandler}/>
        )
  }
  deleteWindowClose = () => {
      this.setState({
          isDelete: false,
      })
  }
  viewWindowOpen = (e,id) => {
    e.preventDefault()
      const filterData = this.state.invoiceData.filter(item => { return item.id === id})
      console.log(filterData)
      console.log(filterData[0])
      this.setState({
          isView: true,
          viewObject: filterData[0],
      })
      // console.log(this.state.viewObject)

  }
  viewModal = () => {
    return(
      <ViewModal
            show={this.state.isView}
            close={this.viewWindowClose}
            objct={this.state.viewObject}
            deletewindow={this.deleteWindowOpen}
            editwindow={this.editWindowOpen}
      />
    )

  }
  viewWindowClose = () => {
      this.setState({
          isView: false,
          viewObject: {},
      })
  }
  editWindowOpen = (e,id) => {
    e.preventDefault()
      const filterData = this.state.invoiceData.filter(item => { return item.id === id})
      this.setState({
          isEdit: true,
          editObject: filterData[0],
          editId:id,
      })
  }
  editModal = () => {
      return(
          <EditModal
                show={this.state.isEdit}
                close={this.editWindowClose}
                objct={this.state.editObject}
                editId={this.state.editId}
            />
      );
  }
  editWindowClose = () => {
      this.setState({
          isEdit: false,
          editObject: {},
      })
  }

  testFunction = () => {
      console.log('here iam ')
      let total_items = 100
      let items_perpage = 23
      let pagecount = total_items%items_perpage===0 ? total_items/items_perpage : Math.floor(total_items/items_perpage)+1
      console.log('Total Item: '+total_items+ '  Items_perpage: '+items_perpage+'   pagecount: '+pagecount)
  }
  render(){
    const itemlist = this.state.invoiceData.slice(this.state.start_point,this.state.end_point).map((branch, index)=> {
        return(
            <tr key={branch.id}>
                <td>{index+this.state.start_point+1}</td>
                <td>{branch.name}</td>
                <td>{branch.total_amount}-RS</td>
                <td><a href='#' onClick={(e)=>this.viewWindowOpen(e,branch.id)} className="w2-btn w2-gray w2-small"><i className="w3-margin-left fa fa-eye"></i></a></td>
                <td>
                    <Button  bsStyle="link" onClick={(e,id) => this.editWindowOpen(e,branch.id)} className="w2-btn w2-gray w2-small">
                          <i className="w3-margin-left fa fa-edit"></i>
                    </Button>
                </td>
                <td>
                    <Button bsStyle="link"   onClick={(e,id) => this.deleteWindowOpen(e,branch.id)} className="w2-btn w2-gray w2-small">
                    <i
                      className="w3-margin-left fa fa-trash">
                      </i>
                    </Button>
                </td>
            </tr>
        );
    })
    return(
      <div>
      <div className="BranchList">
      {this.state.isEdit ? (this.editModal()) : null}
      {this.state.isDelete ? (this.deleteModal()) : null}
      {this.state.isView ? (this.viewModal()) : null}
          <h3>order List</h3>
          <Table striped bordered hover variant="dark">
              <thead>
                  <tr>
                    <th>#</th>
                    <th>name</th>
                    <th>total-amount</th>
                    <th>view </th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
              </thead>
              <tbody>
                  {this.state.invoiceData.length >0 ? (itemlist): (<div>there is no saved data</div>)}
              </tbody>
          </Table>
      </div>
      <div style={{textAlign:'center'}}>
      <Pagex item_count={this.state.invoiceData.length}
          perpage_count={this.state.perpage}
          page={this.state.curr_page}
          click={this.pagexClickHandler}
          prevClick={this.previousClickHandler}
          nxtClick={this.nextClickHandler}
          firstClick = {this.firstClickHandler}
          lastClick = {this.lastClickHandler}
          nxtDisabled = {this.state.nxtDisabled}
          prevDisabled = {this.state.prevDisabled}
          firstDisabled = {this.state.firstDisabled}
          lastDisabled = {this.state.lastDisabled}  />
      </div>
      </div>
    )
  }
}
export default withRouter(Orders);
//
//
// return(
//   <div>
//   {this.state.isDelete ? (this.deleteModal()) : null}
//   {this.state.isView ? (this.viewModal()) : null}
//   {this.state.isEdit ? (this.editModal()) : null}
//
//
//       {this.state.invoiceData.length > 0 ? this.state.invoiceData.map((order,id) => (
//             <div key={id}>
//               <form>
//                 <input disabled type='text' size="1" value={` ${id + 1} `}/>
//                 <input value={order.name} readOnly size="8"/>
//                 <input type="text" name="brand_name" value={order.invoice} size="6" readOnly/>
//                 <input value={order.date} readOnly size="8"/>
//                 <input  value={order.total_amount} readOnly size="10"/>
//                 <button
//                   onClick={(e,id)=>this.deleteWindowOpen(e,order.id)}
//                   className="w2-btn w2-gray w2-small"><i
//                     className="w3-margin-left fa fa-trash">
//                     </i>
//                 </button>
//                 <button
//                       onClick={(e,id)=>this.editWindowOpen(e,order.id)}
//                       className="w2-btn w2-gray w2-small">
//                         <i className="w3-margin-left fa fa-edit"></i>
//                 </button>
//                 <button
//                       onClick={(e)=>this.viewWindowOpen(e,order.id)}
//                       className="w2-btn w2-gray w2-small">
//                         <i className="w3-margin-left fa fa-eye"></i>
//                 </button>
//               </form>
//             </div>
//           )
//         ): <p>there is no saved data</p>
//     }
//   </div>
// )
