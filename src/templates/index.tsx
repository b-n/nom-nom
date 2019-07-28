import React from 'react'

import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Layout from '../components/Layout'
import MealPreview from '../components/MealPreview'

const ItemWrapper = styled.div`
  display: flex;
  padding: 20px;
  overflow-x: hidden;
  flex-wrap: wrap;
  background-color: #fff;
  max-width: calc(40px + 4 * 304px);

  @media (max-width: calc(40px + 2 * 304px)) {
    max-width: calc(40px + 1 * 304px);
  }

  @media (min-width: calc(40px + 2 * 304px)) and (max-width: calc(40px + 3 * 304px)) {
    max-width: calc(40px + 2 * 304px);
  }

  @media (min-width: calc(40px + 3 * 304px)) and (max-width: calc(40px + 4 * 304px)) {
    max-width: calc(40px + 3 * 304px);
  }
`

interface IProps {
  pageContext: IPageContext
  data: ISite & IAllContentfulMeals
}

const IndexPage: React.FC<IProps> = ({ pageContext, data }) => (
  <Layout pageContext={pageContext}>
    <Helmet title={data.site.siteMetadata.title} />
    <ItemWrapper>
      {data.allContentfulMeal.edges.map(({ node }) => (
        <MealPreview key={node.slug} meal={node} locale={pageContext.locale} />
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
      filter: { node_locale: { eq: $locale }, title: { ne: null } }
      sort: { fields: publishDate, order: DESC }
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
            fixed(width: 280) {
              ...GatsbyContentfulFixed
            }
          }
        }
      }
    }
  }
`
