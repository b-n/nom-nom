import React from 'react'

import { graphql, PageProps } from 'gatsby'
import { shuffle } from 'lodash'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next';

import Layout from './common/Layout'
import MealInspiration from './common/MealInspiration'

import { Site } from '../interfaces/site';
import { AllContentfulMeals } from '../interfaces/meal'

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  overflow-x: hidden;
  flex-wrap: wrap;
  background-color: #fff;
  max-width: calc(40px + 5 * 300px);

  @media (max-width: calc(40px + 2 * 300px)) {
    max-width: calc(40px + 1 * 300px);
  }

  @media (min-width: calc(40px + 2 * 300px)) and (max-width: calc(40px + 3 * 300px)) {
    max-width: calc(40px + 2 * 300px);
  }

  @media (min-width: calc(40px + 3 * 300px)) and (max-width: calc(40px + 4 * 300px)) {
    max-width: calc(40px + 3 * 300px);
  }

  @media (min-width: calc(40px + 4 * 300px)) and (max-width: calc(40px + 5 * 300px)) {
    max-width: calc(40px + 4 * 300px);
  }
`

type Data = Site & AllContentfulMeals;

const InspirationPage: React.FC<PageProps<Data, {}>> = (props) => {
  const { data } = props;
  const { t } = useTranslation();
  const meals = shuffle(data.allContentfulMeal.edges)

  return (
    <Layout {...props}>
      <Helmet
        title={`${data.site.siteMetadata.title} | ${t('common:Inspiration')}`}
      />
      <Wrapper>
        {meals.map(({ node }) => (
          <MealInspiration
            key={node.slug}
            meal={node}
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
          node_locale
          slug
          heroImage {
            resolutions(width: 300, height: 300) {
              ...GatsbyContentfulResolutions
            }
          }
        }
      }
    }
  }
`
