import React from 'react'

import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import { formatDateDistanceToNow, getMessage } from '../data/languages'

const Item = styled.div`
  width: 280px;
  height: 380px;
  background-color: #fffff8;
  flex: none;
  border: 4px outset #606060;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 15px 12px;
`

const HeroImage = styled(props => (
  <Link {...props}>
    <Img {...props} />
  </Link>
))`
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 6px 6px 0px 0px;
`

const Title = styled.h1`
  background-color: #303080;
  width: 100%;
  text-align: left;
  font-size: 1.5rem;
  color: white;
  margin: 0;
  padding: 3px 13px;
`

const Description = styled.div`
  padding: 10px;

  & p {
    margin: 0;
  }
`

const LastUpdate = styled.div`
  font-size: 0.65rem;
  color: #888;
  padding-left: 10px;
`

const CTA = styled(props => <Link {...props} />)`
  display: block;
  margin: 10px auto 17px auto;
  text-decoration: none;
  border: 1px outset #666;
  background-color: #f9f9f9;
  padding: 3px 16px;
  border-radius: 7px;

  &:active {
    background-color: #eee;
  }
`

interface IProps {
  meal: IMeal
  locale: string
}

const MealPreview: React.FC<IProps> = ({ meal, locale }) => {
  const messages = getMessage(locale)
  return (
    <Item>
      <HeroImage
        to={`/${locale}/meal/${meal.slug}`}
        fixed={meal.heroImage.fixed}
      />
      <Title>{meal.title}</Title>
      <Description
        dangerouslySetInnerHTML={{
          __html: meal.shortDescription.childMarkdownRemark.html,
        }}
      />
      <LastUpdate>
        {formatDateDistanceToNow(locale, new Date(meal.updatedAt))}
      </LastUpdate>
      <CTA to={`/${locale}/meal/${meal.slug}`}>{messages('VIEW')}</CTA>
    </Item>
  )
}

export default MealPreview
