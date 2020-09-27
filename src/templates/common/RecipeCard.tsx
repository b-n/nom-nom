import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Card from '../../components/Card/Card'
import CardActions from '../../components/Card/CardActions'
import CardContent from '../../components/Card/CardContent'
import CardImage from '../../components/Card/CardImage'
import Button from '../../components/Button'
import Typography from '../../components/Typography'

import { useLocale, Link } from '../../components/withI18n'

import { Recipe } from '../../interfaces/recipe'

interface Props {
  recipe: Recipe;
  margin?: string;
  width?: string;
}

const RecipeCard: React.FC<Props> = (props) => {
  const { margin, width, recipe } = props;
  const { title, slug } = recipe;
  const { navigate } = useLocale();
  const { t } = useTranslation('common');

  const navigateToRecipe = (recipe: string) => () => {
    navigate(recipe);
  }
  return (
    <Card margin={margin} width={width}>
      <Link to={`/${slug}`}>
        <CardImage src="http://picsum.photos/200/300" />
      </Link>
      <CardContent>
        <Link to={`/${slug}`}>
          <Typography variant="h2">{title}</Typography>
        </Link>
      </CardContent>
      <CardActions>
        <Button onClick={navigateToRecipe(slug)}>{t('View')}</Button>
      </CardActions>
    </Card>
  );
}

export default RecipeCard;
