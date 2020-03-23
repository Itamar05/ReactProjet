import React, { Component } from 'react';
import './ListItem.css';
import 'tachyons';
import SingleItem from '../SingleItem/SingleItem.js';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {  Link } from 'react-router-dom';


class ListItem extends Component {

	constructor(props){
		super(props)

		this.state = {
					items: [],
					itemPanier: [],
					data:'',
					click: false
				};
	}


	componentDidMount() {
		const url = 'http://localhost/projetV2/server/api/hommes.php';
		fetch(url).then((res) => res.json()).then((data) => {
			this.setState({ items: data });
			
		});
	}


	getOneShoe = async (id) => {
		
		await fetch(`http://localhost/projetV2/server/api/singleitem.php?id=${id}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				// console.log(data);
			   this.props.GetdataSingleItem(data[0])
			})
	};



	// resultPanier =  (item) => {

	// console.log(item, ' item ');
	
	// 	 this.setState({
	// 	            itemPanier: [...this.state.itemPanier, item], 
	// 				})
	
	// 			this.props.getPanier(this.state.itemPanier);
	// 			console.log(this.state.itemPanier, 'itempanier');				
	// }


	render() {
	
		let item = this.state.items.map((item) => {
			return (
						<div className="qzd1 fl w-third" key={item.id} onClick={() => this.getOneShoe(item.id)}>
							<Link to='/SingleItem'>
									<div className="imgItem">
									
										<img src={require(`../../img/${item.img}`)} className="artH1" alt={item.img} style={{cursor: 'pointer'}}/>
									
									</div>
									<div className="textItem">
										{item.name}
										<nav>{item.price}</nav>
									</div>
							</Link>
						</div>
					
			);
		});

			return <div> {item} </div>;
		
	}
}

export default ListItem
