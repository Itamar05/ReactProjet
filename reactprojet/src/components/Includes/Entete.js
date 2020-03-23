import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Link } from "react-router-dom";
import './Entete' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'


const Entete = () => {

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
                                        <Link to='/Panier'   ><FontAwesomeIcon icon={faShoppingCart} /></Link>

                                </nav>
                                
                            </div>
                            <div className="col-sm-5 cf ">
                                <nav className="navbar search-bar navbar-light cf">
                                        <form className="form-inline " style={{marginTop: 25}}>
                                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"  />
                                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit"  >Search</button>
                                        </form>
                                </nav>     
                            </div>
        </div>
    </div>
</div>         
)} ;

export default Entete
