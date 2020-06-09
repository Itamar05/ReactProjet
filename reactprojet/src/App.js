import ListItem from './components/ListItem/ListItem'
import React, { Component } from 'react'
import Entete from './components/Includes/Entete.js'
import Footer from './components/Includes/Footer'
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import SingleItem from './components/SingleItem/SingleItem';
import PanierPage from './components/PanierPage/PanierPage';
import Accueil from './components/Accueil/Accueil';
import fire from './config/Fire.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Shipping from './components/shipping/Shipping.js'
// import {StripeProvider} from 'react-stripe-elements';
// import MyStoreCheckout from './MyStoreCheckout'
import Account from './components/Login/Account.js'
import Membre from './components/Membre/Membre.js'
// import Payment from './components/Payment/Payment.js'
import Details from './components/Details/Details.js'

 class App extends Component {
  
  constructor(props) {
		super(props);

		this.state = {
      panier: [],
      dataSingleItem:'',
      itemPanier: '',
      user: null,
      login: false,
      email: '',
      id: '',
      idFirebase: '',
      shippingData: '',
      idAddress: '',
      name: ''
    };
    this.authListener = this.authListener.bind(this);
  }

  displayLogin = () => {
      this.setState({displayLogin: true, opacity: 0.5 })
  }

  componentDidMount = () => {
    this.authListener();    
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  GetdataSingleItem =   (data) => {
      this.setState({ dataSingleItem: data, click: true })
  }

  resultPanier =  (item) => {
      this.setState({
          itemPanier: [...this.state.itemPanier, item], 
        })
  }

  getLogin = (state, email) => {
      this.setState({login: state, email: email})
  }

  getName = (names) => {
      this.setState({name: names})
  }

  getId = (id) => {
      this.setState({id: id})
  }

  getIdFirebase = (id) => {
    this.setState({idFirebase: id})
  }

  getIdAddress = (id) => {
    this.setState({idAddress: id})
    console.log(id);
  }

  Deconnexion = () => {
    this.setState({login: false}) ;
  }
  
  render() {
    
  return (

    <div style={{display: 'flex', flexDirection: 'column', opacity: this.state.opacity, zIndex: 9 }}>
        {console.log(this.state.login)}

      <Entete loginn={this.state.login} />
             
          <Switch>

              <Route path='/singleItem' > 
                <SingleItem  data={this.state.dataSingleItem} resultPanier={this.resultPanier} />    
              </Route>

              <Route path='/panier' >
                <PanierPage itemPanier={this.state.itemPanier} />
              </Route>  

              <Route path='/ListItem' >
                <ListItem  GetdataSingleItem={this.GetdataSingleItem} />
              </Route>

              <Route exact path='/'>
                <Accueil />
              </Route> 

              <Route exact path='/Accueil'>
                <Accueil />
              </Route> 

              <Route path='/Login'>
                <Login getName={this.getName} getIdFirebase={this.getIdFirebase} getLogin={this.getLogin} />
              </Route> 

              <Route exact path='/Register'>
                <Register  email={this.state.email} getNameFn={this.getNameFn} getId={this.getId} />
              </Route>

              <Route path='/ShippingForm' > 
                <Shipping getIdAddress={this.getIdAddress} email={this.state.email} name={this.state.name}  />    
              </Route>

              <Route path='/Account' > 
                <Account name={this.state.name} Deconnexion={this.Deconnexion} getIdAddress={this.getIdAddress} idAddress={this.state.idAddress} email={this.state.email}  />    
              </Route>
              
              <Route path='/Details' > 
                <Details itemPanier={this.state.itemPanier} idAddress={this.state.idAddress} />    
              </Route>

              <Route exact path='/loginToFinal'>
                <Membre getLogin={this.getLogin} login={this.state.login} getIdFirebase={this.getIdFirebase} />
              </Route>

              {/* <Route path='/Payment' > 
              
                <StripeProvider apiKey="pk_test_sGNkkUshL0Gt3Z0LxojenhIa00LQctEQjf">
                  <MyStoreCheckout />
                </StripeProvider>
                <Payment />

              </Route> */}


          </Switch>

      <Footer /> 

    </div>
    )
  }
}

export default App
