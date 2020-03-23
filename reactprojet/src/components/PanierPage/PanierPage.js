import React, { Component } from 'react'
import ListItem from '../ListItem/ListItem'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


 class PanierPage extends Component {
    constructor(props){
        super(props)
        this.state= {
            click: false
        }
    }
    
    panier = (array) => {
        this.setState({
            panier: array
        })
    }
    

    retourAchats = () => {
        this.setState({click: true})
    }

    render() {

        // console.log(this.props.itemPanier, 'props');

        let item = this.props.itemPanier.map((item) => {
			return (
				<div className="" key={item.id} style={{width: '60%', height:'15%', border: '1px solid black', display:'flex', direction:'row', padding:'1%'}}>
						<img src={require(`../../img/${item.img}`)} className="" alt={item.img} style={{width: '25%', height:'25%'}} />
                            <nav style={{ margin:'3%'}} >
                                {item.name}
                                <br/>
                                {item.price}$
                                <br/>
                                Taille: 
                                <br/>
                                Couleur:
                            </nav>  
				</div>
			);
        });
        
            if (this.state.click) {
                return <ListItem />
            } else {

        return <div className='container'>

                <hr/>
                <h1>MON PANIER</h1>
                {item}
                <button className="btn btn-success" onClick={this.retourAchats}>Retourner a mes achats</button> <br/>

                </div>
            }
           
        
    }
}

export default PanierPage ;
