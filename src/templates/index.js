import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import MealPreview from '../components/MealPreview'
import styled from 'styled-components'

const ItemWrapper = styled.div`
  display: flex;
  padding: 20px;
  overflow-x: hidden;
  flex-wrap: wrap;
  background-color: #fff;
  max-width: 1180px;

  @media (max-width: 610px) {
    max-width: 328px;
  }

  @media (min-width: 611px) and (max-width: 895px) {
    max-width: 610px;
  }

  @media (min-width: 896px) and (max-width: 1180px) {
    max-width: 895px;
  }
`

const IndexPage = ({ location, pageContext, data }) => (
  <Layout location={location} >
    <Helmet title={data.site.siteMetadata.title} />
    <ItemWrapper>
      {data.allContentfulMeal.edges.map(({ node }) => (
        <MealPreview
          key={node.slug}
          meal={node}
          locale={pageContext.locale}
        />
      ))}
    </ItemWrapper>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexByLanguage($locale: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulMeal(
      filter: { node_locale: { eq: $locale }, title: { ne: null }}
      sort: { fields: updatedAt, order: DESC }
    ) {
      edges {
        node {
          title
          slug
          shortDescription {
            childMarkdownRemark {
              html
            }
          }
          updatedAt
          heroImage {
            resolutions(width: 400) {
              ...GatsbyContentfulResolutions
            }
          }
        }
      }
    }
  }
`
