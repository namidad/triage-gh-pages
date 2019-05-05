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
        }
        this.props.addVictims(res.data);
        this.setState({
          victims: res.data,
        })
      }).catch(err=>console.log(err));
  }

  handleChangeId=(e)=>{
    const path = '/triage-gh-pages/victim/'+e._id;
    this.props.history.push(path);
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
        <div>
          <Checkbox onChange={ e => this.handleChecked("green") }  label='Show green band' defaultChecked/>
          <Checkbox onChange={ e => this.handleChecked("yellow") } value="yellow" label='Show yellow band' defaultChecked/>
          <Checkbox onChange={ e => this.handleChecked("red") } value="red" label='Show red band' defaultChecked/>
          <Checkbox onChange={ e => this.handleChecked("black") } value="black" label='Show black band' defaultChecked/>
        </div>

          <div className="map">
          <Map
                google={this.props.google}
                style={{width: '80%', height: '60%'}}
                styles={mapStyles}

                initialCenter={{
                  lat: 51.109000,
                  lng: 17.032737
                }}
                zoom={18}
              >
                {markers}
            </Map>
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
