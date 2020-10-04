import React from 'react'
import styled from 'styled-components'

import Card from '../../components/Card/Card'
import CardContent from '../../components/Card/CardContent'
import Typography from '../../components/Typography'

const Screen = styled.div<Props>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex-grow: 0;
  width: 100%;
  padding: 12px;

  @media (min-width: 576px) {
    width: 50%;
  }
`
// width: ${props => props.width}px;

interface Props {
  width?: number;
  title?: string;
  children?: React.ReactNode;
}

const RecipeScreen: React.FC<Props> = ({ width, title, children }) => (
  <Screen width={width}>
    <Card>
      <CardContent>
        <Typography variant="h1">
          {title}
        </Typography>
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  </Screen>
)

export default RecipeScreen
