import * as config from '../gatsby-config'
import { Locale } from '../gatsby-config'

import { GatsbyCreatePages, GraphQL, BoundActionCreators } from '../src/interfaces/gatsby'
import { RecipeEdge } from '../src/interfaces/recipe'

import { useLanguageDefinitions } from './i18n'
import useCreateTranslatedPage from './useCreateTranslatedPage'

type TranslatedPageCreator = (gatsby: { graphql: GraphQL; boundActionCreators: BoundActionCreators }, locales: Array<Locale>) => Promise<Array<Promise<void>>>;

const createIndexes: TranslatedPageCreator = async ({ boundActionCreators }, locales) => {
  const languageDefinitions = await useLanguageDefinitions(
    locales.map(locale => locale.language),
    { ns: ['common'] }
  )

  const createPage = useCreateTranslatedPage({
    createPage: boundActionCreators.createPage,
    componentPath: './src/templates/index.tsx',
    languageDefinitions,
  })

  return locales.map(locale => createPage({
    locale: locale,
    url: '',
    context: {
      locale: locale.locale,
    },
  }))
}

const createInspirations: TranslatedPageCreator = async ({ boundActionCreators }, locales) => {
  const languageDefinitions = await useLanguageDefinitions(
    locales.map(locale => locale.language),
    { ns: ['common'] }
  )

  const createPage = useCreateTranslatedPage({
    createPage: boundActionCreators.createPage,
    componentPath: './src/templates/inspiration.tsx',
    languageDefinitions,
  })

  return locales.map(locale => createPage({
    locale: locale,
    url: 'inspiration',
    context: {
      locale: locale.locale,
    },
  }))
}

const createRecipes: TranslatedPageCreator = async ({ graphql, boundActionCreators }, locales) => {
  const languageDefinitions = await useLanguageDefinitions(
    locales.map(locale => locale.language),
    { ns: ['common', 'recipe'] }
  )

  const localeMap = locales.reduce((a, c) => { a[c.locale] = c; return a }, {} as Record<string, Locale>)

  const createPage = useCreateTranslatedPage({
    createPage: boundActionCreators.createPage,
    componentPath: './src/templates/recipe.tsx',
    languageDefinitions,
  })

  const recipes = await graphql(`
    {
      allContentfulRecipe {
        edges {
          node {
            slug
            id
            node_locale
          }
        }
      }
    }
  `)

  return recipes.data.allContentfulRecipe.edges.map(async (recipe: RecipeEdge) => {
    const { node_locale, slug, id } = recipe.node

    return createPage({
      locale: localeMap[node_locale],
      url: `${slug}`,
      context: {
        id,
      },
    })
  })
}

export const createPages: GatsbyCreatePages = async (gatsby) => {
  const locales = config.siteMetadata.locales

  const indexes = await createIndexes(gatsby, locales)
  const inspirations = await createInspirations(gatsby, locales)
  const recipes = await createRecipes(gatsby, locales)

  await Promise.all([
    ...indexes,
    ...recipes,
    ...inspirations,
  ])
}
