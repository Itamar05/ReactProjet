import React, { Component } from 'react'
import './Accueil.css'
import { Link } from 'react-router-dom'
import Carousel from '../Includes/Carousel.js'

export class Accueil extends Component {
    render() {
        return (
            
        <div>
            {/* <Carousel /> */}
            <div className='row pp'>
                <div className='prpr'>
                    <Link to='./ListItem' className='linkL'>
                <div className='col-sm ppp' style={{textAlign:'center', top: 200, left: 75, fontSize: '20px'}}>
                    Shop men
                </div>
                </Link>  
                <Link to='./ListItem' className='linkL'>
                <div  className='col-sm ppp'style={{textAlign:'center', top: 200, right: 75, fontSize: '20px'}}>
                    Shop women  
                </div>
                </Link>
            </div>
                <img src={require(`../../img/CapturePP.PNG`)} className="" alt="" />
            </div>
            <div style={{width: '100%', textAlign: 'center', marginTop: '2%', marginBottom: '2%'}}>
               <p style={{fontSize: '20px'}}><strong>Shop the latest sneakers</strong></p> 
            </div>
            <Carousel/>
            <div className='container' style={{display: 'flex', flexDirection: 'column'}}>
                {/* <div style={{width: '100%', marginTop: '2%', marginBottom: '2%'}}>
                    <p style={{fontSize: '20px'}}><strong>Popular brands</strong></p> 
                </div>  */}
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '50px'}}>
                <img src={require('../../img/Capturess.PNG')} className="" alt="" />
                </div>
            </div>

        </div>
        )
    }
}

export default Accueil
