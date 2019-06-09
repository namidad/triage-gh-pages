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
                    label: "Pulse",
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
                let dataArr=[];
                console.log(vic)
                for(let i=0;i<vic.sensorReads.length;i++){
                    dataArr=[...dataArr, vic.sensorReads[i].pulse];
                }
                console.log(dataArr)
                if(dataArr.length<=60){
                    this.setState({
                        data: {
                            labels: this.state.data.labels,
                            datasets:[{
                                label: "Puls",
                                backgroundColor: "rgba(214,69,65,0.755)",
                                data: dataArr
                            }],
                        }
                    })
                } else {
                    this.setState({
                        data: {
                            labels: [...this.state.data.labels,dataArr.length.toString()],
                            datasets:[{
                                label: "Puls",
                                backgroundColor: "rgba(214,69,65,0.755)",
                                data: dataArr
                            }],
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
                <div className={'victimContainer'}>
                    <div className='victimLine'>
                        <h3>Linia zycia poszkodowanego</h3>
                        <Line 
                            options={{
                                responsive:true,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            min: 0,
                                            max:150
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Puls'
                                        }
                                    }],
                                    xAxes: [{
                                        ticks: {
                                            min: 0,
                                            max:60
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Czas[s]'
                                        }
                                    }],
                                }
                            }}
                            data={this.state.data}
                        />
                    </div>
                    <div className="injuredForm">
                        <h3>Victim ID: {this.state.victim.victimID}</h3>
                        <h4>Priority: {this.state.victim.currentPriority}</h4>
                        <h4>Latitude: {this.state.victim.reports[this.state.victim.reports.length-1].latitude}</h4>
                        <h4>Longitude: {this.state.victim.reports[this.state.victim.reports.length-1].longitude}</h4>
                        <h4>State: {this.state.victim.state}</h4>
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