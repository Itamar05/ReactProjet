 import React,  { Component } from 'react'
 import 'bootstrap/dist/css/bootstrap.min.css';
 import './SingleItem.css'
 import Panier from '../Panier/Panier.js'
 import PanierPage from '../PanierPage/PanierPage.js'
import { Link } from 'react-router-dom';
//  import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//  import ListItem from '../ListItem/ListItem';

 class SingleItem extends Component {

    constructor(props){
        super(props);

        this.state = {
            click: false,
            clickPanier: false,
            itemPanier:[]
        }
    }

        // DisplayPanier = () =>  {
        //     console.log(this.props.data, 'data');
            
        // this.setState({click: true})
        // console.log('single item' , this.props.data);
        //     }

        
        DisplayPanierPage = () =>  {
                this.setState({clickPanier: true}) 
                console.log('single item' , this.props.data);
                this.props.resultPanier(this.props.data)
               
            }

    render() {
       
       
            return <div className="container">
            <div className="spGen">
                <div className="singleProductPage ">
                            {/* <img src={require(`../img/${data.img}`)} className="singleProductCss"  id="imgDefault" />  */}
                    <div className="reactAnglePage" >
                            <img src={require(`../../img/${this.props.data.img}`)} className="reactAj1" id="imgChange1"   />
                            <img src={require(`../../img/${this.props.data.img3}`)} className="reactAj2" id="imgChange2"  />
                            <img src={require(`../../img/${this.props.data.img2}`)} className="reactAj3" id="imgChange3"  />
                            <img src={require(`../../img/${this.props.data.img1}`)}  className="reactAj4" id="imgChange4" />
                    </div>
                </div>
        
                <div className="texte">
                    Chaussure pour Homme 140$ <br/>
                    <span>{this.props.data.name}</span>
        
                    <p> Selectionner la taille </p>
                    
                    <form method="post" name="form1">
                        <select name="taille">
                            <option value="40" className="">40</option>
                            <option value="41" className="">41</option>
                            <option value="42" className="">42</option>
                            <option value="43" className="">43</option>
                            <option value="44" className="">44</option>
                            <option value="45" className="">45</option>
                        </select>
                    </form>
                <Link to='/panier'>
                    <button className="btn btn-success" onClick={this.DisplayPanierPage}>Ajouter au panier</button> <br/>
                </Link>
                    {/* { this.state.click ? 

                        <Panier 
                            data={this.props.data}
                            Ntazi={this.Ntazi} 
                            DisplayPanierPage={this.DisplayPanierPage}
                        />  

                    :  null}
         */}
                    <p> La Nike React Element 55 s'inspire des chaussures de running classiques, telles que la Nike
                        Internationalist, et intègre la technologie Nike React.
                    </p><br/>
        
                    <ul>
                        <li>Couleur affichée : Argent métallique/Platine pur/Gris foncé/Noir</li>
                        <li>Article : CI3835-001</li>
                    </ul>
                    <div className="btn">
                        <div id="lrg" >Livraison et retour gratuits</div>
                    </div>
                    <div id="texteLivraison">
                        Livraison standard gratuite avec votre compte NikePlus. <br/>
                        <br/>
                        <ul>
                            <li>
                                 Le délai des livraisons standard est de 2 à 4 jours ; nous effectuons des livraisons 5 jours sur 7.
                            </li>
                            <li>
                                Pour une commande passée avant 13 heures avec option de livraison le lendemain, du lundi au jeudi.
                            </li>
                            <li>
                                Possibilité de retirer les commandes en magasin Nike et dans une centaine de points de retrait
                                 faciles d'accès.
                            </li>
                            <li>
                                Vous pouvez retourner votre commande gratuitement, quelle que soit la raison, dans un délai de 60
                                                    jours.
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
        </div>

        } 
}

 export default SingleItem ;
