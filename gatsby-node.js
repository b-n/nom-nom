const Promise = require('bluebird')
const path = require('path')

exports.createPages = (gatsby) => {
  return Promise.all([ createMeals(gatsby), createIndexes(gatsby) ])
}
const createMeals = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const mealTemplate = path.resolve('./src/templates/meal.js')
    
    resolve(
      graphql(
        `
          {
            allContentfulMeal {
              edges {
                node {
                  slug
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
          console.log(result.errors)
          reject(result.errors)
        }
        
        result.data.allContentfulMeal.edges.forEach((meal) => {
          const url = `/${meal.node.node_locale}/meal/${meal.node.slug}/`;
          console.log(`Creating: ${url}`)
          createPage({
            path: url,
            component: mealTemplate,
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
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const indexTemplate = path.resolve('./src/templates/index.js')
    
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
          console.log(result.errors)
          reject(result.errors)
        }
        
        result.data.site.siteMetadata.locales.languages.forEach((language) => {
          const url = `/${language}/`;
          console.log(`Creating: ${url}`)
          createPage({
            path: url,
            component: indexTemplate,
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
