import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import fire from '../../config/Fire';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';


class Membre extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: 'vlbzoo123@gmail.com',
      password: 'Azertyu',
      login: false,
      data: ''
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
        // console.log(keys, 'az');
        
          for (let i = 0; i < keys.length; i++) {
           
             if (keys[i][1].email == `${this.state.email}`) {
                    this.setState({ data: keys[i][1]} )
                    this.props.getIdFirebase(keys[i][1].key.key)
                    // this.props.getName(keys[i][1].firstname)
                    console.log(keys[i][1].firstname);
                    console.log(keys[i][1].key.key);
                }   
          }           
      });

    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
      })
    this.setState({login: true})
    var user = fire.auth().currentUser;
      console.log(user, 'USER');
  }

  signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{console.log(u)}).then(this.insertData).then(this.login)
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
      commande: '',
      adresse: '',
      id: this.state.id,
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
  }


  render() {

    if (this.state.login) {
        this.props.getLogin(this.state.login, this.state.email)
        return <Redirect to='/ShippingForm' />
    }

    if (this.props.login) {
      return <Redirect to='ShippingForm' />
    }

    return (
<div>

    <h1 style={{textAlign: 'center', marginTop: '3%', marginBottom: '4%'}} >Vous devez etre membre stockX pour continuez </h1>

<div className='Principal container' style={{zIndex: 5, opacity: 1, display: 'flex', marginRight: '10%', marginTop: '3%'}}>
  <div>
    
      <p className='title'>
     <strong className='sc'>SE CONNECTER</strong> 
      </p>
      <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control inp"  placeholder="Adresse e-mail" style={{marginBottom: 20}} />
      <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control inp"  placeholder="Password" />

      <button type='submit' className='btn' onClick={(e)=>{e.preventDefault() ;this.login(); }}>SE CONNECTER</button>

  </div>

  <div style={{marginLeft: 60}}>
    <p><strong className='sc'>Devenir membre stockX Plus.</strong></p>
    <div>
    
    <strong className='st'>TON NOM</strong>
    <input value={this.state.name} onChange={this.handleChange} type="text" name="name" className="form-control inp"  placeholder="Name" style={{marginBottom: 20}} />
    <input value={this.state.firstName} onChange={this.handleChange} type="text" name="firstName" className="form-control inp"  placeholder="FirstName" />
    <strong className='st'>DETAILS DE CONNEXION</strong>
    <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control inp"  placeholder="Adresse e-mail" style={{marginBottom: 20}} />
    <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control inp"  placeholder="Password" />
    <button type='submit' className='btn' onClick={this.signup}>S'inscrire</button>

</div>

  {/* <button type='submit' className='btn' style={{width: 300}}><Link to='/Register'>REJOINDRE LE CLUB</Link></button> */}
  </div>

</div>
</div>
    );
  }
}

export default Membre;


