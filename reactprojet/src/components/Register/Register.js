import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import fire from '../../config/Fire';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css' 
import axios from 'axios'


class Register extends Component {
  constructor(props) {
    super(props);
    // this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      name: '',
      loginSuccess: false,
      id: 0,
      key: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  signup(e){
    e.preventDefault();

    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{console.log(u)}).then(this.insertData)
    .catch((error) => {
        console.log(error, 'ERROR');
      })
  }

  insertData = async () => {
    const usersRef = fire.database().ref('users');
    // const child = usersRef.child(`${this.state.id}`)

    const user = {
      name: this.state.name,
      firstname: this.state.firstName,
      email: this.state.email,
      password: this.state.password,
      key: ''
    }
    
   await usersRef.push(user).then(async(snap) => { 
      const key = snap.key
    await console.log(key);
    await this.setState({key: key})
    });

    await console.log(this.state.key);
    
    const key = {
          key: this.state.key
        }

    const usersIdRef = fire.database().ref(`users/${this.state.key}/key`)

   await usersIdRef.set(key)

  //  const usersRefCommandes = fire.database().ref('commandes');
  //  const child = usersRefCommandes.child(`${this.state.key}`)

  //  const commandes = {
  //   address: '',
  //   city: '',
  //   states: '',
  //   zip: '',
  //   email: this.props.email
  //  }

  //  child.push(commandes)

    await this.setState({
      name: '',
      firstName: '',
      email:'',
      password: '',
      loginSuccess: true,
      key: ''
    });


  }

  render() {

    if (this.state.loginSuccess) {
        return <Redirect to='/Accueil' />
    }

    
    
    return (

<div className='Principal container' style={{zIndex: 5, opacity: 1, display: 'flex', marginRight: '10%', marginTop: '3%'}}>
  <div>
    
      <p className='title'> <strong className='sc'>CONNEXION</strong> </p>
      <strong className='st'>TON NOM</strong>
      <input value={this.state.name} onChange={this.handleChange} type="text" name="name" className="form-control inp"  placeholder="Name" style={{marginBottom: 20}} />
      <input value={this.state.firstName} onChange={this.handleChange} type="text" name="firstName" className="form-control inp"  placeholder="FirstName" />
      <strong className='st'>DETAILS DE CONNEXION</strong>
      <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control inp"  placeholder="Adresse e-mail" style={{marginBottom: 20}} />
      <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control inp"  placeholder="Password" />
      <button type='submit' className='btn' onClick={this.signup}>SE CONNECTER</button>

  </div>
  <div style={{marginLeft: 60}}>
    <p><strong className='sc'>REJOINS LE CLUB. SOIS RÉCOMPENSÉ.</strong></p>
    <ul> <p style={{marginBottom: 5}}> Rejoins le programme de fidélité StockX Creators Club:</p> <br/>
      <li>Gagne un accès pour acheter des produits en édition limitée</li>
      <li>Profite des meilleures offres et promotions</li>
      <li>Passe au niveau supérieur pour obtenir un accès à des événements de sport, de yoga et de musique</li>
    </ul>
    <p>Rejoins le club maintenant et commence à gagner des points pour monter les niveaux et accéder aux récompenses. C'est le moment de découvrir le meilleur d'adidas.</p>
  </div>
</div>

    );
  }
}

export default Register;
// https://css-tricks.com/intro-firebase-react/
