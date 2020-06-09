import React, { Component } from 'react';
import './ListItem.css';
import 'tachyons';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {  Redirect } from 'react-router-dom';
import axios from 'axios'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import Carousel from '../Includes/Carousel'


class ListItem extends Component {

	constructor(props){
		super(props)

		this.state = {
			items: [],
			itemPanier: [],
			data:'',
			redirect: false
		};
	}


	componentDidMount() {
		const url = 'http://localhost/projetV2/server/api/hommes.php';
		fetch(url).then((res) => res.json()).then((data) => {
			this.setState({ items: data });
		});
	}

	getOneShoe = async (id) => {
	await	axios.get(`http://localhost/projetV2/server/api/singleitem.php?id=${id}`)
			.then((res) => {
				this.props.GetdataSingleItem(res.data[0])
				this.setState({redirect: true})
			})
	};

	render() {
		
		if (this.state.redirect) {
			return <Redirect to="/singleItem" />
		  }

		let item = this.state.items.map((item) => {
			return (
						<div className="qzd1 " key={item.id} onClick={() => this.getOneShoe(item.id)}>
									<div className="imgItem">
									
										<img src={require(`../../img/${item.img}`)} className="artH1" alt={item.img} style={{cursor: 'pointer'}}/>
									
									</div>
									<div className="textItem">
										{item.name}
										<nav>{item.price}$</nav>
									</div>	
						</div>
			);
		});

		return <div>
					<Carousel />

					<div style={{display: 'flex'}}>
						{item}
					</div>;
			  </div>
			
			
	}
}

export default ListItem
