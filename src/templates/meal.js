import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { p } from 'styled-components-spacing'

import Layout from '../components/Layout'
import Meal from '../components/Meal'
import Recipe from '../components/Recipe'

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

const MealPage = ({ data, location }) => {
  const meal = data.contentfulMeal
  const { title, recipes } = meal
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} >
      <Helmet title={`${title} | ${siteTitle}`} />
      <Content>
        <Meal meal={meal}>
          {recipes && recipes.map(recipe => (
            <Recipe
              key={recipe.id}
              showTitle={recipes.length > 1}
              recipe={recipe}
            />
          ))}
        </Meal>
      </Content>
    </Layout>
  )
}

export default MealPage

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
