import React from 'react'
import styled from 'styled-components'
import ContentfulRichText from './ContentfulRichText'
 
const Wrapper = styled.div`
  width: 100%;
  display: flex;
`

const Title = styled.h2`
  border-top: 1px solid #446;
  padding-top: 3vmin; 
`

const Instructions = styled.div`
  width: 60%;
`

const Ingredients = styled.div`
  width: 40%;
`

  
const Recipe = ({ recipe }) => (
  <>
    <Title>{recipe.title}</Title>
    <Wrapper>
      <Instructions>
        <ContentfulRichText node={recipe.instructions} />
      </Instructions>
      <Ingredients>
        <ContentfulRichText node={recipe.ingredients} />
      </Ingredients>
    </Wrapper>
  </>
)


export default Recipe;
