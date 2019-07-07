import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Layout from '../components/layout'
import Recipe from '../components/Recipe'


const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Header = styled.h1`
`

const SubHeader = styled.div`
  margin-bottom: 0.67em 0;
  font-size: 0.8em;
  color: #777;
`

const Content = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px 50px;
`

const ShortDescription = styled.div`
  width: 100%;
  color: #223;
  margin-bottom: 1rem;
`

class MealTemplate extends React.Component {
  render() {
    const meal = this.props.data.contentfulMeal
    const { title, updatedAt, shortDescription, recipes }= meal
    const siteTitle = this.props.data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} >
        <Helmet title={`${meal.title} | ${siteTitle}`} />
        <Content>
          <HeaderWrapper>
            <Header>{title}</Header>
            <SubHeader>Last Updated: {updatedAt}</SubHeader>
          </HeaderWrapper>

          <ShortDescription
            dangerouslySetInnerHTML={{
              __html: shortDescription.childMarkdownRemark.html,
            }}
          />
          {recipes && recipes.map(recipe => (
            <Recipe
              key={recipe.id}
              recipe={recipe}
            />
          ))}
        </Content>
      </Layout>
    )
  }
}

export default MealTemplate

export const pageQuery = graphql`
  query MealById($id: String!, $locale: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulMeal(id: { eq: $id }) {
      title
      updatedAt(locale: $locale, fromNow: true)
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