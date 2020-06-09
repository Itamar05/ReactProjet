import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './shipping.css'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import fire from '../../config/Fire';
import axios from 'axios' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faPlus, faWindowClose, faCheckSquare, faTrashAlt, faStoreAlt, faShippingFast, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

class Shipping extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.insert = this.insert.bind(this);


        this.state = {
            address: '',
            city: '' ,
            states: '' ,
            zip :'',
            next: false,
            p: '',
            dataShipping: [],
            dataship: [],
            suivant: false,
            addShipping: false
        } ;
    }

    removeData = async (id) => {
      const shippingRef = fire.database().ref(`commandes/${id}`);    
      await shippingRef.remove()
      let arrr = this.state.dataship ;
      // console.log(arrr);
      
      const newArrr = [] ;
      for (let i = 0; i < arrr.length; i++) {
        if (arrr[i].key != id) {
           newArrr.push(arrr[i])
        }
        await this.setState({dataship: newArrr})
        // await console.log(newArrr);
      }
    }

    insert(e){
        e.preventDefault();
        (this.insertDataa())
      }
    
      componentDidMount() {
        this.getAdress()
      }

      getAdress = async () => {

        await axios.get('https://react-1d3cf.firebaseio.com/commandes.json').then( async (res) => {console.log(res, 'res');
         await this.setState({dataShipping: [res.data], request: 'address'})} )
            .then( async () => {
            var data = this.state.dataShipping ;
            if (data[0] != null) {
            const keys = Object.entries(data[0])
            // await console.log(keys, 'az');
            const arr = [] ;
              for (let i = 0; i < keys.length; i++) {
                 if (keys[i][1].email == `${this.props.email}`) {
                   
                   arr.push(keys[i][1])
                        this.setState({  dataship: arr })
                        // console.log(keys[i][1]);
                    }   
              }  
          }     
              // console.log(this.state.dataShipping);     
          });
      }
    
    addAddress = () => {
      this.setState({addShipping: true})
    }

    hiddenForm = async () => {
     await console.log(this.state.addShipping, '1');
     await this.setState({addShipping: false})
      
    }

    insertDataa = async () => {
      await this.setState({idFirebase: this.props.idFirebase})
      
        const usersRef = fire.database().ref('commandes'); 
        const commande = {
          address: this.state.address,
          city: this.state.city,
          states: this.state.states,
          zip: this.state.zip,
          email: this.props.email,
          nom: this.state.nom,
          prenom: this.state.prenom,
          key: ''
        }

        await usersRef.push(commande).then(async(snap) => { 
          const key = snap.key
        await console.log(key);
        await this.props.getIdAddress(key)
        await this.setState({key: key})
        
        });
        
        const key = this.state.key ;
        
        const usersIdRef = fire.database().ref(`commandes/${this.state.key}/key`)
        await usersIdRef.set(key)

        this.setState({
          address: '',
          city: '',
          state:'',
          zip: '',
          next: true,
          nom: '',
          prenom: '',
          key:'',
          addShipping: false
        });

        this.getAdress()
      }

    handleChange(e) {
       this.setState({ [e.target.name]: e.target.value });
    }

    render() {

    //   if (this.state.next && this.state.suivant) {
    //     // this.setState({next: false, suivant: false})
    //     return <Redirect to='/Details' />
    // }

    let rendu = '' ;
    const D = this.state.dataship  ; 

      if (D.length > 0) {
     const azert = D.map((data) => {
        
          return (
            <div className='a' onClick={async () =>  {await this.insert ;await this.props.getIdAddress(data.key) ; await this.setState({suivant: true})}  }>
               {/* <div className='iconCheck' style={{visibility: 'hidden'}}><FontAwesomeIcon icon={faCheckSquare} /></div> */}
               <nav >
                  <p><strong>{data.nom} {data.prenom}</strong> </p>
                  <p className='p'>Address : <span> </span> {data.address}</p>                             
                  <p className='p'>States : <span> </span>{data.states}</p>                                                            
                  <p className='p'>City : <span> </span>  {data.city}</p>                                                          
                  <p className='p'>Zip : <span> </span> {data.zip}</p> <br/>
                </nav>
                <div>
                  {/* <input style={{marginLeft: '0%' }} onClick={async () =>  {await this.insert ;await this.props.getIdAddress(data.key) ; await this.setState({suivant: true})}} className="form-check-input position-static" type="checkbox" id="blankCheckbox"/>
                  <label class="form-check-label" for="inlineCheckbox1">Selectionner</label>  */}
                  <nav className='supprimer' onClick={ async () => {await this.removeData(data.key)}}>Supprimer <FontAwesomeIcon icon={faTrashAlt} /></nav>
                </div>
            </div>
              ) 
            } 
         ) 

         rendu =<div style={{display: 'flex', flexWrap: 'wrap'}}>{azert} <div onClick={this.addAddress} className='ab' >Nouvelle addresse <br/><br/><FontAwesomeIcon icon={faPlus} className='icon'  />
                               { this.state.addShipping ? 
                      <div className='formPr'>
                        <div className='formAddress'>
                          <div onClick={this.hiddenForm} className='iconClose'>
                            <FontAwesomeIcon icon={faWindowClose} style={{fontSize: '20px'}} />
                          </div>
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
    <div className="form-group col-md-2">
      <label htmlFor="inputi">First name</label>
      <input value={this.state.nom} onChange={this.handleChange} name='nom' type="text" className="form-control" id="inputZp" />
    </div>
    <div className="form-group col-md-2">
      <label htmlFor="inputZi">Name</label>
      <input value={this.state.prenom} onChange={this.handleChange} name='prenom' type="text" className="form-control" id="inputZi" />
    </div>
  </div>

<button type="submit" className="btn btn-primary" onClick={this.insert}>Suivant</button>
</form> ;
                        </div>  </div>
                        : null
                      } </div>
        
         </div>
         {/* <div className='btn btn-primary ajt' onClick={() => this.setState({next: true})}>Recapituulatif de la commande</div></div>  */}

        } else { 
          rendu = <div>
                    <div onClick={this.addAddress} className='ab' >Nouvelle addresse <br/><br/><FontAwesomeIcon icon={faPlus} className='icon'  /> 
                      { this.state.addShipping ? 
                      <div className='formPr'>
                        <div className='formAddress'>
                          <div onClick={this.hiddenForm}  className='iconClose' >
                          <FontAwesomeIcon icon={faWindowClose} style={{fontSize: '20px'}}/>
                          </div>
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
    <div className="form-group col-md-2">
      <label htmlFor="inputi">First name</label>
      <input value={this.state.nom} onChange={this.handleChange} name='nom' type="text" className="form-control" id="inputZp" />
    </div>
    <div className="form-group col-md-2">
      <label htmlFor="inputZi">Name</label>
      <input value={this.state.prenom} onChange={this.handleChange} name='prenom' type="text" className="form-control" id="inputZi" />
    </div>
  </div>

<button type="submit" className="btn btn-primary" onClick={this.insert}>Suivant</button>
</form> ;
                        </div>  </div>
                        : null
                      }
                    </div>
                  </div>
      }

        return (

        <div className='formShipping' > 
        <h2><strong>Addresse de livraison</strong></h2>
        <p>Saisissez votre adresse de livraison pour connaître les options de livraison et les délais. Les restrictions de livraison appliquées peuvent nous contraindre à refuser votre commande.</p>
          {rendu}
        <h2><strong>Obtenir votre commande</strong> </h2>
        <div>
          <div className='boxShip'>
            {/* <input type='radio' id='azaz' ></input> */}
            {/* <label htmlFor="azaz" id='labell' > */}
           <strong> D'ici Samedi 6 juin </strong><br/>
           <FontAwesomeIcon icon={faShippingFast} /> Livraison standard 8:00 - 18:00
           {/* </label> */}
          </div>
          <div className='boxShip'>
           <strong> D'ici Vendredi 5 juin </strong><br/>
           <FontAwesomeIcon icon={faStoreAlt} /> Reservez en ligne, puis payez et retirer votre commande dans un magasin StockX 
          </div>
        </div>
        { this.state.suivant ? 
          <Link to='/Details'>
            <div className='btn btn-primary ajtt'>Recapitulatif et paiements  <FontAwesomeIcon icon={faLongArrowAltRight} /> </div>
          </Link>
          : <div className='btn btn-primary ajtt'>Recapitulatif et paiements  <FontAwesomeIcon icon={faLongArrowAltRight} /></div> }
        </div>

    )}
}

export default Shipping 


