import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components'

const Item = styled.div`
  background-color: #C0C0C0;
  width: 265px;
  height: 375px;
  border: 1px solid #000;
  flex: none;
  border-width: 2px;
  border-style: solid;
  border-color: #FFFFFF #808080 #808080 #FFFFFF;
  display: flex;
  flex-direction: column;
  margin: 10px;
`

const Title = styled.h1`
  background-color: #000080;
  width: 100%;
  text-align: left;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  color: white;
  margin: 0;
  padding: 2px 10px;
`

const Description = styled.div`
  padding: 10px;
`

const LastUpdate = styled.div`
  margin-top: auto;
  font-size: 0.75rem;
  color: #606060;
  padding-left: 10px;
`

const GoLink = styled(props => <Link {...props} />)`
  display: block;
  width: 60px;
  margin: 19px auto;
  text-align: center;
  text-decoration: none;
  outline: 1px solid #000000;
  border-width: 1px;
  border-style: solid;
  border-color: #FFFFFF #808080 #808080 #FFFFFF;
  padding: 1px;

  &:active {
    border-color: #808080 #FFFFFF #FFFFFF #808080;
    outline: 0;
    padding: 2px 0px 0px 2px;
  }
`

export default ({ meal, language }) => (
  <Item>
    <Title>{meal.title}</Title>
    <Description
        dangerouslySetInnerHTML={{
          __html:meal.shortDescription.childMarkdownRemark.html,
        }}
    />
    <LastUpdate>Last Updated: {meal.updatedAt}</LastUpdate>
    <GoLink to={`/${language}/meal/${meal.slug}`}>Go</GoLink>
  </Item>
)
