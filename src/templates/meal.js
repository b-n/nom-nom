import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { p, pb, mb } from 'styled-components-spacing'
import { formatDateDistanceToNow } from '../data/languages'

import Layout from '../components/layout'
import Recipe from '../components/Recipe'


const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${mb({ mobile: 2, tablet: 3, desktop: 3 })};
`

const Header = styled.h1`
  margin: 0;
`

const SubHeader = styled.div`
  margin: 0;
  font-size: 0.8em;
  color: #777;
`

const Content = styled.div`
  background-color: white;
  ${p({ mobile: 3, tablet: 4, desktop: 5 })};
  ${breakpoint('mobile')`
    width: 100%;
  `}

  ${breakpoint('tablet')`
    width: 90%;
  `}

  ${breakpoint('desktop')`
    width: 80%;
  `}
`

const ShortDescription = styled.div`
  width: 100%;
  color: #223;
  ${pb({ mobile: 3, tablet: 4, desktop: 4 })};
  border-bottom: 1px solid #000;
`

const Meal = ({ data, location }) => {
  const meal = data.contentfulMeal
  const { title, updatedAt, shortDescription, recipes, node_locale } = meal
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} >
      <Helmet title={`${meal.title} | ${siteTitle}`} />
      <Content>
        <HeaderWrapper>
          <Header>{title}</Header>
          <SubHeader>{formatDateDistanceToNow(node_locale, new Date(updatedAt))}</SubHeader>
        </HeaderWrapper>

        <ShortDescription
          dangerouslySetInnerHTML={{
            __html: shortDescription.childMarkdownRemark.html,
          }}
        />
        {recipes && recipes.map(recipe => (
          <Recipe
            key={recipe.id}
            showTitle={recipes.length > 1}
            recipe={recipe}
          />
        ))}
      </Content>
    </Layout>
  )
}

export default Meal

export const pageQuery = graphql`
  query MealById($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulMeal(id: { eq: $id }) {
      title
      updatedAt
      node_locale
      shortDescription {
        childMarkdownRemark {
          html
        }
      }
      recipes {
        id
        ingredients {
          json
        }
        instructions {
          json
        }
        title
      }
    }
  }
`
