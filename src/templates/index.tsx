import { graphql, PageProps } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'

import { AllContentfulRecipes } from '../interfaces/recipe'
import { Site } from '../interfaces/site'

import Layout from './common/Layout'
import RecipeCard from './common/RecipeCard'
import RecipeCards from './common/RecipeCards'

type Data = Site & AllContentfulRecipes;

const IndexPage: React.FC<PageProps<Data>> = (props) => {
  const { data } = props
  const { title } = data.site.siteMetadata

  return (
    <Layout {...props} title={title}>
      <Helmet title={title} />
      <RecipeCards>
        {data.allContentfulRecipe.edges.map(({ node }) => (
          <RecipeCard key={node.id} recipe={node} />
        ))}
      </RecipeCards>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexByLanguage($locale: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulRecipe(
      filter: { node_locale: { eq: $locale }, title: { ne: null } }
      sort: { fields: title, order: ASC }
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
