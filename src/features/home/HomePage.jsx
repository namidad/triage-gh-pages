import React, {Component} from 'react'
import { Form, Grid, Button, Header, Segment, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { loginUser } from '../../app/reducers/userActions'
import logo from "./logo.png"
import axios from 'axios';

class HomePage extends Component {

  state = {
    login:'',
    password:'',
    logged: false,
    error: false,
    }


  handleLogin = (e) => {
    e.preventDefault();
    const body={
      username: this.state.login,
      password: this.state.password
    }

    axios.post('http://localhost:4000/login',body)
      .then(res=>{
        if(res.data){
          let login = {
            logged: true,
          };
            this.props.loginUser(login);
            this.setState({
              error:false,
            })
          this.props.history.push('/triage-method');
        } else {
          this.setState({
            error:true,
          })
        }
      }).catch(err=>console.log(err));
  }

  handleLoginChange= (e)=>{
      this.setState({
        login: e.target.value
      })
  }

  handlePasswordChange= (e) =>{
   this.setState({
     password: e.target.value
   })
 }


  render(){
    if(!this.props.isLogged){
      return (
        <div>
              <div className="ui inverted vertical masthead center aligned segment">
                <div className="ui text container">
                  <h1 className="ui inverted stackable header">
                    <img
                      className="ui image massive"
                      src={logo}
                      alt="logo"
                    />
                    <div className="content">Triage</div>
                  </h1>
                  <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
          Login to your account
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input onChange={this.handleLoginChange} fluid icon='user' iconPosition='left' placeholder='Login' />
              <Form.Input
                onChange={this.handlePasswordChange}
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />

              <Button onClick={this.handleLogin} color='teal' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>


          {this.state.error && <Message negative>
            <Message.Header>Login error!</Message.Header>
            <p>Invalid login or password. Try again!</p>
          </Message> }

        </Grid.Column>
      </Grid>
                </div>
              </div>
            </div>
      )
    } else
      {
      this.props.history.push('/triage-method');
      return null;
    }
    }

}

const mapStateToProps = (store) => {
  return {
    isLogged: store.user.isLogged
  }
}

const mapDispatchToProps = (dispatch)=>{
   return {
     loginUser: (login)=> dispatch(loginUser(login))
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
