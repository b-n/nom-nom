import { graphql, PageProps } from 'gatsby'
import chunk from 'lodash/chunk'
import first from 'lodash/first'
import last from 'lodash/last'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import Button from '../components/Button'
import Carosel, { CaroselPage, SwipeEventData } from '../components/Carosel'
import ContentfulRichText from '../components/ContentfulRichText'

import { ContentfulRecipe, Recipe } from '../interfaces/recipe'
import { Site } from '../interfaces/site'

import { useWindowDimensions } from '../lib/window'

import Layout from './common/Layout'
import RecipeScreen from './common/RecipeScreen'
import RecipeScreens from './common/RecipeScreens'

type Data = Site & ContentfulRecipe;
type Context = {
  id: string;
};

const ActionsContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 16px;
  justify-content: space-between;
  flex-grow: 0;
`

const ActionsSpacer = styled.div`
  width: 8px;
  flex-shrink: 0;
`

interface RecipePage {
  title: string;
  width?: number;
  content: React.ReactNode;
}

const generatePages = (
  recipe: Recipe,
  itemsPerPage: number,
  screenWidth: number,
  handleNavigationClick: (toPage: number) => () => void
): Array<React.ReactNode> => {
  const { t } = useTranslation('recipe')
  const chunkedPages: Array<Array<RecipePage>> = chunk([
    { title: t('Ingredients'), content: ContentfulRichText(recipe.ingredients.json) },
    ...recipe.steps.map(step => ({ title: step.title, content: ContentfulRichText(step.text.json) })),
  ], itemsPerPage)

  return chunkedPages.map((screens, i) => (
    <CaroselPage key={i}>
      <RecipeScreens>
        {screens.map((screen, j) => (
          <RecipeScreen
            key={j}
            title={screen.title}
            width={screenWidth / itemsPerPage}
          >
            {screen.content}
          </RecipeScreen>
        ))}
        <ActionsContainer>
          { i > 0 && <Button variant="contained" onClick={handleNavigationClick(i - 1)}>{last(chunkedPages[i - 1])!.title}</Button> }
          <ActionsSpacer />
          { i < chunkedPages.length - 1 && <Button variant="contained" onClick={handleNavigationClick(i + 1)}>{first(chunkedPages[i + 1])!.title}</Button> }
        </ActionsContainer>
      </RecipeScreens>
    </CaroselPage>
  ))
}

const pageConfig: Array<{ widthFrom?: number; widthTo?: number; items: number}> = [
  { widthTo: 576, items: 1 },
  { widthFrom: 576, widthTo: 1024, items: 2 },
  { widthFrom: 1024, items: 3 },
]

const RecipeLayout: React.FC<PageProps<Data, Context>> = (props) => {
  const { data } = props

  const [currentPage, setCurrentPage] = React.useState(0)
  const [width] = useWindowDimensions()

  const recipe = data.contentfulRecipe
  const { title, steps } = recipe
  const siteTitle = data.site.siteMetadata.title

  const handleNavigationClick = (toPage: number) => () => {
    setCurrentPage(toPage)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const itemsPerPage = pageConfig.find(({ widthFrom, widthTo }) => ((widthFrom || 0) < width && (!widthTo || widthTo >= width)))!.items

  const handleSwipe = (eventData: SwipeEventData) => {
    if (eventData.dir === 'Left' && currentPage < recipe.steps.length / itemsPerPage - 1) {
      handleNavigationClick(currentPage + 1)()
    }
    if (eventData.dir === 'Right' && currentPage > 0) {
      handleNavigationClick(currentPage - 1)()
    }
  }

  return (
    <Layout {...props} title={title}>
      <Helmet title={`${title} | ${siteTitle}`} />
      <Carosel
        totalPages={steps.length}
        currentPage={currentPage}
        pageWidth={width}
        onSwiped={handleSwipe}
      >
        {generatePages(recipe, itemsPerPage, width, handleNavigationClick)}
      </Carosel>
    </Layout>
  )
}

export default RecipeLayout

export const pageQuery = graphql` 
  query MealById($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulRecipe(id: { eq: $id }) {
      title
      ingredients {
        json
      }
      steps {
        id
        title
        text {
          json
        }
      }
    }
  }
`
