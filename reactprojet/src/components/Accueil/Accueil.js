import React, { Component } from 'react'
import './Accueil'
import { Link } from 'react-router-dom'

export class Accueil extends Component {
    render() {
        return (
            <div className='row' style={{marginTop: '8%',width: 1263.33}}>
                <div className='col-sm' style={{width: '20%', textAlign:'center'}}>
                    <Link to='./ListItem'>
                    Hommes
                    </Link>
                </div>
                <div  className='col-sm'style={{width: '20%', textAlign:'center'}}>
                    <Link to='./ListItem'>
                    Femmes
                    </Link>
                </div>
            </div>
        )
    }
}

export default Accueil
