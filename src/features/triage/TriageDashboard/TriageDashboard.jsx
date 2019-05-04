import React, { Component } from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react';
import CustomMarker from './CustomMarker'
import { Checkbox } from 'semantic-ui-react'
import mapStyles from './mapStyles';
import { connect } from 'react-redux'
import axios from 'axios';
import { addVictims } from '../../../app/reducers/victimsActions'


export class TriageDashboard extends Component {

  state = {
    _id: 0,
    color: "",
    lat: 0,
    lng: 0,
    injury: "",
    green: true,
    yellow: true,
    red: true,
    black: true,
    victims: this.props.victims,
  }

  componentWillMount(){
    axios.get('http://localhost:4000/getVictims')
      .then(res=>{
        for(let i=0; i<res.data.length;i++){
          res.data[i]._id=i;
          console.log(res.data[i]);
        }
        this.props.addVictims(res.data);
        this.setState({
          victims: res.data,
          _id: res.data[0]._id,
          color: res.data[0].color,
         lat: res.data[0].lat,
         lng: res.data[0].lng,
         injury: res.data[0].injury,
        })
      }).catch(err=>console.log(err));
  }

  handleChangeId=(e)=>{
        this.setState({
          _id: e._id,
          color: this.state.victims[e._id].color,
          lat: this.state.victims[e._id].lat,
          lng: this.state.victims[e._id].lng,
          injury: this.state.victims[e._id].injury,
        })
  }

  handleChecked = (e) => {
    let bool;
    if(e==="green"){
      bool=!this.state.green;
    } else if (e==="yellow") {
      bool=!this.state.yellow;
    } else if (e==="red") {
      bool=!this.state.red;
    } else if (e==="black") {
      bool=!this.state.black;
    }
    this.setState({
      [e]: bool
    })

  }

  render() {
    let markers = this.state.victims.map(vic=>{
      if(vic.color==="green"){
        if(this.state.green){
          return <CustomMarker color={vic.color} key={vic._id} lat={vic.lat} lng={vic.lng}  _id={vic._id} onClick={this.handleChangeId}/>
        }
      } else if (vic.color==="red"){
        if(this.state.red){
          return <CustomMarker color={vic.color} key={vic._id} lat={vic.lat} lng={vic.lng}  _id={vic._id} onClick={this.handleChangeId}/>
        }
      } else if (vic.color==="black") {
        if(this.state.black){
          return <CustomMarker color={vic.color} key={vic._id} lat={vic.lat} lng={vic.lng}  _id={vic._id} onClick={this.handleChangeId}/>
        }
      } else if (vic.color==="yellow") {
        if(this.state.yellow){
          return <CustomMarker color={vic.color} key={vic._id} lat={vic.lat} lng={vic.lng}  _id={vic._id} onClick={this.handleChangeId}/>
        }
      }

      return null;
    })

    if(this.props.logged){
      return (
        <div className="mapContainer">
          <div className="injuredMap">
          <Checkbox onChange={ e => this.handleChecked("green") }  label='Show green band' defaultChecked/>
          <Checkbox onChange={ e => this.handleChecked("yellow") } value="yellow" label='Show yellow band' defaultChecked/>
          <Checkbox onChange={ e => this.handleChecked("red") } value="red" label='Show red band' defaultChecked/>
          <Checkbox onChange={ e => this.handleChecked("black") } value="black" label='Show black band' defaultChecked/>
            <Map
                google={this.props.google}
                style={{width: '40%', height: '80%'}}
                styles={mapStyles}

                initialCenter={{
                  lat: 51.108197,
                  lng: 17.0326689
                }}
                zoom={18}
              >
                {markers}
            </Map>
          </div>

          <div className="injuredForm">

            <h2>Poszkodowany nr: {this.state._id}</h2>
            <h3>Kolor opaski: {this.state.color}</h3>
            <h3>Lat: {this.state.lat}</h3>
            <h3>Lng: {this.state.lng}</h3>
            <h3>Obrazenia: {this.state.injury}</h3>
           </div>
        </div>

      )
    }

  }
}

const mapStateToProps = (store) => {
  return {
    logged: store.user.isLogged,
    victims: store.victims.victims,
  }
}

const mapDispatchToState = (dispatch) => {
  return {
    addVictims: (victims) => dispatch(addVictims(victims))
  }
}


export default connect(mapStateToProps, mapDispatchToState)(GoogleApiWrapper({
  apiKey: ("AIzaSyCblUbnkuTFlV_z1Uz0L5zowqVds8iIim0")
})(TriageDashboard))
