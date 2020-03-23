import ListItem from './components/ListItem/ListItem'
import React, { Component } from 'react'
import Carousel from './components/Includes/Carousel.js';
import Entete from './components/Includes/Entete.js'
import Footer from './components/Includes/Footer'
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Route, Switch } from 'react-router-dom';
import SingleItem from './components/SingleItem/SingleItem';
import PanierPage from './components/PanierPage/PanierPage';
import Accueil from './components/Accueil/Accueil';

 class App extends Component {
  
  constructor(props) {
		super(props);

		this.state = {
      panier: [],
      dataSingleItem:''
      
		};
  }

  GetdataSingleItem =   (data) => {

      console.log('recois dans App', data);
        
          this.setState({
          dataSingleItem: data
        })
      
        console.log('recois dans le state de App', this.state.dataSingleItem);
    }


  // getPanier = (itemPanier) => {

  // console.log('recois dans lapp',itemPanier);

  //   this.setState({
  //     panier: itemPanier
  //   })
  // }


  render() {
    return (

    <div style={{display: 'flex', flexDirection: 'column' }}>
      <Entete />
        <Carousel />
            <Switch>

              <Route path='/SingleItem'  component={() => <SingleItem  data={this.state.dataSingleItem}/>} />  
              <Route path='/panier'   component={() => <PanierPage itemPanier={this.state.panier} />}  /> 
              <Route path='/ListItem' component={() => <ListItem GetdataSingleItem={this.GetdataSingleItem}/>}     /> 
              <Route exact path='/'   component={Accueil}         />
              <Route exact path='/Accueil' component={Accueil}  />

            </Switch>
      <Footer /> 
    </div>
    )
  }
}

export default App;
