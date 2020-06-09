import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Payment.css'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import fire from '../../config/Fire';


class Payment extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.insert = this.insert.bind(this);
        
        this.state = {
            address: '',
            city: '' ,
            states: '' ,
            zip :'',
            next: false
        } ;
    }

    insert(e){
        e.preventDefault();
        (this.insertDataa())
      }

    insertDataa = () => {
        const usersRef = fire.database().ref('commandes');
        const child = usersRef.child(`client`)

        const commande = {
          address: this.state.address,
          city: this.state.city,
          states: this.state.states,
          zip: this.state.zip,
          email: this.props.email
        }
        child.set(commande); 

        this.setState({
          address: '',
          city: '',
          state:'',
          zip: '',
          next: true
        });
      }

    handleChange(e) {
       this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        if (this.state.next) {
            return <Redirect to='/Payment' />
        }

        return (

            <div className='formShipping container'>

            <form>
    

  <div className="form-group">
    <label htmlFor="inputAddress">Address</label>
    <input value={this.state.address} onChange={this.handleChange} type="text" name='address' className="form-control" id="inputAddress" placeholder="1234 Main St" />
  </div>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label htmlFor="inputCity">City</label>
      <input value={this.state.city} onChange={this.handleChange} type="text" name='city' className="form-control" id="inputCity" />
    </div>
    <div className="form-group col-md-4">
      <label htmlFor="inputCity">State</label>
      <input value={this.state.states} onChange={this.handleChange} name='states' type='text' className="form-control" />
        
    </div>
    <div className="form-group col-md-2">
      <label htmlFor="inputZip">Zip</label>
      <input value={this.state.zip} onChange={this.handleChange} name='zip' type="text" className="form-control" id="inputZip" />
    </div>
  </div>

<button type="submit" className="btn btn-primary" onClick={this.insert}>Suivant</button>
</form>
</div>

    )}
}

export default Payment 

