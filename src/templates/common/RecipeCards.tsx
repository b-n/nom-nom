import styled from 'styled-components'

const RecipeCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(375px, 1fr));
  grid-gap: 1em;
  width: 100%;
  max-width: 2768px;
  padding: 1em;
`

export default RecipeCards
