import React from "react";
import PlaylistFeatures from './PlaylistFeatures.js';

class GetPlaylist extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            images : [],
            names: [],
            userID: ""

            
        }
    }

    componentDidMount(){
        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        };
        //${this.state.userID}
        //this.setState({userID: localStorage.getItem("UserID")})
        const user = localStorage.getItem("UserID")
        fetch(`https://api.spotify.com/v1/users/${user}/playlists`, requestOptions)
            .then((response) => response.json())
            .then((data) =>{

                console.log(user)
                console.log(this.state.userID)
                console.log(data)
            })

        
        
        console.log(this.props.token)
        

    }

    render(){
        return(<h1>hello world</h1>)
    }


}
export default GetPlaylist;