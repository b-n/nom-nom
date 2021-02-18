import React from 'react'
import { useSwipeable, SwipeableProps, SwipeCallback } from 'react-swipeable'
import styled from 'styled-components'

interface ContainerProps extends SwipeableProps {
  totalPages: number;
  currentPage: number;
  pageWidth: number;
  swiped: SwipeCallback;
}

const Shade = styled.div<CaroselPageProps>`
  width: ${props => props.width}px;
  overflow-x: hidden;
`

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  position: relative;
  width: ${props => props.pageWidth * props.totalPages}px;
  transition: 0.2s;
  transition-property: left;
  left: ${props => -1 * props.pageWidth * props.currentPage}px;
`

interface CaroselProps extends ContainerProps {
  children: React.ReactNode;
}

const Carosel: React.FC<CaroselProps> = (props) => {
  const { children, swiped, pageWidth } = props
  const handlers = useSwipeable({
    onSwiped: (event) => swiped(event),
    trackMouse: true,
  })

  return (
    <Shade width={pageWidth}>
      <Container {...props} {...handlers}>
        {React.Children.map(children, child => {
          const props = { width: pageWidth }
          if (React.isValidElement(child)) {
            return React.cloneElement(child, props)
          }
          return child
        })}
      </Container>
    </Shade>
  )
}

interface CaroselPageProps {
  width?: number;
}
const CaroselPage = styled.div<CaroselPageProps>`
  width: ${props => props.width}px;
  min-width: ${props => props.width}px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`

export default Carosel
export { CaroselPage }
