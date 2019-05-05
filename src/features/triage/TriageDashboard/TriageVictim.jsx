import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'


export class TriageVictim extends Component {

    state = {
        id: this.props.match.params.id,
        data: {
            labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60'],
            datasets: [
                {
                    label: "Tętno",
                    backgroundColor: "rgba(214,69,65,0.755)",
                    data: []
                }
            ]
        }
    }

    componentDidMount(){
        let i=0,min=0,max=140,rand=0;
        this.interval = setInterval(()=>{
            rand = Math.floor(Math.random()*(max-min));
            if(i<=60){
                this.setState({
                    data: {
                        labels: this.state.data.labels,
                        datasets:[{
                            label: "Tętno",
                            backgroundColor: "rgba(214,69,65,0.755)",
                            data: [...this.state.data.datasets[0].data,rand]
                        }],
                    }
                })
            } else {
                this.setState({
                    data: {
                        labels: [...this.state.data.labels,i.toString()],
                        datasets:[{
                            label: "Tętno",
                            backgroundColor: "rgba(214,69,65,0.755)",
                            data: [...this.state.data.datasets[0].data,rand]
                        }],
                    }
                })
            }
            i++;
        },1000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }


  render() {
      const victim=this.props.victims[this.state.id];
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
                                        labelString: 'Tętno'
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
                    <h3>Poszkodowany nr: {victim._id}</h3>
                    <h4>Kolor opaski: {victim.color}</h4>
                    <h4>Lat: {victim.lat}</h4>
                    <h4>Lng: {victim.lng}</h4>
                    <h4>Obrazenia: {victim.injury}</h4>
                </div>
            </div>
            <Button as={Link} to={'/triage-gh-pages/triage'} >Cofnij</Button>
            
        </div>

        
    );
    }

}

const mapStateToProps = (store) => {
    return {
      logged: store.user.isLogged,
      victims: store.victims.victims,
    }
  }


export default connect(mapStateToProps)(TriageVictim);