import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import axios from 'axios'
export class TriageMethod extends Component {

    state = {
        test: ""
    }

    handleStartClick = () =>{
        const body = {
            id: '5cfbc12ceef2bf0d2353bd3d',
            victimsNum: 50,
            rescuersNum: 10,
            isUsed: true,
        }

        // const body = {    
        // victimID: 1,
        // rescuerID: 't1',
        // teamID: 't1',
        // deviceName: 't1',
        // timestamp: 123123,
        // priority: 'blue',
        // pulse: 90,
        // saturation: 20,
        // breathPerMinute: 30,
        // latitude: 44.4,
        // longitude: 333.3,
        // comment: 'asdaasd'
        // }
    
        // axios.post('http://localhost:4000/addSensorDataToVictim', body).then((res)=>{
        //     if(res){
        //         this.props.history.push('/triage-gh-pages/triage');
        //     }
        // });
        axios.post('http://localhost:4000/updateMethod', body).then((res)=>{
            if(res){
                this.props.history.push('/triage');
            }
        });
    }
    handleJumpStartClick = () => {
        const body = {
            id: '5cfbc14811bb070d69aca60d',
            victimsNum: 100,
            rescuersNum: 10,
            isUsed: true,
        }
        axios.post('http://localhost:4000/method', body).then((res)=>{
            if(res){
                this.props.history.push('/triage');
            }
        });
    }

  render() {
    return (
        <div className={"chooseMethod"}>
            <h1>Wybierz metodę Triage</h1>
            <div>
                <Button onClick={this.handleStartClick} content='Start' />
                <Button onClick={this.handleJumpStartClick} content='JumpStart' />
            </div>
        </div>
    );
    }

}



export default TriageMethod;