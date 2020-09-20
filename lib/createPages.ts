import { resolve } from 'path';

import { useLanguageDefinitions, LanguageDefinition } from './i18n';

import * as config from '../gatsby-config';
import { Locale } from '../gatsby-config';

import { GatsbyCreatePages, GraphQL, BoundActionCreators, CreatePage } from '../src/interfaces/gatsby';
import { MealEdge } from '../src/interfaces/meal';

type TranslatedPageCreator = (gatsby: { graphql: GraphQL; boundActionCreators: BoundActionCreators }, locales: Array<Locale>) => Promise<Array<Promise<void>>>;

export const createPages: GatsbyCreatePages = async (gatsby) => {
  const locales = config.siteMetadata.locales;

  const indexes = await createIndexes(gatsby, locales);
  const inspirations = await createInspirations(gatsby, locales);
  const meals = await createMeals(gatsby, locales);

  await Promise.all([
    ...indexes,
    ...meals,
    ...inspirations,
  ]);
};

const createIndexes: TranslatedPageCreator = async ({ boundActionCreators }, locales) => {
  const languageDefinitions = await useLanguageDefinitions(
    locales.map(locale => locale.language),
    { ns: ['common'] }
  );

  const createPage = useCreatePage({
    createPage: boundActionCreators.createPage,
    componentPath: './src/templates/index.tsx',
    languageDefinitions,
  });

  return locales.map(locale => createPage({
    locale: locale,
    url: '',
    context: {
      locale: locale.locale,
    },
  }));
};

const createInspirations: TranslatedPageCreator = async ({ boundActionCreators }, locales) => {
  const languageDefinitions = await useLanguageDefinitions(
    locales.map(locale => locale.language),
    { ns: ['common'] }
  );

  const createPage = useCreatePage({
    createPage: boundActionCreators.createPage,
    componentPath: './src/templates/inspiration.tsx',
    languageDefinitions,
  });

  return locales.map(locale => createPage({
    locale: locale,
    url: 'inspiration',
    context: {
      locale: locale.locale,
    },
  }));
};

const createMeals: TranslatedPageCreator = async ({ graphql, boundActionCreators }, locales) => {
  const languageDefinitions = await useLanguageDefinitions(
    locales.map(locale => locale.language),
    { ns: ['common', 'meal'] }
  );
  const localeMap = locales.reduce((a, c) => { a[c.locale] = c; return a }, {} as Record<string, Locale>);

  const createPage = useCreatePage({
    createPage: boundActionCreators.createPage,
    componentPath: './src/templates/meal.tsx',
    languageDefinitions,
  });

  const meals = await graphql(`
    {
      allContentfulMeal {
        edges {
          node {
            slug
            title
            id
            node_locale
          }
        }
      }
    }
  `);

  return meals.data.allContentfulMeal.edges.map(async (meal: MealEdge) => {
    const { node_locale, slug, id } = meal.node;

    return createPage({
      locale: localeMap[node_locale],
      url: `meal/${slug}`,
      context: {
        id,
      },
    });
  });
};

interface UseCreatePage {
  (opts: {
    createPage: CreatePage;
    componentPath: string;
    languageDefinitions?: Record<string, LanguageDefinition>;
  }):
  (context: {
    locale: Locale;
    url: any;
    context: any;
  }) => Promise<void>;
}

const useCreatePage: UseCreatePage = ({ createPage, componentPath, languageDefinitions = {} }) => async ({ locale, url, context }) => {
  const component = await resolve(componentPath);
  return new Promise(resolve => {
    const urlParts = [];
    const i18n = languageDefinitions[locale.language];
    if (i18n) {
      urlParts.push(locale.path);
    }
    urlParts.push(url);

    const fullUrl = `/${urlParts.join('/')}`;
    createPage({
      path: fullUrl,
      component,
      context: {
        ...context,
        i18n: {
          locale,
          i18nextResources: i18n.i18next.services.resourceStore.data,
          dateFnsLocale: i18n.dateFnsLocale,
        },
      },
    });
    console.log(`Created page ${fullUrl}`);
    resolve();
  });
};
