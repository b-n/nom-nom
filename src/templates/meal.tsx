import React from 'react';

import { graphql, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { p } from 'styled-components-spacing';

import Layout from './common/Layout';
import Typography from '../components/Typography';
import ContentfulRichText from '../components/ContentfulRichText'
import Recipe from './common/Recipe';

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useLocale } from '../components/withI18n';

import { Site, PageContext } from '../interfaces/site';
import { ContentfulMeal } from '../interfaces/meal';

const Content = styled.div`
  background-color: white;
  ${p({ mobile: 3, tablet: 4, desktop: 5 })};
  ${breakpoint('mobile')`
    width: 100%;
  `}

  ${breakpoint('tablet')`
    width: 90%;
  `}

  ${breakpoint('desktop')`
    width: 80%;
  `}
`;

type Data = Site & ContentfulMeal;
type Context = {
  id: string;
};

const MealPage: React.FC<PageProps<Data, Context>> = (props) => {
  const { data, pageContext } = props;
  const { t } = useTranslation('common');
  const meal = data.contentfulMeal;
  const { title, description, updatedAt, recipes } = meal;
  const siteTitle = data.site.siteMetadata.title;

  const locale = useLocale();

  return (
    <Layout {...props}>
      <Helmet title={`${title} | ${siteTitle}`} />
      <Content>
        <Typography variant="h1">
          {title}
        </Typography>
        <Typography variant="subtitle">
          {t('meal:last edited')} {formatDistanceToNow(Date.parse(updatedAt), { locale: locale.dateFns, addSuffix: true })}
        </Typography>
        {ContentfulRichText(description.json)} 
        {
          recipes && 
          recipes.map(recipe => (
            <Recipe
              recipe={recipe}
              key={recipe.id} 
              showTitle={recipes.length > 1}
            /> 
          ))
        }
      </Content>
    </Layout>
  );
};

export default MealPage;

export const pageQuery = graphql` 
  query MealById($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulMeal(id: { eq: $id }) {
      title
      updatedAt
      description {
        json
      }
      recipes {
        id
        title
        ingredients {
          json
        }
        instructions {
          json
        }
      }
    }
  }
`;
