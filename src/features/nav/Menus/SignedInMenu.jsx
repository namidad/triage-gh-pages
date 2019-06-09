import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


const SignedInMenu = ({goToMap}) => {
    return(
            <Menu.Item position="right">
            <Menu.Item as={Link} to='/triage' header>
                Go to map
            </Menu.Item>
            <Dropdown.Item text="Sign Out" icon="power" />
            </Menu.Item>
    )
}

export default SignedInMenu
