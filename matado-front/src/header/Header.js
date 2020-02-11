import React from "react";
import { Navbar, Alignment, MenuItem } from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/select";

function Header(props) {
  return (
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Blueprint</Navbar.Heading>
          <Navbar.Divider/>
          <Suggest
              inputValueRenderer={(item) => item.toUpperCase()}
              items={['dessert', 'chou', 'sucre', 'crème']}
              itemRenderer={(word, {handleClick, index, modifiers, query}) => {
                if (!modifiers.matchesPredicate) {
                  return null;
                }
                return (
                    <MenuItem
                        active={modifiers.active}
                        disabled={modifiers.disabled}
                        label={word}
                        key={index}
                        onClick={handleClick}
                        text={word.toUpperCase()}
                    />
                );
              }}
              onItemSelect={(word) => console.log(word)}
          >
          </Suggest>
        </Navbar.Group>
      </Navbar>
  )
}

export default Header;