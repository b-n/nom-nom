import { graphql, PageProps } from 'gatsby'
import shuffle from 'lodash/shuffle'
import React from 'react'
import { Helmet } from 'react-helmet'

import { AllContentfulRecipes } from '../interfaces/recipe'
import { Site } from '../interfaces/site'

import Layout from './common/Layout'
import RecipeCard from './common/RecipeCard'
import RecipeCards from './common/RecipeCards'

type Data = Site & AllContentfulRecipes;

const InspirationPage: React.FC<PageProps<Data>> = (props) => {
  const { data } = props
  const { title } = data.site.siteMetadata
  const recipes = shuffle(data.allContentfulRecipe.edges)

  return (
    <Layout {...props} title={title}>
      <Helmet title={title} />
      <RecipeCards>
        {recipes.map(({ node }) => (
          <RecipeCard
            key={node.id}
            recipe={node}
            onlyImage
          />
        ))}
      </RecipeCards>
    </Layout>
  )
}

export default InspirationPage

export const pageQuery = graphql`
  query InspirationByLanguage($locale: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulRecipe(
      filter: { node_locale: { eq: $locale }, title: { ne: null } }
      sort: { fields: publishDate, order: DESC }
    ) {
      edges {
        node {
          id
          title
          slug
          publishDate
          heroImage {
            fluid(maxWidth: 750) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
