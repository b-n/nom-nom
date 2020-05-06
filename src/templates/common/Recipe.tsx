import React from 'react';

import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { mb, mt, px, py } from 'styled-components-spacing';

import ContentfulRichText from '../../components/ContentfulRichText';
import { Recipe } from '../../interfaces/meal';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  border: 4px outset #606060;
  border-radius: 20px;
  ${px({ mobile: 3, tablet: 4, desktop: 4 })}
  ${py({ mobile: 2, tablet: 3, desktop: 3 })}
  ${mb({ mobile: 3, tablet: 3, desktop: 4 })}
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Title = styled.h2`
  width: 100%;
  ${mt(2)}
  ${mb(3)}
  order: 1;
`;

interface ISubHeading {
  showTitle: boolean
}

const SubHeading = styled.h3<ISubHeading>`
  ${mt(2)}
  ${({ showTitle }) => showTitle && mt(0)}
  ${breakpoint('desktop')`
    display: none;
  `}
`;

const Instructions = styled.div`
  width: 100%;
  order: 3;

  ${breakpoint('desktop')`
    width: 59%;
    order: 2;
  `}
`;

const Ingredients = styled.div`
  width: 100%;
  order: 2;

  ${breakpoint('desktop')`
    width: 39%;
    order: 3;
  `}
`;

interface IProps {
  recipe: Recipe;
  showTitle: boolean;
}

const RecipeElement: React.FC<IProps> = ({ recipe, showTitle }) => (
  <>
    <Wrapper>
      {showTitle && <Title>{recipe.title}</Title>}
      <Instructions>
        <SubHeading showTitle={showTitle}>Instructions</SubHeading>
        {ContentfulRichText(recipe.instructions.json)}
      </Instructions>
      <Ingredients>
        <SubHeading showTitle={showTitle}>Ingredients</SubHeading>
        {ContentfulRichText(recipe.ingredients.json)}
      </Ingredients>
    </Wrapper>
  </>
);

export default RecipeElement;
