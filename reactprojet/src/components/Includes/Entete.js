import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Link } from "react-router-dom";
import './Entete' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import Chip from '@material-ui/core/Chip';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

  class Entete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      itemName:'',
      login: false
    };


    this.onTagsChange = this.onTagsChange.bind(this);
  }

  onTagsChange = (event, values) => {
    this.setState({ tags: values });
  }

  componentDidMount() {
      const url = 'http://localhost/projetV2/server/api/hommes.php';
      fetch(url).then((res) => res.json()).then((data) => {
      this.setState({ itemName: data}) ;
    })
}  


  render() {

    const itemName = this.state.itemName
    // #474A37
        return (
            <div style={{background: 'rgb(245, 245, 245)'}} >
                <div className="container" >
                    <div className="row">
                                    <div className="col-sm-2">
                                        <img src={require(`../../img/stockx.png`)} className="logo" alt="stockX" />
                                    </div>
                            
                                    <div className="col-sm-5">
                                        <nav className="nav-links nav d-flex justify-content-center ">
                                                
                                                <Link to='/Accueil'  ><span className="nav-link black"  style={{marginTop: 25}} >Accueil   </span> </Link>
                                                <Link to='/ListItem' ><span className="nav-link black"  style={{marginTop: 25}} >Homme     </span> </Link>
                                                <Link to='/ListItem' ><span className="nav-link black"  style={{marginTop: 25}} >Femme     </span> </Link>
                                                <Link to='/Reduction'><span className="nav-link black"  style={{marginTop: 25}} >Reductions</span> </Link>
                                                
                                        </nav>
                                       
                                    </div>
                                    <div className="col-sm-3  " style={{marginTop:"1.8%"}}>
                                                    <Autocomplete
                                                    id='free-solo-2-demo'
                                                     freeSolo
                                                    options={itemName}
                                                    getOptionLabel={option => option.name}
                                                    onChange={this.onTagsChange}
                                                    renderInput={params => (
                                             <TextField
                                                {...params}
                                                variant="standard" label="Search" placeholder="Search" margin="normal" variant="outlined" fullWidth
                                                        />
                                                    )}
                                                    />
                                                    
                            
                                    </div>
                          <div style={{position: 'absolute', top:' 6%' , right:'5%', display: 'flex', justifyContent: 'row'}}>
                                  <div style={{marginRight:'15%'}}>                         
                                    <Link to='/panier'   ><FontAwesomeIcon icon={faShoppingCart}  /></Link> 
                                  </div>      
                                  <div style={{width: '140px'}}>
                                    {
                                  this.props.loginn ? <Link to='/Account'><FontAwesomeIcon icon={faUser}/>Mon compte</Link>
                                  :  <Link to='/Login'><FontAwesomeIcon icon={faUser} onClick={this.displayLogin}/>Login</Link>
                                   }
                                    </div>          
                          </div>
                                    
                </div>
            </div>
        </div>   
    )  
  }
} ;

export default Entete
