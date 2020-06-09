import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import './Details.css'

class Details extends Component {

	constructor(props){
		super(props)

		this.state = {
			shippingData: ''
		};
	}
	
	componentDidMount() {
		axios.get(`https://react-1d3cf.firebaseio.com/commandes/${this.props.idAddress}.json`).then((data) => {
			this.setState({ shippingData: data.data });
		});
	}    


	render() {

		 const itemPanier = this.props.itemPanier;
		 console.log(itemPanier);
		 
		// const itemPanier = [{ 	category: "2",
		// 						description: "a",
		// 						id: "1",
		// 						img: "react2.jpg",
		// 						img1: "react2angle1.jpg",
		// 						img2: "react2angle2.jpg",
		// 						img3: "react2angle3.jpg",
		// 						name: "Nike React Element 55 Premium",
		// 						price: "150"   }];

		// console.log(itemPanier, 'ItemPanier');
		
        let total = 0;
        let quantite = 0 ;
		let y = [] ;
		let item ;
		
	if (itemPanier.length != 0) {
			
        const totalPrice = itemPanier.map(item => {  
            y.push(item.id)
         return total += parseInt(item.price);
        });
	
        const filteredPanier = itemPanier.reduce((acc, current) => {
            const x = acc.find(item => item.id === current.id);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);

         item = filteredPanier.map((item) => {
			return (
				<div className="" key={item.id} style={{width: '603px', height:'200px', borderBottom: '1px solid grey', display:'flex', direction:'row', padding:'1%'}}>
					<img src={require(`../../img/${item.img}`)} className="" alt={item.img} style={{width: '25%', height:'100%'}} />
                        <nav style={{ margin:'3%'}} >
                            {item.name}
                            <br/>
                            {item.price}$
                            <br/>
                            Taille: 
                            <br/>
                            Quantite: {quantite}
                        </nav>  
				</div>
			);
        });
		}
			return (
		<div className='container' stle={{display: 'flex', flexDirection: 'column'}}>
			<h2 style={{textAlign: 'center', marginBottom: '50px', marginTop: '50px'}}>Recapitulatif et paiement </h2>

			<div className=' df'>

				<div className='paiements'>
					
					<div style={{display: 'flex', flexDirection:'column'}}>
						{item}
					</div>
				</div>
				<div className='synthese'>
					<div className='FFW'>
						
						<div className='shipp'>
							<p>Addresse: {this.state.shippingData.address}</p>
							<p> City: {this.state.shippingData.city}</p>
							<p> States: {this.state.shippingData.states} </p>
							<p> Zip: {this.state.shippingData.zip}</p>	
							<p>Nom : {this.state.shippingData.nom}  {this.state.shippingData.prenom} </p>
						</div>
					</div>
				</div>
			</div>
			<hr/>
			<div>
				<h2 style={{textAlign: 'center', marginBottom: '55px', marginTop: '50px'}}>Moyen de paiements</h2>
				<div style={{display: 'flex', flexDirection:'column'}} >
					<div className='mdpp'> Stripe</div>
					<div className='mdpp'> Paypal</div>
				</div>
			</div>
			<Link to='payment'><div className='btn'></div></Link>
			
		</div>	
			)
	}
}

export default Details


