import React from 'react'
import { Swipeable, SwipeableProps, SwipeCallback, EventData } from 'react-swipeable'
import styled from 'styled-components'

interface ContainerProps extends SwipeableProps {
  totalPages: number;
  currentPage: number;
  pageWidth: number;
  onSwiped: SwipeCallback;
}

const Shade = styled.div<CaroselPageProps>`
  width: ${props => props.width}px;
  overflow-x: hidden;
`

const Container = styled(Swipeable).attrs({
  trackMouse: true,
})<ContainerProps>`
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
  const { children, onSwiped, pageWidth } = props
  return (
    <Shade width={pageWidth}>
      <Container {...props} onSwiped={onSwiped}>
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

export type SwipeEventData = EventData;
export default Carosel
export { CaroselPage }
