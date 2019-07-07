const Promise = require('bluebird')
const path = require('path')

exports.createPages = (gatsby) => {
  return Promise.all([
    createMeals(gatsby),
    createIndexes(gatsby),
  ])
}

const createMeals = ({ graphql, actions }) => {
  const template = path.resolve('./src/templates/meal.js')
  const createPage = makePage(actions.createPage, template);

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allContentfulMeal(filter: {title: {ne: null}}) {
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
        `
      )
      .then(result => {
        if (result.errors) {
          throw new Error(result.errors)
        }
        
        result.data.allContentfulMeal.edges
          .forEach((meal) => {
            createPage({
              url: `/${meal.node.node_locale}/meal/${meal.node.slug}/`,
              context: {
                id: meal.node.id,
                locale: meal.node.node_locale
              },
            })
          })

        return Promise.resolve();
      })
    )
  })
}

const createIndexes = ({ graphql, actions }) => {
  const template = path.resolve('./src/templates/index.js')
  const createPage = makePage(actions.createPage, template);

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            site {
              siteMetadata {
                locales {
                  languages
                }
              }
            }
          }
        `
      )
      .then(result => {
        if (result.errors) {
          throw new Error(result.errors)
        }
        
        result.data.site.siteMetadata.locales.languages.forEach((language) => {
          createPage({
            url: `/${language}/`,
            context: {
              language
            },
          })
        })

        return Promise.resolve();
      })
    )
  })
}

const makePage = (createPage, component) => ({ url, context }) => {
  console.log(`Creating: ${url}`)
  createPage({
    path: url,
    component,
    context
  })
}
