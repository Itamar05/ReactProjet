import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Panier.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Panier extends Component {

        constructor(props){
            super(props);
    
            this.state = {
                click: false,
                clickPanier: false,
                itemPanier:[]
            }
        }

        hundleSubmit = () => {
            this.setState({click: true})
            // {this.props.DisplayPanier()}
            // console.log(this.state.click);
        }


    render() {

            if (this.state.click == false) {
                return  <div className='divGeneral' style={{position: 'fixed', top: '17%', bottom: '17%', right: '22%', left:'22%', backgroundColor: 'rgb(245, 245, 245)', width: '55%', height: '65%', border: '2px solid black' }} >    
                            <p style={{fontSize: 30, textAlign: 'center'}}>Article ajouté avec succes au panier!</p>
                            <div className='panierDiv'>
                                <div className='' style={{width: '50%'}} >
                                    <img src={require(`../../img/${this.props.data.img}`)} className="reactAj1" id="imgChange1" style={{width: '30%', height: '60%', border: '2px solid black'}}   />
                                    <p>{this.props.data.name}</p>
                                    <p>{this.props.data.price}$</p>
                                </div>
                                <div className='' style={{width: '50%'}} >
                                    <div onClick={this.props.DisplayPanierPage} className='btn'>
                          
                                       <Link to='/panier'>
                                        <div >Voir mon panier</div>
                                       </Link>
                              
                                    </div>
                               
                                    <hr/>
                                    <div onClick={this.props.Ntazi}>
                                        <button className='' onClick={this.hundleSubmit} >Continuez mes achats</button>
                                    </div>
                                </div>
                            </div>
                        </div>
            } else {

               return null
            }
    }
}

export default Panier 
