import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'
import axios from 'axios';



export class TriageVictim extends Component {

    state = {
        id: this.props.match.params.id,
        data: {
            labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60'],
            datasets: [
                {
                    label: "",
                    backgroundColor: "rgba(214,69,65,0.755)",
                    data: []
                }
            ]
        },
        data1: {
            labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60'],
            datasets: [
                {
                    label: "",
                    backgroundColor: "rgba(214,69,65,0.755)",
                    data: []
                }
            ]
        },
        data2: {
            labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60'],
            datasets: [
                {
                    label: "",
                    backgroundColor: "rgba(214,69,65,0.755)",
                    data: []
                }
            ]
        },
        victim: null
    }


    componentDidMount(){
        let link, vic;
        this.interval = setInterval(()=>{
            link = 'http://localhost:4000/getVictim/'+this.props.match.params.id;
            axios.get(link)
            .then(res=>{
                vic = res.data;
                let pulse=[], saturation=[], bpm=[];
                for(let i=0;i<vic.sensorReads.length;i++){
                    pulse=[...pulse, vic.sensorReads[i].pulse];
                    saturation=[...saturation, vic.sensorReads[i].saturation];
                    bpm =[...bpm, vic.sensorReads[i].breathPerMinute];
                }
                if(pulse.length<=60){
                    this.setState({
                        data: {
                            labels: this.state.data.labels,
                            datasets:[{
                                label: "Pulse",
                                borderColor: 'rgba(214,69,65,0.755)',
                                backgroundColor: "rgba(214,69,65,0)",
                                data: pulse
                            }
                            ]
                        },
                        data1: {
                            labels: this.state.data.labels,
                            datasets:[
                            {
                                label: "Saturation",
                                borderColor: 'rgb(0,0,0)',
                                backgroundColor: "rgba(214,69,65,0)",
                                data: saturation
                            }
                            ]
                        },
                        data2: {
                            labels: this.state.data.labels,
                            datasets:[
                            {
                                label: "Breath per minute",
                                borderColor: 'rgb(147,246,0)',
                                backgroundColor: "rgba(214,69,65,0)",
                                data: bpm
                            }
                            ]
                        }
                    })
                } else {
                    let label = [...this.state.data.labels];
                    label.shift();
                    label.push(pulse.length.toString());
                    this.setState({ 
                    
                        data: {
                            labels: label,
                            datasets:[{
                                label: "Pulse",
                                borderColor: 'rgba(214,69,65,0.755)',
                                backgroundColor: "rgba(214,69,65,0)",
                                data: pulse
                            }
                            ]
                        },
                        data1: {
                            labels: [...this.state.data.labels,pulse.length.toString()],
                            datasets:[
                            {
                                label: "Saturation",
                                borderColor: 'rgb(0,0,0)',
                                backgroundColor: "rgba(214,69,65,0)",
                                data: saturation
                            }
                            ]
                        },
                        data2: {
                            labels: [...this.state.data.labels,pulse.length.toString()],
                            datasets:[
                            {
                                label: "Breath per minute",
                                borderColor: 'rgb(147,246,0)',
                                backgroundColor: "rgba(214,69,65,0)",
                                data: bpm
                            }
                            ]
                        }
                    })
                }
                this.setState({
                    victim: res.data
                });
            }).catch(err=>console.log(err));
        },1000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }


  render() {
      if(this.state.victim){
        return (
            <div className={'victimDetailed'}>
                <div className={'raports'}>
                <div className={'victimC    ontainer'}>
                    <div className='victimLine'>
                        <Line 
                            options={{
                                responsive:true,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            min: 0,
                                            max:160
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Pulse'
                                        }
                                    }],
                                    xAxes: [{
                                        ticks: {
                                            min: 0,
                                            max:60
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Time[s]'
                                        }
                                    }],
                                }
                            }}
                            data={this.state.data}
                        />
                    </div>
                    <div className='victimLine'>
                        <Line 
                            options={{
                                responsive:true,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            min: 0,
                                            max:100
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Saturation'
                                        }
                                    }],
                                    xAxes: [{
                                        ticks: {
                                            min: 0,
                                            max:60
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Time[s]'
                                        }
                                    }],
                                }
                            }}
                            data={this.state.data1}
                        />
                    </div>
                    <div className='victimLine'>
                        <Line 
                            options={{
                                responsive:true,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            min: 0,
                                            max: 60
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Breath per minute'
                                        }
                                    }],
                                    xAxes: [{
                                        ticks: {
                                            min: 0,
                                            max:60
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Time[s]'
                                        }
                                    }],
                                }
                            }}
                            data={this.state.data2}
                        />
                    </div>
                </div>
                <div className="victimLine victimDetailed">
                        <h3>{this.state.victim.victimID} - Victim ID</h3>
                        <h4>{this.state.victim.reports[this.state.victim.reports.length-1].rescuerID} - Rescuer ID</h4>
                        <h4>{this.state.victim.currentPriority} - Priority</h4>
                        <h4>{this.state.victim.reports[this.state.victim.reports.length-1].sensorData.pulse} - Pulse</h4>
                        <h4>{this.state.victim.reports[this.state.victim.reports.length-1].sensorData.saturation} - Saturation</h4>
                        <h4>{this.state.victim.reports[this.state.victim.reports.length-1].sensorData.breathPerMinute} - Breath per minute</h4>
                        <h4>{this.state.victim.reports[this.state.victim.reports.length-1].latitude} - Latitude</h4>
                        <h4>{this.state.victim.reports[this.state.victim.reports.length-1].longitude} - Longitude</h4>
                        <h4>{this.state.victim.state} - State</h4>
                    </div>

                </div>
                


                <Button as={Link} to={'/triage-gh-pages/triage'}>Cofnij</Button>
                
            </div>
    
            
        );
      }else {
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


export default connect(mapStateToProps)(TriageVictim);