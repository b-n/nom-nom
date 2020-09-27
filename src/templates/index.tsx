import React from 'react';

import { graphql, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import Layout from './common/Layout';
import RecipeCard from './common/RecipeCard';

import { Site } from '../interfaces/site';
import { AllContentfulRecipes } from '../interfaces/recipe';

const ItemWrapper = styled.div`
  display: flex;
  padding: 16px;
  flex-wrap: wrap;
  width: 100%;
`;

type Data = Site & AllContentfulRecipes;

const IndexPage: React.FC<PageProps<Data>> = (props) => {
  const { data } = props;
  const { title } = data.site.siteMetadata
  console.log('data',data);

  // <MealPreview key={node.id} meal={node} />
  return (
    <Layout {...props} pageType="index" title={title}>
      <Helmet title={title} />
      <ItemWrapper>
        {data.allContentfulRecipe.edges.map(({ node }) => (
          <RecipeCard
            recipe={node}
            margin="12px"
          />
        ))}
      </ItemWrapper>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexByLanguage($locale: String!) {
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
        }
      }
    }
  }
`;
          //heroImage {
            //fixed(width: 280) {
              //...GatsbyContentfulFixed
            //}
          //}
