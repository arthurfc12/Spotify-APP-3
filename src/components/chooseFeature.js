import React, { useState } from 'react';

class Choose extends React.Component {

    constructor(){
        super()
    }
    
    render(){
        return(
            <div>
                <button value="game" onClick = {(e) => this.props.handlePageChange(e, "game")}>Jogo</button>
                <button value="recommendation" onClick = {(e) => this.props.handlePageChange(e, "recommendation")}>Recomendacao</button>
            </div>
        );
    }
}
export default Choose;