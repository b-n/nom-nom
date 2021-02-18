import React from 'react'
import { useTranslation } from 'react-i18next'

import Button from '../../components/Button'
import Card from '../../components/Card/Card'
import CardActions from '../../components/Card/CardActions'
import CardContent from '../../components/Card/CardContent'
import CardImage from '../../components/Card/CardImage'
import Typography from '../../components/Typography'
import { useLocale, Link } from '../../components/withI18n'

import { Recipe } from '../../interfaces/recipe'

interface Props {
  recipe: Recipe;
  onlyImage?: boolean;
}

const RecipeCard: React.FC<Props> = (props) => {
  const { recipe, onlyImage = false } = props
  const { title, slug, heroImage } = recipe
  const { navigate } = useLocale()
  const { t } = useTranslation('common')

  const navigateToRecipe = (recipe: string) => () => {
    navigate(recipe)
  }
  return (
    <Card>
      { heroImage && heroImage.fluid &&
        <Link to={`/${slug}`}>
          <CardImage fluid={heroImage.fluid} />
        </Link>
      }
      { !onlyImage &&
        <>
          <CardContent>
            <Link to={`/${slug}`}>
              <Typography variant="h2">{title}</Typography>
            </Link>
          </CardContent>
          <CardActions>
            <Button onClick={navigateToRecipe('/' + slug)}>{t('View')}</Button>
          </CardActions>
        </>
      }
    </Card>
  )
}

export default RecipeCard
