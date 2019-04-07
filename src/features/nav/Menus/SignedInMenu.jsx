import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'

const SignedInMenu = ({signOut}) => {

    return(
            <Menu.Item position="right">
            <Dropdown.Item text="Przelacz" icon="download" />
            <Dropdown.Item onClick={signOut} text="Sign Out" icon="power" />
            </Menu.Item>
    )
}

export default SignedInMenu
