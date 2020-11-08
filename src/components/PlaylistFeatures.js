import React from "react";
import FetchRec from "./FetchRec.js"
import "./App.css";
import Slider from "@material-ui/core/Slider";
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


class PlaylistFeatures extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            trackIdList:"",
            tracksValues:"",
            enviar:false,
            maximo:false,
            s1:"",
            s2:"",
            s3:"",
            s4:"",
            s5:"",
            drop1:false,
            drop2:false,
            drop3:false,
            drop4:false,
            drop5:false,
        }
        console.log(props)
        var output = "";
        var output2 = "";
        var contador = 0;
        for (var i=0; i < Object.keys(this.props.tracksList).length ; ++i){
            output = output.concat(String(props.tracksList[i].tracksList.track.id));
            if(contador<=4){
                output2 = output2.concat(String(props.tracksList[i].tracksList.track.artists[0].id));
            }
            if(i!=(Object.keys(this.props.tracksList).length)-1){
                output = output.concat(",")
            }
            if(contador<=3){
                output2 = output2.concat(",")
            }
            contador = contador + 1
        }
        this.state.trackIdList = output;
        this.state.artistsIdList = output2;
        this.valuetextAcousticness = this.valuetextAcousticness.bind(this)
        this.valuetextDanceability = this.valuetextDanceability.bind(this)
        this.valuetextEnergy = this.valuetextEnergy.bind(this)
        this.valuetextLiveness = this.valuetextLiveness.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.select1 = this.select1.bind(this)
        this.select2 = this.select2.bind(this)
        this.select3 = this.select3.bind(this)
        this.select4 = this.select4.bind(this)
        this.select5 = this.select5.bind(this)
        this.handleClose1 = this.handleClose1.bind(this)
        this.handleOpen1 = this.handleOpen1.bind(this)
        this.handleClose2 = this.handleClose2.bind(this)
        this.handleOpen2 = this.handleOpen2.bind(this)
        this.handleClose3 = this.handleClose3.bind(this)
        this.handleOpen3 = this.handleOpen3.bind(this)
        this.handleClose4 = this.handleClose4.bind(this)
        this.handleOpen4 = this.handleOpen4.bind(this)
        this.handleClose5 = this.handleClose5.bind(this)
        this.handleOpen5 = this.handleOpen5.bind(this)
    }

    componentDidMount() {
        
        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }
        fetch('https://api.spotify.com/v1/audio-features?ids='+String(this.state.trackIdList), requestOptions)
            .then(response => response.json())
            .then(data => this.setState({tracksValues:data}))

        fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", requestOptions)
            .then(response => response.json())
            .then(data => this.setState({availableSeeds:data}))
    }

    valueMean(){
        console.log(this.state.tracksValues)
        var output = {
            acousticness:0,
            danceability:0,
            energy:0,
            liveness:0
        };
        for (var i=0; i < Object.keys(this.props.tracksList).length ; ++i){
            try{
                output.acousticness += this.state.tracksValues.audio_features[i].acousticness
                output.danceability += this.state.tracksValues.audio_features[i].danceability
                output.energy += this.state.tracksValues.audio_features[i].energy
                output.liveness += this.state.tracksValues.audio_features[i].liveness
            } catch { 
                console.log("Havia algum NULL")
            }
        }
        output.acousticness = output.acousticness/Object.keys(this.props.tracksList).length
        output.danceability = output.danceability/Object.keys(this.props.tracksList).length
        output.energy = output.energy/Object.keys(this.props.tracksList).length
        output.liveness = output.liveness/Object.keys(this.props.tracksList).length
        
        this.state.valueMean = output
    }

    valuetextAcousticness(value) {
        this.state.valueMean.acousticness = value
        return {value}
    }

    valuetextDanceability(value) {
        this.state.valueMean.danceability = value
        return {value}
    }
    
    valuetextLiveness(value) {
        this.state.valueMean.liveness = value
        return {value}
    }

    valuetextEnergy(value) {
        this.state.valueMean.energy = value
        return {value}
    }

    handleSubmit() {
        if(!(this.state.s1 === "" && this.state.s2 === "" && this.state.s3 === "" && this.state.s4 === "" && this.state.s5 === "")){
            this.setState({
                enviar:true,
                seedGenres:String(this.state.s1) + String(this.state.s2) + String(this.state.s3) + String(this.state.s4) + String(this.state.s5)
            })
        }
    }

    select1(e) {
        this.setState({
            s1:e.target.value
        })
    }

    select2(e) {
        this.setState({
            s2:e.target.value
        })
    }
    
    select3(e) {
        this.setState({
            s3:e.target.value
        })
    }

    select4(e) {
        this.setState({
            s4:e.target.value
        })
    }

    select5(e) {
        this.setState({
            s5:e.target.value
        })
    }

    handleClose1(){
        this.setState({drop1:false});
    };

    handleOpen1(){
        this.setState({drop1:true});
    };

    handleClose2(){
        this.setState({drop2:false});
    };

    handleOpen2(){
        this.setState({drop2:true});
    };
    
    handleClose3(){
        this.setState({drop3:false});
    };

    handleOpen3(){
        this.setState({drop3:true});
    };

    handleClose4(){
        this.setState({drop4:false});
    };

    handleOpen4(){
        this.setState({drop4:true});
    };

    handleClose5(){
        this.setState({drop5:false});
    };

    handleOpen5(){
        this.setState({drop5:true});
    };

    render(){
        
        if(this.state.tracksValues!=""){
            this.valueMean()
            if(this.state.valueMean.acousticness!==undefined && this.state.enviar === false) {
                return(
                    <div>
                        <div className="sliderContainer">
                            <h3>Acústica</h3>
                            <div className="slider">
                                <Slider 
                                    defaultValue={this.state.valueMean.acousticness}
                                    getAriaValueText={this.valuetextAcousticness}
                                    aria-labelledby="continuous-slider"
                                    step={0.01}
                                    min={0}
                                    max={1}
                                    valueLabelDisplay="auto"
                                    className="slider"
                                />   
                            </div>
                        </div>
                            <p>1.0 represents high confidence the track is acoustic.</p>
                        <div className="sliderContainer">
                            <h3>Dançabilidade</h3>
                            <div className="slider">
                                <Slider 
                                    defaultValue={this.state.valueMean.danceability}
                                    getAriaValueText={this.valuetextDanceability}
                                    aria-labelledby="continuous-slider"
                                    step={0.01}
                                    min={0}
                                    max={1}
                                    valueLabelDisplay="auto"
                                    className="slider"
                                />   
                            </div>
                        </div>
                            <p>Describes how suitable a track is for dancing based on a combination of musical elements.</p>
                        <div className="sliderContainer">
                            <h3>Energia</h3>
                            <div className="slider">
                                <Slider 
                                    defaultValue={this.state.valueMean.energy}
                                    getAriaValueText={this.valuetextEnergy}
                                    aria-labelledby="continuous-slider"
                                    step={0.01}
                                    min={0}
                                    max={1}
                                    valueLabelDisplay="auto"
                                    className="slider"
                                />   
                            </div>
                        </div>
                            <p>Typically, energetic tracks feel fast, loud, and noisy.</p>
                        <div className="sliderContainer">
                            <h3>Vivacidade</h3>
                            <div className="slider">
                                <Slider 
                                    defaultValue={this.state.valueMean.liveness}
                                    getAriaValueText={this.valuetextLiveness}
                                    aria-labelledby="continuous-slider"
                                    step={0.01}
                                    min={0}
                                    max={1}
                                    valueLabelDisplay="auto"
                                    className="slider"
                                />   
                            </div>
                        </div>
                            <p>Higher liveness values represent an increased probability that the track was performed live.</p>
                        <div className="App">
                            <h3>Escolha pelo menos um gênero:</h3>
                            <p>Menos gêneros = Maiores as chances de encontrar uma recomendação</p>
                            <FormControl className="dropdownLinha">
                                <Select
                                    className="selectable"
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={this.state.drop1}
                                    onClose={this.handleClose1}
                                    onOpen={this.handleOpen1}
                                    value={this.state.s1}
                                    onClick={this.select1}
                                >
                                    {Object.values(this.state.availableSeeds.genres).map(function(key) {
                                        return (
                                            <MenuItem value={key}>{key}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className="dropdownLinha">
                                <Select
                                    className="selectable"
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={this.state.drop2}
                                    onClose={this.handleClose2}
                                    onOpen={this.handleOpen2}
                                    value={this.state.s2}
                                    onClick={this.select2}
                                >
                                    {Object.values(this.state.availableSeeds.genres).map(function(key) {
                                        return (
                                            <MenuItem value={key}>{key}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className="dropdownLinha">
                                <Select
                                    className="selectable"
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={this.state.drop3}
                                    onClose={this.handleClose3}
                                    onOpen={this.handleOpen3}
                                    value={this.state.s3}
                                    onClick={this.select3}
                                >
                                    {Object.values(this.state.availableSeeds.genres).map(function(key) {
                                        return (
                                            <MenuItem value={key}>{key}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className="dropdownLinha">
                                <Select
                                    className="selectable"
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={this.state.drop4}
                                    onClose={this.handleClose4}
                                    onOpen={this.handleOpen4}
                                    value={this.state.s4}
                                    onClick={this.select4}
                                >
                                    {Object.values(this.state.availableSeeds.genres).map(function(key) {
                                        return (
                                            <MenuItem value={key}>{key}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className="dropdownLinha">
                                <Select
                                    className="selectable"
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={this.state.drop5}
                                    onClose={this.handleClose5}
                                    onOpen={this.handleOpen5}
                                    value={this.state.s5} 
                                    onClick={this.select5}
                                >
                                    {Object.values(this.state.availableSeeds.genres).map(function(key) {
                                        return (
                                            <MenuItem value={key}>{key}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="button">
                            <Button color="primary" variant="contained" onClick={this.handleSubmit}>Sumbit</Button>
                        </div>
                    </div>
                );             
            }
            
            if(this.state.enviar === true) {
                return(
                    <div>
                        <FetchRec token={this.props.token} seedGenres={this.state.seedGenres} valueMean={this.state.valueMean}/>
                    </div>
                );
            }
        } else {
            return(
                <div>
                    Carregando
                </div>
            );
        }       
    }
}
export default PlaylistFeatures;