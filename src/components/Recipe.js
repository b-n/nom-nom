import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { py, mb } from 'styled-components-spacing'
import ContentfulRichText from './ContentfulRichText'
 
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #000;
  ${py({ mobile: 3, tablet: 4, desktop: 4 })}
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

  
const Recipe = ({ recipe, showTitle }) => (
  <>
    <Wrapper>
      {showTitle && <Title>{recipe.title}</Title>}
      <Instructions>
        <SubHeading>Instructions</SubHeading>
        <ContentfulRichText node={recipe.instructions} />
      </Instructions>
      <Ingredients>
        <SubHeading>Ingredients</SubHeading>
        <ContentfulRichText node={recipe.ingredients} />
      </Ingredients>
    </Wrapper>
  </>
)


export default Recipe;
