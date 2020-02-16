import React from "react";
import { Navbar, Alignment, MenuItem, Button, Icon } from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/select";

function Header(props) {
  return (
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Matado</Navbar.Heading>
          <Navbar.Divider/>
          <Button minimal={true}>📖 Articles</Button>
          <Button minimal={true}>🍽️ Recettes</Button>
        </Navbar.Group>
      </Navbar>
  )
}

export default Header;