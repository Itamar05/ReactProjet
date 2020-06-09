import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import fire from '../../config/Fire';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import Axios from 'axios';


class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: 'jnhbg@nhbg.com',
      password: 'Azerty',
      login: false,
      data: '',
      visibility: 'hidden',
      error: false
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login = async () => {
    await Axios.get('https://react-1d3cf.firebaseio.com/users.json').then(async(res)=> {console.log(res);await this.setState({data: [res.data]})
    })
      .then( async () => {
        var data = this.state.data ;
        const keys = Object.entries(data[0])
        console.log(keys, 'az');
        
          for (let i = 0; i < keys.length; i++) {
           
             if (keys[i][1].email == `${this.state.email}`) {
                    this.setState({ data: keys[i][1]} )
                    this.props.getIdFirebase(keys[i][1].key.key)
                    this.props.getName(keys[i][1].firstname)
                    // console.log(keys[i][1].firstname);
                    // console.log(keys[i][1].key.key);
                }   
          }           
      });

    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{this.setState({login: true})

    }).catch((error) => {
      this.setState({login: false, visibility: 'visible'})
        console.log(error);
      })
    var user = fire.auth().currentUser;
      console.log(user, 'USER');
  }


  render() {

    if (this.state.login ) {
        this.props.getLogin(this.state.login, this.state.email)
        this.setState({visibility: 'hidden'})
        return <Redirect to='/Accueil' />
    }

    return (

<div className='Principal container' style={{zIndex: 5, opacity: 1, display: 'flex', marginRight: '10%', marginTop: '3%'}}>
  <div>
    
      <p className='title'>
     <strong className='sc'>SE CONNECTER</strong> 
      </p>
      <p style={{visibility: `${this.state.visibility}`, color: 'red'}}>Email ou mot de passe incorrect</p>
      <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control inp"  placeholder="Adresse e-mail" style={{marginBottom: 20}} />
      <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control inp"  placeholder="Password" />

      <button type='submit' className='btn' onClick={(e)=>{e.preventDefault() ;this.login(); }}>SE CONNECTER</button>

  </div>

  <div style={{marginLeft: 60}}>
    <p><strong className='sc'>REJOINS LE CLUB. SOIS RÉCOMPENSÉ.</strong></p>
    <ul> <p style={{marginBottom: 5}}> Rejoins le programme de fidélité StockX Creators Club:</p> <br/>
      <li>Gagne un accès pour acheter des produits en édition limitée</li>
      <li>Profite des meilleures offres et promotions</li>
      <li>Passe au niveau supérieur pour obtenir un accès à des événements de sport, de yoga et de musique</li>
    </ul>
    <p>Rejoins le club maintenant et commence à gagner des points pour monter les niveaux et accéder aux récompenses. C'est le moment de découvrir le meilleur d'adidas.</p>

  <button type='submit' className='btn' style={{width: 300}}><Link to='/Register'>REJOINDRE LE CLUB</Link></button>
  </div>

</div>

    );
  }
}

export default Login;
