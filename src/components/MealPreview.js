import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components'
import { getMessage, formatDateDistanceToNow } from '../data/languages'

const Item = styled.div`
  width: 265px;
  height: 375px;
  background-color: #FFFFF8;
  border: 1px solid #000;
  flex: none;
  border: 2px outset #606060;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 2px #D0D0D0;
  display: flex;
  flex-direction: column;
  margin: 10px;
`

const HeroImage = styled(props => <Img {...props} />)`
  max-width: 100%;
  border-radius: 3px 3px 0px 0px;
`

const Title = styled.h1`
  background-color: #303080;
  width: 100%;
  text-align: left;
  font-family: Arial;
  font-size: 1.5rem;
  color: white;
  margin: 0;
  padding: 3px 13px;
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

const CTA = styled(props => <Link {...props} />)`
  display: block;
  width: 70px;
  margin: 19px auto;
  text-align: center;
  text-decoration: none;
  border-top: 1px solid #333;
  border-left: 1px solid #333;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  background-color: #F7F7F7;
  padding: 3px;
  border-radius: 14px;

  &:active {
    border-top: 2px solid #000;
    border-left: 2px solid #000;
    border-right: 1px solid #333;
    border-bottom: 1px solid #333;
    padding: 3px;
  }
`

const MealPreview = ({ meal, locale }) => {
  const messages = getMessage(locale)
  return (
    <Item>
      <HeroImage resolutions={meal.heroImage.resolutions}/>
      <Title>{meal.title}</Title>
      <Description
        dangerouslySetInnerHTML={{
          __html:meal.shortDescription.childMarkdownRemark.html,
        }}
      />
      <LastUpdate>{formatDateDistanceToNow(locale, new Date(meal.updatedAt))}</LastUpdate>
      <CTA to={`/${locale}/meal/${meal.slug}`}>{messages('VIEW')}</CTA>
    </Item>
  )
}

export default MealPreview
