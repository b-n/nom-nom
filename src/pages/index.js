import React from 'react'
import { graphql, Link } from 'gatsby'
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
    const siteTitle = this.props.data.site.siteMetadata.title
    const { languages } = this.props.data.site.siteMetadata.locales

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          {languages.map(language => (
            <Link to={`/${language}/`}>{language}</Link>
          ))}
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery2 {
    site {
      siteMetadata {
        title
        locales {
          languages
        }
      }
    }
  }
`
