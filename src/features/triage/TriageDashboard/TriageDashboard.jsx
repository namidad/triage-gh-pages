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
    victims: [],
  }

  componentWillMount(){
    this.inter = setInterval(()=>{
      axios.get('http://localhost:4000/getVictims')
      .then(res=>{
        if(res.data !== this.state.victims){
          this.setState({
            victims: res.data,
          })
        }
      }).catch(err=>console.log(err));
    },1000);
  }

  componentWillUnmount(){
    clearInterval(this.inter);
  }

  handleChangeId=(e)=>{
    const path = '/victim/'+e._id;
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
    let markers=null;
    if(this.state.victims.length>0){
       markers = this.state.victims.map(vic=>{
        if(vic.currentPriority.toLowerCase()==="green"){
          if(this.state.green){
            return <CustomMarker color={vic.currentPriority.toLowerCase()} key={vic._id} lat={vic.reports[vic.reports.length-1].latitude} lng={vic.reports[vic.reports.length-1].longitude}  _id={vic._id} onClick={this.handleChangeId}/>
          }
        } else if (vic.currentPriority.toLowerCase()==="red"){
          if(this.state.red){
            return <CustomMarker color={vic.currentPriority.toLowerCase()} key={vic._id} lat={vic.reports[vic.reports.length-1].latitude} lng={vic.reports[vic.reports.length-1].longitude}  _id={vic._id} onClick={this.handleChangeId}/>
          }
        } else if (vic.currentPriority.toLowerCase()==="black") {
          if(this.state.black){
            return <CustomMarker color={vic.currentPriority.toLowerCase()} key={vic._id} lat={vic.reports[vic.reports.length-1].latitude} lng={vic.reports[vic.reports.length-1].longitude}  _id={vic._id} onClick={this.handleChangeId}/>
          }
        } else if (vic.currentPriority.toLowerCase()==="yellow") {
          if(this.state.yellow){
            return <CustomMarker color={vic.currentPriority.toLowerCase()} key={vic._id} lat={vic.reports[vic.reports.length-1].latitude} lng={vic.reports[vic.reports.length-1].longitude}  _id={vic._id} onClick={this.handleChangeId}/>
          }
        }
        return null;
      })
    }
    

    if(this.props.logged && this.state.victims.length>0){
      let latitude=0,longitude=0;
      for(let i = 0;i<this.state.victims.length;i++){
          latitude += this.state.victims[i].reports[this.state.victims[i].reports.length-1].latitude;
          longitude +=this.state.victims[i].reports[this.state.victims[i].reports.length-1].longitude;
      }
      latitude=latitude/this.state.victims.length;
      longitude=longitude/this.state.victims.length;
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
                  lat: latitude,
                  lng: longitude
                }}
                zoom={18}
              >
                {markers}
            </Map>
          </div>
            
        </div>

      )
    } else if(this.props.logged){
      return null
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
