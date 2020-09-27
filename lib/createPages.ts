import { resolve } from 'path';

import { useLanguageDefinitions, LanguageDefinition } from './i18n';

import * as config from '../gatsby-config';
import { Locale } from '../gatsby-config';

import { GatsbyCreatePages, GraphQL, BoundActionCreators, CreatePage } from '../src/interfaces/gatsby';
import { RecipeEdge } from '../src/interfaces/recipe';

type TranslatedPageCreator = (gatsby: { graphql: GraphQL; boundActionCreators: BoundActionCreators }, locales: Array<Locale>) => Promise<Array<Promise<void>>>;

export const createPages: GatsbyCreatePages = async (gatsby) => {
  const locales = config.siteMetadata.locales;

  const indexes = await createIndexes(gatsby, locales);
  const inspirations = await createInspirations(gatsby, locales);
  const recipes = await createRecipes(gatsby, locales);

  await Promise.all([
    ...indexes,
    //...recipes,
    //...inspirations,
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

const createRecipes: TranslatedPageCreator = async ({ graphql, boundActionCreators }, locales) => {
  const languageDefinitions = await useLanguageDefinitions(
    locales.map(locale => locale.language),
    { ns: ['common', 'recipe'] }
  );
  const localeMap = locales.reduce((a, c) => { a[c.locale] = c; return a }, {} as Record<string, Locale>);

  const createPage = useCreatePage({
    createPage: boundActionCreators.createPage,
    componentPath: './src/templates/recipe.tsx',
    languageDefinitions,
  });

  const recipes = await graphql(`
    {
      allContentfulRecipe {
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

  return recipes.data.allContentfulRecipe.edges.map(async (recipe: RecipeEdge) => {
    const { node_locale, slug, id } = recipe.node;

    return createPage({
      locale: localeMap[node_locale],
      url: `recipe/${slug}`,
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
