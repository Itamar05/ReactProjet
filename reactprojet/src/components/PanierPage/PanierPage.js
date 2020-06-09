import React, { Component } from 'react' ;
import { Redirect } from "react-router-dom";
import './PanierPage.css'


 class PanierPage extends Component {
    constructor(props){
        super(props)
        this.state= {
            click: false,
            form : false
        }
    }
    
    retourAchats = () => {
        this.setState({click: true})
    }

    formShiping = () => {
        this.setState({form: true})
    }


    render() {

        const itemPanier = this.props.itemPanier;
        let total = 0;
        let quantite = 0 ;
        let y = [] ;
       
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

        let item = filteredPanier.map((item) => {
            
			return (
				<div className="" key={item.id} style={{width: '60%', height:'15%', borderBottom: '1px solid grey', display:'flex', direction:'row', padding:'1%'}}>
					<img src={require(`../../img/${item.img}`)} className="" alt={item.img} style={{width: '25%', height:'25%'}} />
                        <nav style={{ margin:'3%'}} >
                            {item.name}
                            <br/>
                            {item.price}$
                            <br/>
                            Taille: {item.size}
                            <br/>
                            Quantite: {quantite}
                        </nav>  
				</div>
			);
        });
        
            if (this.state.click) {
                return <Redirect to='/ListItem' />
            } 

            // if (this.state.form) {
            //     return <Redirect to='/ShippingForm' />
            // } 

            if (this.state.form) {
                return <Redirect to='/loginToFinal' />
            } 

        return <div className='container' >
                <hr/>
                <h1>MON PANIER</h1>
                    <div>
                        <div>
                            {item}
                        </div>
                        <div>
                          <p> <strong>Summary</strong> </p>
                          <p>Total :         {total}$</p> 
                          <div style={{display: 'flex'}}>
                            <button className="btn" onClick={this.retourAchats} style={{width: '28%'}}>Retourner a mes achats</button> <br/>
                            <button className="btn" onClick={this.formShiping} style={{width: '28%'}}>Finaliser ma commande</button> <br/>
                          </div>

                        </div>
                    </div>
                </div>
    }
}

export default PanierPage ;
