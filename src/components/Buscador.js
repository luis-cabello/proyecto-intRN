import React, {Component} from "react";

class Buscador extends Component{
    constructor(props){
        super(props);
        this.state = {
          value:"",
          movie: true
        }
    }

    evitarSubmit(event){
        event.preventDefault();
        this.props.buscar()
       
    
    };


    guardarValue(event){
        this.setState({
            value: event.target.value, 
        })
    };

render(){
    return(
        <form onSubmit={(event)=>this.evitarSubmit(event)}> 
        <input className="filtro" placeholder='Search' onChange={(event)=> this.guardarValue(event)} value={this.state.value}/>
        </form>
    )
}

}

export default Buscador; 
