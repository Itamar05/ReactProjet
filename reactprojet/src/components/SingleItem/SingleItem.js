 import React,  { Component } from 'react'
 import 'bootstrap/dist/css/bootstrap.min.css';
 import './SingleItem.css'
 import Panier from '../Panier/Panier.js'
 import PanierPage from '../PanierPage/PanierPage.js'
 import Carousel from '../Includes/Carousel'
import { Link, Redirect } from 'react-router-dom';

 class SingleItem extends Component {

    constructor(props){
        super(props);

        this.state = {
            click: false,
            redirect:'',
            opacity: '1',
            showLivraison: 'none',
            size: '',
            visibility: 'hidden'
        }
    }

        DisplayPanier = async () =>  {      
        let data =this.props.data  ; 
        data.size = this.state.size ;  
        await this.setState({click: true, opacity: '0,5', data: data, visibility:'hidden'})
        // await console.log(this.state.data, 'PROPS');
        await this.props.resultPanier(this.state.data)
        }
    
        DisplayPanierPage = () =>  {
                this.setState({redirect: true}) 
        }
        
        renderFalseClickpanier = () => {
            this.setState({click: false})
        }

       showLiv = () => {
            if (this.state.showLivraison == 'none') {
                 this.setState({showLivraison: 'block'})
            } else {
                this.setState({showLivraison: 'none'}) }
        }

        getSize = (size) => {
            this.setState({size: size})
            if (this.state.visibility == 'visible') {
                this.setState({visibility: 'hidden'})
            }
        }

    render() {
       
       if (this.state.redirect) {
       return  <Redirect to='/panier' />
        }
    
            return  <div>

            <div className="containerr"  >
            { this.state.click ? 
            
                        <Panier 
                            data={this.props.data}
                            DisplayPanierPage={this.DisplayPanierPage}
                            renderFalseClickpanier={this.renderFalseClickpanier}
                        />  
                    :  null}

                 {/* <Carousel /> */}
            <div className="spGen" style={{paddingLeft: '5%'}} >
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
                {/* <div style={{border: `solid 1px ${this.state.color}`}}> */}
                    <p style={{visibility: `${this.state.visibility}`, width:'450px', color: 'red'}}>Veuillez choisir une taille</p>
                    <div className='size'>
                        <div className='sizeDef' onClick={() => this.getSize(39)}>39</div>
                        <div className='sizeDef' onClick={() =>this.getSize(39.5)}>39.5</div>
                        <div className='sizeDef' onClick={() =>this.getSize(40)}>40</div>
                        <div className='sizeDef' onClick={() =>this.getSize(40.5)}>40.5</div>
                        <div className='sizeDef' onClick={() =>this.getSize(41)}>41</div>
                        <div className='sizeDef' onClick={() =>this.getSize(41.5)}>41.5</div>
                        <div className='sizeDef' onClick={() =>this.getSize(42)}>42</div>
                        <div className='sizeDef' onClick={() =>this.getSize(42.5)}>42.5</div>
                        <div className='sizeDef' onClick={() =>this.getSize(43)}>43</div>
                        <div className='sizeDef' onClick={() =>this.getSize(44)}>44</div>
                        <div className='sizeDef' onClick={() =>this.getSize(44.5)}>44.5</div>
                        <div className='sizeDef' onClick={() =>this.getSize(45)}>45</div>
                    </div>
                {/* </div> */}
                { this.state.size != '' ?                     
                
                    <button className="btn btn-success" onClick={this.DisplayPanier} style={{margin: 0}}>Ajouter au panier</button> 
                :   <div> <button className="btn btn-success" onClick={() => this.setState({visibility: 'visible'})} style={{margin: 0}}>Ajouter au panier</button> </div>
            }
                
                   
                    <p> La Nike React Element 55 s'inspire des chaussures de running classiques, telles que la Nike
                        Internationalist, et intègre la technologie Nike React.
                    </p><br/>
        
                    <ul>
                        <li>Couleur affichée : Argent métallique/Platine pur/Gris foncé/Noir</li>
                        <li>Article : CI3835-001</li>
                    </ul>
                    <div className="btn">
                        <div id="lrg" onClick={this.showLiv}>Livraison et retour gratuits</div>
                    </div>
                    <div id="texteLivraison" style={{display: this.state.showLivraison}} >
                        Livraison standard gratuite avec votre compte NikePlus. <br/>
                        <br/>
                            <ul>
                                <li>  Le délai des livraisons standard est de 2 à 4 jours ; nous effectuons des livraisons 5 jours sur 7.  </li>
                                <li>  Pour une commande passée avant 13 heures avec option de livraison le lendemain, du lundi au jeudi.</li>
                                <li> Possibilité de retirer les commandes en magasin Nike et dans une centaine de points de retrait faciles d'accès.</li>
                                <li>Vous pouvez retourner votre commande gratuitement, quelle que soit la raison, dans un délai de 60 jours.</li>
                            </ul>
                    </div>
                    </div>
                </div>
        </div>
    </div>
        } 
}

 export default SingleItem ;



