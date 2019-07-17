import React from 'react'

import { graphql } from 'gatsby'
import { shuffle } from 'lodash'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Layout from '../components/Layout'
import MealInspiration from '../components/MealInspiration'
import { getMessage } from '../data/languages'

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  overflow-x: hidden;
  flex-wrap: wrap;
  background-color: #fff;
  max-width: 1290px;

  @media (max-width: 540px) {
    max-width: 290px;
  }

  @media (min-width: 541px) and (max-width: 790px) {
    max-width: 540px;
  }

  @media (min-width: 791px) and (max-width: 1040px) {
    max-width: 790px;
  }

  @media (min-width: 1041px) and (max-width: 1290px) {
    max-width: 1040px;
  }
`

interface IProps {
  pageContext: IPageContext
  data: ISite & IAllContentfulMeals
}

const InspirationPage: React.FC<IProps> = ({ pageContext, data }) => {
  const messages = getMessage(pageContext.locale)
  const meals = shuffle(data.allContentfulMeal.edges)

  return (
    <Layout pageContext={pageContext}>
      <Helmet
        title={`${data.site.siteMetadata.title} | ${messages('INSPIRATION')}`}
      />
      <Wrapper>
        {meals.map(({ node }) => (
          <MealInspiration
            key={node.slug}
            meal={node}
            locale={pageContext.locale}
          />
        ))}
      </Wrapper>
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
    allContentfulMeal(
      filter: { node_locale: { eq: $locale }, title: { ne: null } }
      sort: { fields: updatedAt, order: DESC }
    ) {
      edges {
        node {
          title
          slug
          heroImage {
            resolutions(width: 250, height: 250) {
              ...GatsbyContentfulResolutions
            }
          }
        }
      }
    }
  }
`
