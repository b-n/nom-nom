import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import MealPreview from '../components/MealPreview'
import styled from 'styled-components'

const ItemWrapper = styled.div`
  display: flex;
  padding: 20px;
  overflow-x: hidden;
  flex-wrap: wrap;
  justify-content: space-between;
`

class RootIndex extends React.Component {
  render() {
    const { language } = this.props.pageContext
    const siteTitle = this.props.data.site.siteMetadata.title
    const meals = this.props.data.allContentfulMeal.edges

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <ItemWrapper>
            {meals.map(({ node }) => (
              <MealPreview
                key={node.slug}
                meal={node}
                language={language}
              />
            ))}
          </ItemWrapper>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query IndexByLanguage($language: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulMeal(
      filter: { node_locale: { eq: $language }, title: { ne: null }}
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
          updatedAt(fromNow: true)
        }
      }
    }
  }
`
