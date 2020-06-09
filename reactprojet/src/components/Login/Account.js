import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import fire from '../../config/Fire';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css' ;
import axios from 'axios' ;
import './Account.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faPlus, faWindowClose, faCheckSquare, faTrashAlt, faStoreAlt, faShippingFast, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons' ;


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.insert = this.insert.bind(this);

    this.state = {
    commandes: '',
    dataShipping: [],
    commande: '',
    request: '',
    address: '',
    city : '',
    zip: '',
    states: '',
    AllAdress: '',
    key: '',
    name: '',
    firstName: '',
    email:'',
    password: '',
    login: true,
    dataship: []
    };
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

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // getCommandes= async () => {

  //   await axios.get('https://react-1d3cf.firebaseio.com/commandes.json').then( async (res) => {console.log(res, 'res');
  //    await this.setState({commande: [res.data], request: 'address'})} )
  //       .then( async () => {
  //       var data = this.state.data ;
  //       const keys = Object.entries(data[0])
  //       console.log(keys, 'az');
        
  //         for (let i = 0; i < keys.length; i++) {
  //            if (keys[i][1].email == `${this.props.email}`) {
  //                   this.setState({ data: keys[i][1]} )
  //                   console.log(keys[i][1]);
  //                   break ;
  //               }   
  //         }           
  //     });
  // }

  getPurchase = () => {
    this.setState({ request: 'purchase'})
  }

  infoPerso = async () => {
    await axios.get('https://react-1d3cf.firebaseio.com/users.json').then( async (res) => {console.log(res, 'res');
    await this.setState({dataUsers: [res.data], request: 'infoPerso'})} )
       .then( async () => {
       var data = this.state.dataUsers ;
       const keys = Object.entries(data[0])
      //  await console.log(keys, 'az');
       const arr = [] ;
         for (let i = 0; i < keys.length; i++) {
            if (keys[i][1].email == `${this.props.email}`) {
              
              arr.push(keys[i][1])
                   this.setState({  dataUsers: arr, firstName:keys[i][1].firstname, name: keys[i][1].name, email: keys[i][1].email, password: keys[i][1].password  })
                  //  console.log(keys[i][1]);
               }   
         }           
     });
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

  resetPass = () => {
    var auth = fire.auth() ;
    var emailAddress = this.props.email ;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
  }


  insertDataa = async () => {

      const usersRef = fire.database().ref('commandes'); 
      await this.setState({email: this.props.email})

      const commande = {
        address: this.state.address,
        city: this.state.city,
        states: this.state.states,
        zip: this.state.zip,
        email: this.state.email,
        nom: this.state.nom,
        prenom: this.state.prenom,
        key: ''
      }

      await usersRef.push(commande).then(async(snap) => { 
        const key = snap.key
      // await console.log(key);
      await this.setState({key: key})
      });
      
      const key = this.state.key ;
      await this.props.getIdAddress(key)

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
        key:''
      });
    }

    deco = () => {
      this.props.Deconnexion() ;
      this.setState({login: false})
    }

    async insert(e){
      await e.preventDefault();
      await this.insertDataa() ;
      await this.getAdress() ;
    }


  render() {

    if (this.state.login == false) {
      return <Redirect to='/Accueil' />
  }

  
    let rendu = '' ;
    const D = this.state.dataship  ; 
    console.log(D, 'DDDDDDDDDDDDDDD');
       
    
    if (this.state.request == 'address' ) {

      if (D.length > 0) {
        const azert = D.map((data) => {
           
             return (
               <div className='an' onClick={async () =>  {await this.insert ;await this.props.getIdAddress(data.key) ; await this.setState({suivant: true})}  }>
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
   
            rendu =<div> <h2>Mes addresses</h2><div style={{display: 'flex', flexWrap: 'wrap'}}>{azert} <div onClick={this.addAddress} className='abn' >Nouvelle addresse <br/><br/><FontAwesomeIcon icon={faPlus} className='icon'  />
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
            </div>
            {/* <div className='btn btn-primary ajt' onClick={() => this.setState({next: true})}>Recapituulatif de la commande</div></div>  */}
   
           } else { 
             rendu = <div>
                       <div onClick={this.addAddress} className='abn' >Nouvelle addresse <br/><br/><FontAwesomeIcon icon={faPlus} className='icon'  /> 
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
         }}else if(this.state.request == 'purchase') {
      if (this.props.purchase) {
         rendu = <div >Commande</div> ; 
      } else  {
         rendu = <h1>Aucune commande pour le moments</h1> ;
      }
    } else if(this.state.request == 'infoPerso') {

      rendu = <div>
         <div>
    
    <p className='title'> <strong className='sc'>Confidentialité</strong> </p>
    <strong className='st'>TON NOM</strong>
    <input value={this.state.name} onChange={this.handleChange} type="text" name="name" className="form-control inp"  placeholder="Name" style={{marginBottom: 20}} />
    <input value={this.state.firstName} onChange={this.handleChange} type="text" name="firstName" className="form-control inp"  placeholder="FirstName" />
    <strong className='st'>DETAILS DE CONNEXION</strong>
    <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control inp"  placeholder="Adresse e-mail" style={{marginBottom: 20}} />
    <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control inp"  placeholder="Password" />
    <button type='submit' className='btn' onClick={this.resetPass} >Reinitialiser pass</button>

</div>
      </div>
     } else if(this.state.request == 'addAddress') {

         rendu = 
        <form style={{marginRight: '5%'}}>
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
      
      <button type="submit" className="btn btn-primary" onClick={this.insert}>Ajouter +</button>
      </form> ;
    } else {
    rendu = <h2>Bienvenue {this.props.name}</h2> ;
    }

    return (

        <div className='container'>

            <div style={{display: 'flex', flexDirection: 'row', marginTop:'2%'}}>

                <div style={{width: '70%'}}>
                  <h2></h2>
                  {rendu}             
                </div>

                <div className='monCompteLi' style={{padding: '1%', display: 'flex', flexDirection: 'column'}}>

                    <p><strong>Mon compte</strong> </p> 
                    <div className='compteLi' onClick={this.infoPerso} >Informations personnelles</div>
                    <div className='compteLi' onClick={this.getAdress}>Addresses</div>
                    <div className='compteLi' onClick={this.getPurchase} >Historique des commandes</div>
                    <div className='compteLi'>Mes produits favoris</div>
                    <div className='compteLi' onClick={this.deco}>Se deconnecter</div>

                </div>

            </div>

        </div>
    )
  }
}

export default Login;

