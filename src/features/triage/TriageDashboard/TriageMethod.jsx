import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import axios from 'axios'
export class TriageMethod extends Component {

    state = {
        test: ""
    }

    handleStartClick = () =>{
        const body = {
            id: '5ccda3fdf5c55d25a2abb295',
            isUsed: true,
        }
        axios.post('http://localhost:4000/method', body).then((res)=>{
            if(res){
                this.props.history.push('/triage-gh-pages/triage');
            }
        });
    }
    handleJumpStartClick = () => {
        const body = {
            id: '5ccda3fdf5c55d25a2abb296',
            isUsed: true,
        }
        axios.post('http://localhost:4000/method', body).then((res)=>{
            if(res){
                this.props.history.push('/triage-gh-pages/triage');
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