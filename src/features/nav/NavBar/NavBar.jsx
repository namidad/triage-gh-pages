import React, { Component } from "react";
import { Menu, Container} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import SignedInMenu from "../Menus/SignedInMenu";
import logo from "./logo.png"
import { connect } from 'react-redux'


class NavBar extends Component {

  goToMap = (e) =>  {
    e.preventDefault();
    this.props.history.push('/triage');
  }

  render() {

    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to='/' header>
            <img src={logo} alt="logo" />
            Triage
          </Menu.Item>
          
          <SignedInMenu goToMap={this.goToMap} />
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.isAdmin
  }
}

export default connect(mapStateToProps)(NavBar);
