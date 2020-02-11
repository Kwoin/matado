import React from 'react';
import './RecepeeCard.scss';
import { Card, Divider, Elevation, H4, Tag, Text } from "@blueprintjs/core";
import image from './image1.png';

function RecepeeCard(props) {
  return (
      <Card interactive={true} elevation={Elevation.TWO} className={'recepee-card'}>
        <div className={'recepee-card-head'}>
          <H4>Chou à la crème</H4>
        </div>
        <img src={image} width="250px"/>
        <div className={'recepee-card-taglist'}>
          <Tag interactive={true} round={true}>chou</Tag>
          <Tag interactive={true} round={true}>crème</Tag>
          <Tag interactive={true} round={true}>dessert</Tag>
          <Tag interactive={true} round={true}>sucre</Tag>
          <Tag interactive={true} round={true}>sucre</Tag>
          <Tag interactive={true} round={true}>sucre</Tag>
          <Tag interactive={true} round={true}>sucre</Tag>
          <Tag interactive={true} round={true}>sucre</Tag>
        </div>
        <Divider/>
        <div className={'recepee-card-foot'}>
          <span>@<a href="#">Mathild.C</a></span>
        </div>
      </Card>
  );
}

export default RecepeeCard;