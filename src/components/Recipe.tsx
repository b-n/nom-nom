import React from 'react'

import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { mb, px, py } from 'styled-components-spacing'

import ContentfulRichText from './ContentfulRichText'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  border: 2px outset #606060;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px #D0D0D0;
  ${px({ mobile: 3, tablet: 4, desktop: 4 })}
  ${py({ mobile: 2, tablet: 3, desktop: 3 })}
  ${mb({ mobile: 3, tablet: 3, desktop: 4 })}
  flex-wrap: wrap;
`

const Title = styled.h2`
  width: 100%;
  margin: 0;
  ${mb({ mobile: 3, tablet: 3, desktop: 2 })}
  order: 1;
`

const SubHeading = styled.h3`
  margin: 0;
  ${breakpoint('desktop')`
    display: none;
  `}
`

const Instructions = styled.div`
  width: 100%;
  order: 3;

  ${breakpoint('desktop')`
    width: 60%;
    order: 2;
  `}
`

const Ingredients = styled.div`
  width: 100%;
  order: 2;

  ${breakpoint('desktop')`
    width: 40%;
    order: 3;
  `}
`

interface IProps {
  recipe: IRecipe
  showTitle: boolean
}

const Recipe: React.FC<IProps> = ({ recipe, showTitle }) => (
  <>
    <Wrapper>
      {showTitle && <Title>{recipe.title}</Title>}
      <Instructions>
        <SubHeading>Instructions</SubHeading>
        {ContentfulRichText(recipe.instructions.json)}
      </Instructions>
      <Ingredients>
        <SubHeading>Ingredients</SubHeading>
        {ContentfulRichText(recipe.ingredients.json)}
      </Ingredients>
    </Wrapper>
  </>
)

export default Recipe
