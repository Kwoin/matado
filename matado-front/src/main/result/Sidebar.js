import React from "react";
import "./Sidebar.scss";
import { Suggest } from "@blueprintjs/select";
import { MenuItem, FormGroup, Divider, Tag, Button, H3, Icon, Text, H4 } from "@blueprintjs/core";

function Sidebar(props) {
  return (
      <div id="sidebar">
        <FormGroup>
          <Suggest
              fill={true}
              inputProps={{
                leftIcon: "search",
              }}
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
        </FormGroup>
        <div class="tag-list">
          <Tag className={"tag"} interactive={true} round={true} onRemove={() => console.log("remove")}>chou</Tag>
          <Tag className={"tag"} interactive={true} round={true} onRemove={() => console.log("remove")}>crème</Tag>
        </div>
        <Button icon={"double-chevron-down"} minimal={true}></Button>
        <Divider/>
        <div class="filter-header">
          <Icon icon={"filter"}></Icon><H4>Filtrer les résultats</H4>
        </div>
        <div class="tag-list">
          <Tag className={"tag"} interactive={true} round={true}><b>10</b> sucre</Tag>
          <Tag className={"tag"} interactive={true} round={true}><b>10</b> crème</Tag>
          <Tag className={"tag"} interactive={true} round={true}><b>10</b> dessert</Tag>
          <Tag className={"tag"} interactive={true} round={true}><b>10</b> chou</Tag>
          <Tag className={"tag"} interactive={true} round={true}><b>10</b> sucre</Tag>
          <Tag className={"tag"} interactive={true} round={true}><b>10</b> crème</Tag>
          <Tag className={"tag"} interactive={true} round={true}><b>10</b> dessert</Tag>
          <Tag className={"tag"} interactive={true} round={true}><b>10</b> chou</Tag>
          <Tag className={"tag"} interactive={true} round={true}><b>10</b> sucre</Tag>
          <Tag className={"tag"} interactive={true} round={true}><b>10</b> crème</Tag>
          <Tag className={"tag"} interactive={true} round={true}><b>10</b> dessert</Tag>
          <Tag className={"tag"} interactive={true} round={true}><b>10</b> chou</Tag>
          <Tag className={"tag"} interactive={true} round={true}><b>10</b> sucre</Tag>
          <Tag className={"tag"} interactive={true} round={true}><b>10</b> crème</Tag>
          <Tag className={"tag"} interactive={true} round={true}><b>10</b> dessert</Tag>
        </div>
        <Button icon={"double-chevron-down"} minimal={true}></Button>
        <Divider/>
      </div>
  )
}

export default Sidebar;